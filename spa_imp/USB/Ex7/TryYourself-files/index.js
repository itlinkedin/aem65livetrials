import React from 'react';
import ReactDOM from 'react-dom';
import { ModelManager, Constants } from '@adobe/cq-spa-page-model-manager';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import ScrollToTop from './components/routing/RouteHelper';

require ('./components/page/Page') ;
require ('./components/text/Text') ;
require ('./components/image/Image') ;
require ('./components/list/List') ;
require ('./components/nav/Nav') ;
require ('./components/hero/Hero') ;
require ('./components/title/Title') ;
require ('./components/card/Card') ;
 
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
	         </BrowserRouter>
	       ),
         document.getElementById('root'));
}
 
ModelManager.initialize({ path: process.env.REACT_APP_PAGE_MODEL_PATH }).then(render);