# Custom Component For SPA

## Create Component Exporter to fetch content for component and make it available for SPA component.

1. Create Interface for Custom Heading Component

```
package com.adobe.training.wespa.core.models;

import javax.annotation.Nullable;
import com.adobe.cq.export.json.ComponentExporter;

public interface Heading extends ComponentExporter{
	
	@Nullable
	public String getExportedType();

    @Nullable
    public String getTitle();
    
    @Nullable
    public String getType();
}
```


2. Create Implementation Class

```
package com.adobe.training.wespa.core.models.impl;

import com.adobe.training.wespa.core.models.Heading;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;

@Model(
    adaptables = SlingHttpServletRequest.class, 
    adapters = {Heading.class, ComponentExporter.class}, 
    resourceType = HeadingImpl.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
    )
@Exporter(
    name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, 
    extensions = ExporterConstants.SLING_MODEL_EXTENSION
    )
public class HeadingImpl implements Heading {

    static final String RESOURCE_TYPE = "we-spa/components/content/heading";
    static final String PN_TITLE   = "title";
    static final String PN_TYPE   = "type";

    @ScriptVariable
    private ValueMap properties;
    
	@Override
	public String getExportedType() {
		return RESOURCE_TYPE;
    }

    @Override
    public String getTitle() {
        return properties.get(PN_TITLE, String.class);
    } 
    
    @Override
    public String getType() {
        return properties.get(PN_TYPE, String.class);
    } 
}

```

## Create AEM component with dialogbox to take input from user.

1. Create component in AEM under 'we-spa/components/content' 
  * component title and name is heading
  * component group is we-spa

2. Remove title.jsp as rendering will be provided by React Component
3. Copy node **/apps/core/wcm/components/title/v2/title/cq:dialog** and paste in title component
4. Go to **/apps/we-spa/components/content/heading/cq:dialog/content/items/tabs/items/properties/items/columns/items/column/items/title**
5. Change **name** property value to **./title** instead of **./jcr:title**
6. Remove linkURL node from parent node.

## Create React component to render the content from Component Exporter on AEM Page

1. Create heading component in react

```
import React, {Component} from 'react';
import {MapTo} from '@adobe/cq-react-editable-components';
require ('./Heading.css');

const HeadingEditConfig = {
		
	    emptyLabel: 'Heading - We.SPA',
	    
	    isEmpty: function(props) {
	        return !props || !props.title || props.title.trim().length < 1;
	    }
	};


class Heading extends Component {
	
	get textContent() {
        return this.props.title;
    }
	
	render() {
		const Tag = this.props.type;
		
		if(Tag){
			return <Tag className='cmp-heading'>{this.textContent}</Tag>;
		}
		
		return <h1 className='cmp-heading'>{this.textContent}</h1>;
		
		
    }
}

MapTo('we-spa/components/content/heading')(Heading, HeadingEditConfig);

```

2. Add CSS 

```
    .cmp-heading{
	padding : 10px;
	text-align: center;
	margin: 5px 0px 5px 0px;
	color: #fff;
	text-transform: uppercase;
	background: #f12711;  /* fallback for old browsers */
	background: -webkit-linear-gradient(to right, #f5af19, #f12711);  /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(to right, #f5af19, #f12711); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
```

3. Add component to Mapped Component

```
require('../heading/Heading');

```

4. Deploy
```
mvn clean install -PautoInstallPackage

```
