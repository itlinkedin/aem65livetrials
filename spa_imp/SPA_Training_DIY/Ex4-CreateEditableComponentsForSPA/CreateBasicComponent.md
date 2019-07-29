# Create Editable Component For SPA based on Core Components

1. Create new folder 'text' at src/component and create  Text.js under this text folder with following code

```
import React, {Component} from 'react';
import {MapTo} from '@adobe/cq-react-editable-components';

const TextEditConfig = {
 
    emptyLabel: 'Text - We.SPA',
 
    isEmpty: function(props) {
        return !props || !props.text || props.text.trim().length < 1;
    }
};
 

class Text extends Component {
 
    get richTextContent() {
        return <div dangerouslySetInnerHTML={{__html:  this.props.text}}/>;
    }
 
    get textContent() {
        return <div>{this.props.text}</div>;
    }
 
    render() {
        return this.props.richText ? this.richTextContent : this.textContent;
    }
}
 
MapTo('we-spa/components/content/text')(Text, TextEditConfig);
```

2. Create a file MappedComponent.js at src/components/utils and add following code

```
require('../page/Page');
require('../text/Text');
```

1. Update index.js to add MappedComponent instead of Page

```
import React from 'react';
import ReactDOM from 'react-dom';
import { ModelManager, Constants } from '@adobe/cq-spa-page-model-manager';
import App from './App';
import './components/utils/MappedComponent'; 

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

