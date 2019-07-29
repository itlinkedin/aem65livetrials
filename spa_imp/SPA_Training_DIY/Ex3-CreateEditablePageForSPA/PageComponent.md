# Step1 : Page Component

### Update Page Components of AEM

1. Go to **we-spa/components/structure/**
2. Create new AEM component named **app** of Super Type =  **we-spa/components/structure/page**
3. Go to **we-spa/components/structure/page**

4. Create body.html and add following code 
	```
   <div id="root"></div>
   
   ```
5. Open customheaderlibs.html and add following code

```
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta property="cq:datatype" data-sly-test="${wcmmode.edit || wcmmode.preview}" content="JSON"/>
<meta property="cq:wcmmode" data-sly-test="${wcmmode.edit}" content="edit"/>
<meta property="cq:wcmmode" data-sly-test="${wcmmode.preview}" content="preview"/>

<meta property="cq:pagemodel_root_url"
    data-sly-use.page="com.adobe.training.wespa.core.models.HierarchyPage"
    content="${page.rootUrl}"/>

<sly data-sly-use.clientlib="/libs/granite/sightly/templates/clientlib.html">
<sly data-sly-call="${clientlib.css @ categories='we-spa.react'}"/>
```
 
6. Open customfooterlibs.html and add following code

```
<sly data-sly-use.clientLib="${'/libs/granite/sightly/templates/clientlib.html'}"></sly>

<sly data-sly-test="${wcmmode.edit || wcmmode.preview}"
    data-sly-call="${clientLib.js @ categories='cq.authoring.pagemodel.messaging'}"></sly>
<sly data-sly-call="${clientLib.js @ categories='we-spa.react'}"></sly>
```

7. Save All

### 

1.In Maven Project, Create Interface HierarchyPage.java at core/models
2. Add following Code
```

package com.adobe.training.wespa.core.models;

import com.adobe.cq.export.json.ContainerExporter;
import com.adobe.cq.export.json.hierarchy.HierarchyNodeExporter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public interface HierarchyPage extends HierarchyNodeExporter, ContainerExporter {
    
    /**
     * Title of the page. The page title can be the result of multiple fallbacks
     *
     * @return
     */
     @JsonProperty("title")
     public String getTitle();

     /**
     * URL to the root model of the App
     *
     * @return
     */
     @JsonIgnore
     public String getRootUrl();

     @JsonIgnore
     public HierarchyPage getRootModel();

}
```

3. Fix dependency issues by addding following dependencies at parent pom.xml

```
 <!-- Jackson -->
            <dependency>
                <groupId>com.fasterxml.jackson.core</groupId>
                <artifactId>jackson-annotations</artifactId>
                <version>2.8.4</version>
                <scope>provided</scope>
            </dependency>
            <dependency>
                <groupId>com.fasterxml.jackson.core</groupId>
                <artifactId>jackson-databind</artifactId>
                <version>2.8.4</version>
                <scope>provided</scope>
            </dependency>
            <dependency>
                <groupId>com.fasterxml.jackson.core</groupId>
                <artifactId>jackson-core</artifactId>
                <version>2.8.4</version>
                <scope>provided</scope>
			</dependency>
			<!-- javax.inject 1 -->
            <dependency>
                <artifactId>geronimo-atinject_1.0_spec</artifactId>
                <version>1.0</version>
                <groupId>org.apache.geronimo.specs</groupId>
                <scope>provided</scope>
			</dependency>
			
			<dependency>
	            <groupId>com.adobe.cq</groupId>
	            <artifactId>com.adobe.cq.export.json</artifactId>
	            <version>0.1.10</version>
	            <scope>provided</scope>
			</dependency>
			
			               <dependency>
                <groupId>com.adobe.cq</groupId>
                <artifactId>core.wcm.components.core</artifactId>
                <version>2.2.0</version>
            </dependency>
            
               <dependency>
                <groupId>com.google.code.findbugs</groupId>
                <artifactId>jsr305</artifactId>
                <version>2.0.0</version>
                <scope>provided</scope>
            </dependency>
 ```           

9. Update uber jar version to match AEM version in pom.xml    

10. Add dependencies to core/pom.xml
```
 <!-- Jackson -->
             <dependency>
			<groupId>com.fasterxml.jackson.core</groupId>
			<artifactId>jackson-annotations</artifactId>
		</dependency>
		<dependency>
			<groupId>com.fasterxml.jackson.core</groupId>
			<artifactId>jackson-databind</artifactId>
		</dependency>
		<dependency>
			<groupId>com.fasterxml.jackson.core</groupId>
			<artifactId>jackson-core</artifactId>
		</dependency>
		<dependency>
			<artifactId>geronimo-atinject_1.0_spec</artifactId>
			<groupId>org.apache.geronimo.specs</groupId>
		</dependency>
		
		 <dependency>
	         <groupId>com.adobe.cq</groupId>
	         <artifactId>com.adobe.cq.export.json</artifactId>
	     </dependency>
	     <dependency>
                <groupId>com.adobe.cq</groupId>
                <artifactId>core.wcm.components.core</artifactId>
          </dependency>
          
          <!--  NoNull -->
           <dependency>
            <groupId>com.google.code.findbugs</groupId>
            <artifactId>jsr305</artifactId>
        </dependency>
 ```       
10. Update uber jar version in pom.xml

11. Add [HierarchyComponentContextWrapper.java](HierarchyComponentContextWrapper.java) at **core/models/impl**
12. Add [HierachyPageImpl.java](HierarchyPageImpl.java) at **/core/models/impl**

Next Step : [Editable Page Component](EditablePageComponent.md) 
