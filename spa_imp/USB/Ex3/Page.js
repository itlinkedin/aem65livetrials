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