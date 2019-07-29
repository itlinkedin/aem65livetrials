# Add Layout Container

We are already using Layout Container on our pages, but the layout containers will not let you resize components.


## Layout Container - Client Library

1. Create Layout Container ClientLibrary with following properties
  * categories | String | we-spa.grid
  
2. Create file css.txt and add following code and save
```
grid.less
```

2. Create file grid.less and add following css 

```

@import (once) "/libs/wcm/foundation/clientlibs/grid/grid_base.less";

 /* maximum amount of grid cells to be provided */
 @max_col: 12;
 
 /* example configuration */
 
 /* default breakpoint */
 .aem-Grid {
   .generate-grid(default, @max_col);
 }
 
 /* add gutter in the grid */
 .aem-GridColumn {
   padding: 0;
 }
 
 /* smaller screen (phone) breakpoint */
 @media (max-width: 767px) {
   .aem-Grid {
     .generate-grid(phone, @max_col);
   }
 }
 
 /* tablet breakpoint */
 @media (min-width: 768px) and (max-width: 1200px) {
   .aem-Grid {
     .generate-grid(tablet, @max_col);
   }
 }

```
3. Save All
4. Import Node in Maven Project

## Add Client library as dependencies

1. Update clientlib.config.js in react module.

```
module.exports = {
    // default working directory (can be changed per 'cwd' in every asset option)
    context: __dirname,
 
    // path to the clientlib root folder (output)
    clientLibRoot: "./../ui.apps/src/main/content/jcr_root/apps/we-spa/clientlibs",
 
    libs: {
        name: "react-app",
        allowProxy: true,
        categories: ["we-spa.react"],
        serializationFormat: "xml",
        jsProcessor: ["min:gcc"],
        dependencies:["we-spa.grid"],
        
        assets: {
            js: [
                "build/static/**/*.js"
            ],
            css: [
                "build/static/**/*.css"
            ]
        }
    }
};


```
2. Deploy project

```
mvn clean install -PautoInstallPackage

```
