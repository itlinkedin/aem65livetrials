# Content Fragment - Assets REST API

We.Retail needs to run CRUD ( create , read, update and delete ) operation on content fragment in AEM Assets using external tools. 

#### Scenario : 

1. Access Content Fragments available at following folder via Get Request in Postman. http://localhost:4502/assets.html/content/dam/we-retail/en/faqs/company 

2. Create new content Fragment using POST request using FAQ Content Fragment Model.
3. Update Answer field of Content Fragment created in Step 2
4. Delete Content Fragment Created in Step 2.

#### Pre-requisite
* [Postman Desktop Tool](https://www.getpostman.com/) - Postman Chrome Extension is deprecated and may not work correctly.


#### Steps

1. Open Postman Desktop Tool and create new collection.
2. Setup Authorization as Basic Authentication, Provide credentials as admin:admin
3. Create new GET Request under the collection for following URL. You should get JSON Response in body
[http://localhost:4502/api/assets/we-retail/en/faqs/company/history.json](http://localhost:4502/api/assets/we-retail/en/faqs/company/history.json)

4. Create new POST Request under collection for new FAQ question.
* URL : http://localhost:4502/api/assets/we-retail/en/faqs/company/hq
* Set Body as raw and change type from Text to JSON ( application/json) and provide following values:

```
{
    "properties": {
        "description": "Headquarter of We.Retail",
        "title": "Headquarter",
        "cq:model": "/conf/we-retail/settings/dam/cfm/models/faq",
        "elements": {
            "question": {
                "value": [
                    " Where is headquarter located ? "
                ]
            },
            
             "answer": {
                "value": [
                    "<p>Our headquarter is in <b>Basel</b></p>"
                ]
            }
            
        }
    }
}
```

5. Create another PUT Request under collection for updating HQ information.
    * URL : http://localhost:4502/api/assets/we-retail/en/faqs/company/hq
    * Set Body as raw and change type from Text to JSON ( application/json) and provide following values:

```
{
    "properties": {
        "description": "Headquarter of We.Retail",
        "title": "Headquarter",
        "cq:model": "/conf/we-retail/settings/dam/cfm/models/faq",
        "elements": {
             "answer": {
                "value": [
                    "<p>Our headquarter is in <b>Sydney</b></p>"
                ]
            }
            
        }
    }
}
```
Step 5. Create a new request with DELETE method under collection with following URL http://localhost:4502/api/assets/we-retail/en/faqs/company/hq

#### References
* [Assets REST API](https://helpx.adobe.com/experience-manager/6-5/assets/using/assets-api-content-fragments.html )
* [Swagger UI](https://helpx.adobe.com/experience-manager/6-5/sites/developing/using/reference-materials/assets-api-content-fragments/index.html)
