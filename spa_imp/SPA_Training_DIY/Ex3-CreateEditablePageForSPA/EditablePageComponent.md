# Editable Page Component For SPA

[Step 1: Page Component](PageComponent.md) 

1. Run following commands in the react-app directory to install AEM JS SDK 

```
$ npm install @adobe/cq-spa-component-mapping
$ npm install @adobe/cq-spa-page-model-manager
$ npm install @adobe/cq-react-editable-components
```
2. Run following commands in console to install required peer dependencies
```
$ npm install react-fast-compare
$ npm install ajv --save-dev
$ npm install clone --save-dev
```
3. Update index.js in react project

```
// src/index.js
 
import React from 'react';
import ReactDOM from 'react-dom';
import { ModelManager, Constants } from '@adobe/cq-spa-page-model-manager';
import App from './App';
require ('./components/page/Page') ;
 
function render(model) {
    ReactDOM.render((
        <App cqChildren={ model[Constants.CHILDREN_PROP] }
             cqItems={ model[Constants.ITEMS_PROP] }
             cqItemsOrder={ model[Constants.ITEMS_ORDER_PROP] }
             cqPath={ ModelManager.rootPath }
             locationPathname={ window.location.pathname }/>),
              document.getElementById('root'));
}
 
ModelManager.initialize({ path: process.env.REACT_APP_PAGE_MODEL_PATH }).then(render);

```
4. Update App.js in react project

```
// src/App.js
 
import React from 'react';
import { Page, withModel, EditorContext, Utils } from '@adobe/cq-react-editable-components';
 
class App extends Page {
 
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>We.SPA</h1>
                </header>
                <EditorContext.Provider value={ Utils.isInEditor() }>
                    { this.childComponents }
                    { this.childPages }
                </EditorContext.Provider>
            </div>
        );
    }
}
 
export default withModel(App);
```

5. Create new folder 'page' in /src/components
6. Create page component as Page.js in /src/components/page

This component is a variant of a React Page component mapped to the "structure/page" resource type

*No functionality is changed other than to add an app specific CSS class* 

```
import {Page, MapTo, withComponentMappingContext } from "@adobe/cq-react-editable-components";
require('./Page.css');

class AEMPage extends Page {
 
    get containerProps() {
        let attrs = super.containerProps;
        attrs.className = (attrs.className || '') + ' AEMPage ' + (this.props.cssClassNames || '');
        return attrs
    }
}
 
MapTo('we-spa/components/structure/page')(withComponentMappingContext(AEMPage));

```
