# Routing


## Install React Router Modules


1. npm install --save react-router
2. npm install --save react-router-dom

## Adding RouteHelpers

3. Add RouteHelper.js
```
import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import { withRouter } from 'react-router';
 

export const withRoute = (WrappedComponent, extension) => {
    return class CompositeRoute extends Component {
        render() {
            let routePath = this.props.cqPath;
            if (!routePath) {
                return <WrappedComponent {...this.props}/>;
            }
 
            extension = extension || 'html';
 
            // Context path + route path + extension
            return <Route key={ routePath } path={ '(.*)' + routePath + '.' + extension } render={ (routeProps) => {
                return <WrappedComponent {...this.props} {...routeProps}/>;
            } } />
        }
    }
};


class ScrollToTop extends Component {
    componentDidUpdate(prevProps) {
      if (this.props.location !== prevProps.location) {
        window.scrollTo(0, 0)
      }
    }
    render() {
      return this.props.children
    }
  }
  export default withRouter(ScrollToTop);
```

### List component to show navigation 
4. Create List Component List.js

```
import React, {Component} from 'react';
import {MapTo} from '@adobe/cq-react-editable-components';
import {Link} from "react-router-dom";
import './List.css';
 
const ListEditConfig = {
 
    emptyLabel: 'List',
 
    isEmpty: function(props) {
        return !props || !props.items || props.items.length < 1;
    }
};

class ListItem extends Component {
	 

 
    render() {
        if(!this.props.path || !this.props.title || !this.props.url) {
            return null;
        }
        return (
            <li className="ListItem" key={this.props.path}>
                <Link className="ListItem-link" to={this.props.url}>{this.props.title}</Link>
            </li>
        );
    }
}


export default class List extends Component {
    render() {
        return (
                <div className="List">
                    <ul className="List-wrapper">
                        { this.props.items && this.props.items.map((listItem, index) => {
                            return <ListItem path={listItem.path}
                                             url={listItem.url} 
                                             title={listItem.title}  />
                         })
                       }
                    </ul>
                </div>
        );
    }
}
 
MapTo("we-spa/components/content/list")(List, ListEditConfig);

```

5. Update List.css

```
ul.List-wrapper {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
}

li.ListItem {
    float: right;
}

li.ListItem a {
    display: block;
    padding: 14px 20px;
    background-color: #f58100;
    text-decoration: none;
    color:#ffffff;
    text-transform: uppercase;

}
```


6. Update MappedComponent
  ```

require('../page/Page');
require('../text/Text');
require('../image/Image');
require('../list/List');
```


### Header Component to show List

7. Update Header.js

```
import React, {Component} from 'react';
import './Header.css';
import List from '../list/List';
import {Link} from "react-router-dom";
import { withRouter } from 'react-router';


class Header extends Component {

    get homeLink() {
        let currLocation;
        currLocation = this.props.location.pathname;
        currLocation = currLocation.substr(0, currLocation.length - 5);

        return (<Link className="Header-action" to={this.props.navigationRoot + ".html"}>
                Training
               </Link>);
        }
       
    render() {
        return (
            <header className="Header">
                <div className="Header-wrapper">
                    <h1 className="Header-title">{ this.homeLink }</h1>
                 
                </div>
            </header>
        );
    }
}

export default withRouter(Header); 
```


8. Update Header.css

```
.Header{
	background: #f12711;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #f5af19, #f12711);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #f5af19, #f12711); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    color:#fff;
    padding:2px 0px 0px 10px;
}
.Header-action{
	color:#fff;
	text-decoration:none;
	text-transform:uppercase;
}

```
9. Update Page.js to use **withRoute**

```
import {Page, MapTo, withComponentMappingContext } from "@adobe/cq-react-editable-components";
import {withRoute} from '../utils/RouteHelper';
require('./Page.css');

class AEMPage extends Page {
 
    get containerProps() {
        let attrs = super.containerProps;
        attrs.className = (attrs.className || '') + ' AEMPage ' + (this.props.cssClassNames || '');
        return attrs
    }
}
 
MapTo('we-spa/components/structure/page')(withComponentMappingContext(withRoute(AEMPage)));

```


10.  Update index.js

```
import React from 'react';
import ReactDOM from 'react-dom';
import { ModelManager, Constants } from '@adobe/cq-spa-page-model-manager';
import App from './App';
import './components/utils/MappedComponent'; 
import {BrowserRouter} from 'react-router-dom';
import ScrollToTop from './components/utils/RouteHelper';

function render(model) {
    ReactDOM.render((
        <BrowserRouter>
            <ScrollToTop>
                <App cqChildren={ model[Constants.CHILDREN_PROP] }
                     cqItems={ model[Constants.ITEMS_PROP] }
                     cqItemsOrder={ model[Constants.ITEMS_ORDER_PROP] }
                     cqPath={ ModelManager.rootPath }
                     locationPathname={ window.location.pathname }/>
            </ScrollToTop>
        </BrowserRouter>), 
        document.getElementById('root'));
}

ModelManager.initialize({ path: process.env.REACT_APP_PAGE_MODEL_PATH }).then(render); 
```

11.  Update App.js to provide **navigationRoot**

```
import React from 'react';
import { Page, withModel, EditorContext, Utils } from '@adobe/cq-react-editable-components';
import Header from './components/header/Header';
require('./App.css');

class App extends Page {
 
    render() {
        return (
            <div className="App">
                <Header navigationRoot="/content/we-spa/react/home" />
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
