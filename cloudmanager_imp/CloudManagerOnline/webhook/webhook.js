/*
Copyright 2019 Adobe. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
const express = require('express')
const crypto = require('crypto')
const jsrsasign = require('jsrsasign')
const fetch = require('node-fetch')
const bodyParser = require('body-parser')

const { URLSearchParams, URL } = require('url')

require('dotenv').config()

const app = express()

async function getAccessToken () {
  const EXPIRATION = 60 * 60 // 1 hour

  const header = {
    'alg': 'RS256',
    'typ': 'JWT'
  }

  const payload = {
    'exp': Math.round(new Date().getTime() / 1000) + EXPIRATION,
    'iss': process.env.ORGANIZATION_ID,
    'sub': process.env.TECHNICAL_ACCOUNT_ID,
    'aud': `https://ims-na1.adobelogin.com/c/${process.env.API_KEY}`,
    'https://ims-na1.adobelogin.com/s/ent_cloudmgr_sdk': true
  }

  const jwtToken = jsrsasign.jws.JWS.sign('RS256', JSON.stringify(header), JSON.stringify(payload), process.env.PRIVATE_KEY)

  const response = await fetch('https://ims-na1.adobelogin.com/ims/exchange/jwt', {
    method: 'POST',
    body: new URLSearchParams({
      client_id: process.env.API_KEY,
      client_secret: process.env.CLIENT_SECRET,
      jwt_token: jwtToken
    })
  })

  const json = await response.json()

  return json['access_token']
}

async function makeApiCall (accessToken, url, method) {
  const response = await fetch(url, {
    'method': method,
    'headers': {
      'x-gw-ims-org-id': process.env.ORGANIZATION_ID,
      'x-api-key': process.env.API_KEY,
      'Authorization': `Bearer ${accessToken}`
    }
  })

  return response.json()
}

function getLink (obj, linkType) {
  return obj['_links'][linkType].href
}

async function getExecution (executionUrl) {
  const accessToken = await getAccessToken()

  const execution = await makeApiCall(accessToken, executionUrl, 'GET')

  const pipeline = await makeApiCall(accessToken, new URL(getLink(execution, 'http://ns.adobe.com/adobecloud/rel/pipeline'), executionUrl))

  execution.pipeline = pipeline

  const program = await makeApiCall(accessToken, new URL(getLink(execution, 'http://ns.adobe.com/adobecloud/rel/program'), executionUrl))

  execution.program = program

  return execution
}

function notifyTeams (message) {
  if (process.env.TEAMS_WEBHOOK) {
    fetch(process.env.TEAMS_WEBHOOK, {
      'method': 'POST',
      'headers': { 'Content-Type': 'application/json' },
      'body': JSON.stringify({
        'text': message
      })
    })
  } else {
    console.log('Teams Webhook isn\'t set, so not logging')
  }
}

app.use(bodyParser.json({
  verify: (req, res, buf, encoding) => {
    const signature = req.header('x-adobe-signature')
    if (signature) {
      const hmac = crypto.createHmac('sha256', process.env.CLIENT_SECRET)
      hmac.update(buf)
      const digest = hmac.digest('base64')

      if (signature !== digest) {
        throw new Error('x-adobe-signature HMAC check failed')
      }
    } else if (!process.env.DEBUG && req.method === 'POST') {
      throw new Error('x-adobe-signature required')
    }
  }
}))

app.get('/webhook', (req, res) => {
  if (req.query['challenge']) {
    res.send(req.query['challenge'])
  } else {
    console.log('No challenge')
    res.status(400)
  }
})

app.post('/webhook', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/text' })
  res.end('pong')

  const STARTED = 'https://ns.adobe.com/experience/cloudmanager/event/started'
  const EXECUTION = 'https://ns.adobe.com/experience/cloudmanager/pipeline-execution'

  const event = req.body.event

  if (STARTED === event['@type'] &&
       EXECUTION === event['xdmEventEnvelope:objectType']) {
    console.log('received execution start event')

    const executionUrl = event['activitystreams:object']['@id']

    getExecution(executionUrl).then(execution => {
      console.log(`Execution for ${execution.program.name} pipeline ${execution.pipeline.name} started`)
      if (execution.pipeline.name === process.env.PIPELINE_NAME) {
        notifyTeams('Pipeline Started!!!')
      } else {
        console.log('execution start event received, but not for my pipeline')
      }
    })
  }
})

const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
