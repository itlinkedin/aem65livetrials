#!/bin/bash

clear 

echo "******************************"
echo "*** Installing AEM JS SDK ***"
echo "******************************"
echo " "
npm install @adobe/cq-spa-component-mapping
npm install @adobe/cq-spa-page-model-manager
npm install @adobe/cq-react-editable-components

echo "******************************"
echo "*** Installing Dependencies ***"
echo "******************************"
echo " "
npm install react-fast-compare
npm install ajv --save-dev
npm install clone --save-dev



echo "******************************"
echo "*** Installation Complete ***"
echo "******************************"