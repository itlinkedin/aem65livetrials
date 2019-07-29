import {Page, MapTo, withComponentMappingContext } from "@adobe/cq-react-editable-components";
import {withRoute} from "./../routing/RouteHelper";

require('./Page.css');

class AEMPage extends Page {
 
    get containerProps() {
        let attrs = super.containerProps;
        attrs.className = "cmp-we-spa-page";
        return attrs;
    }
}
 
MapTo('we-spa/components/structure/page')(withComponentMappingContext(withRoute(AEMPage)));