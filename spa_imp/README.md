# Single-Page Application (SPA)

#### Objectives
* Identify the benefits of Single-Page Applications (SPAs)
* Identify how AEM is natively built to support SPAs
* Describe how to configure, use, and edit SPAs in AEM

#### Roles
* Solution Consultants


#### Live Trial | Exercises
*  [Exercise 1 - Basics & Setup ](#exercises-1--basics--setup)
*  [Exercise 2 - React Basics & Components ](#exercises-2--react-basics--components)
*  [Exercise 3 -  Editable Page ](#exercises-3--editable-page)
*  [Exercise 4 -  Editable Components in React-app ](#exercises-4--editable-components-in-react-app)
*  [Exercise 5 -  Responsive Layout ](#exercises-5--responsive-layout)
*  [Exercise 6 -  Routing ](#exercises-6--routing)
*  [Exercise 7 -  Header & Other Component ](#exercises-7--the-header-component-the-list-component--others)



#### What are Single Page Applications (SPAs) ?

* A single-page application (SPA) differs from a conventional webpage in that it is rendered client-side and is primarily Javascript-driven, relying on Ajax calls to load data and dynamically update the page.

* This reduces the need for page refreshes and presents an experience to the user that is seamless, fast, and feels more like a native app experience. Some examples of commercial SPAs include Facebook and Gmail.


#### Why Single Page Applications?

* #### Visitors

  * Visitors want native-like experiences when they interact with content.
  * There is clear data that the faster a page, the more likely a conversion will occur.

* #### Marketers

  * Marketers want to offer rich, native-like experiences to entice visitors to fully engage with content.
  * Personalization can make these experiences even more compelling and personalization can be easier with SPAs.

* #### Developers

  * Developers want a clean separation of concerns between content and presentation.
  * Clean separation makes the system more extensible and allows for independent front-end development.


#### Why SPA Editor

* The SPA Editor supports in-context editing of SPAs in What You See Is What You Get (WYSIWYG) manner.

* The SPA Editor brings the easy-to-use capabilities of the AEM Page Editor back to a SPA built with JavaScript frameworks like React or Angular. 
  
* It allows front-end developers to develop an SPA like they are used to, while allowing non-technical authors to edit the content in-place.


#### Upcoming Features 

* ##### Features For Authors
  * Context-Hub support in SPA Editing
  * Experience Fragments
  * Content Fragments
  * Feature Parity with AEM Page Editing
    * Undo-Redo 
    * Inline Image Editing
    * Style System
    * Developer Mode
    * Alias Support
    * Time Warp

* ##### Features For Developers
    * Stablized APIs
    * Server Side Rendering
    * JavaScript Core Components
    * Layout container to allow to use other CSS grids
    * Remote SPA to authenticate and consume AEM content
    * Dynamic registration and loading of JS/CSS libraries
  

# Exercises 1 : Basics & Setup

In Exercise 1, you will perform the basic setup of an AEM project and a react-app.
You already have a minimal AEM project created, which includes two templates and a few of the required components for project.


#### Learning Objective
* Explore a Page Model
* Create the React App
* Describe the purpose of aem-clientlib-generator
* Describe the benefits of AEMFED
* Deploy React-App to AEM 

#### Pre-requisites 
    1. AEM 6.4.2.0 or above
    2. NPM and Node js
    3. Visual Studio Code or any other IDE




#### Step 1.  Install Node and NPM

  *  **Node** is JavaScript runtime that can execute JavaScript-based programs

   * **NPM** is a package manager to install and manage various JavaScript modules.

   1.  Open the site: https://nodejs.org/en/ 
   2.  Download and install the latest version of Node.
   3.  Download and Install VS Code 
      https://code.visualstudio.com/
   4.  Open VS Code, Click Terminal menu in VS Code.
   5.  Verify the node and npm installation by running the following two commands one after another in the terminal or cmd

    node -v
    npm -v
    
  
![Node NPM Version](./resources/nodenpm.jpeg)

* Note For WINDOWS Users: There are multiple types of terminal tools ( cmd, powershell, bash ) on win OS. Hence, When you click on Terminal in VS Code , A pop-up shows with configure button. Click configure button to select Command Prompt as node is installed on cmd by default.


##### Step 2. Set up the AEM Project 

1.  Download the AEM Package [We.SPA AEM CRX Package] (./USB/Ex1/We.SPA.zip) from **USB/Ex1/**
2.  Upload and install the package from the AEM Package Manager (accessible via CRXDE Lite: AEM > Tools > CRXDE Lite).  
   ```
    http://localhost:4502/crx/packmgr
   ```
![We SPA Package](./resources/wespainstall.jpeg)

3.  Go to AEM > Sites > We.SPA. 
4.  Create a new page using the **root** template named **react** ( *react* name is required because of the property setup template).
5.  Create a few more pages inside */we-spa/react* using **page** template this time.

      ![ Refer Site Structure](./resources/sitestructure.jpg)

6. Open the Root Page, it should render blank/no images or text.
   
   * Note:  Install JSON Formatter Chrome Extension to see formatted JSON Response. 
  (https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa) 

1. Remove editor.html from the URL and replace the .html extension with model.json or you can directly access using:
   http://localhost:4502/content/we-spa/react.model.json


![Page Model](./resources/pagemodel.jpeg)

**This json plays very important role in the working of the SPA Editor.** 
* This is the json version of our AEM Page called *Page Model*. 
* It acts as data passed to the react app to display the content on the browser.
* Als,o note that it is providing the children node, which will help in to create navigation.
* This also provides items and itemOrder, which helps to identify what components should be on the page and in which order.

  Note : You can refer this model throught this SPA live trial exercise and see how it changes as more content is added. 

    
##### Step 3. Create and Build a React Application

1. Create a **training** folder and open the terminal (cmd) at this folder.

2. Add a **create-react-app** module. This helps you to easily create the react app.
    ```
    sudo npm install --g create-react-app
    ```
3. Run the following command to create react-app:
   ```
    create-react-app react-app
   ```
    ![React Project Structure](./resources/reactproject.jpeg)

4. Go to the react-app folder in terminal (cmd) and start the app. This will start the sample react app in browser.
    ```
    cd react-app 
    npm start
    

![Sample React App](./resources/samplereactapp.jpeg)

* Note: Press Control+C to stop/terminate the react-app.

5. Inspect the react-app on your file system at **"/training/react-app/*"**. This react-app contains ES6 files, which are not compatible with many browsers but also AEM. Therefore, you have to convert it into regular JavaScript and CSS.

Run the following command to transpile it into regular JS and CSS files. This will create the new folder, **build**, in react-project.

```
npm run build

```
![React Build](./resources/reactbuild.jpeg)


6. Open the index.html in the /build folder and you will see the same sample page opening up.


##### Step 4. Convert React App JS/CSS into clientlibs

In AEM, it is recommended you organize JS and CSS files into a clientlibrary, which reduces the number of network calls from a user's browser. Client library also enhances the modularity and reusability in AEM. 

## AEM JS SDK - aem-clientlib-generator
* Adobe has provided **AEM JS SDK** for SPA Editor, which has many npm modules for different purposes.
* **aem-clientlib-generator module** is one of the modules in AEM JS SDK
* **aem-clientlib-generator module** converts JS & CSS files into AEM clientlibrary.


1.  In the react-app directory , run the following command to install clientlib-generator: 
```
npm install aem-clientlib-generator --save-dev
```

2. Copy **clientlib.config.js** from the USB to the  **react-app** folder.
![Client Lib Config](./resources/clientlibconfig.jpeg)

3. Edit package.json in the react-app folder to update the build command.
```
"build": "react-scripts build && clientlib --verbose",
```
![Package Json](./resources/packagejsonupdate.jpeg)


##### Step 5. Generate client library in the AEM project

For this step, you will place the generated clientlibrary in the AEM project on our machine.

> As a developer, you will have all modules of an AEM project. For the sake of simplicity, you have been provided withthe required ui.apps module with the clientlibs folder only.

1. Copy [aem-app.zip](./USB/Ex1/aem-app.zip) from the USB/Ex1/ folder to the **training** folder and extract the zip. This zip contains clientlibs folder of AEM project.
2. Browse to this path: **aem-app/jcr_root/apps/we-spa/clientlibs**
3. Verify you have the following two folders in the clientlibs folder:
    * clientlibs-base
    * grid
4. Once you build the react-app, the compiled version of react-app will also be generated as clientlib in this folder. Check back after running the following command in the next step.
5. In your terminal (cmd), navigate to the react-app folder and run the following npm command:

```

npm run build

```
8. Verify if the react-app folder is generated in the **aem-app/jcr_root/apps/we-spa/clientlibs** folder:

![react app clientlibs](./resources/reactappclientlibs.jpeg)

#### Step 6. Deploy an updated react-app clientlib to AEM

You have an SPA application as clientlibrary in the AEM project. Now, you must deploy it to the AEM Server.

## AEMFED
 AEMFED is a useful tool for *AEM Frontend Developers* as it allows front-end developers to deploy code and view the changes immediately in a browser.

1. Open a terminal (cmd) and run the following command:    
```
sudo npm install aemfed --global
```

2. Open a *New* terminal in the aem-app folder and type the following command:

```
aemfed -t "http://admin:admin@localhost:4502" -w "./jcr_root"
```

![AEMFED](./resources/aemfed.jpeg)

   * -t points AEM server
   * -w point to "jcr_root" folder in our project

AEMFED will be monitoring the jcr_root folder and as soon as a change is made, it will deploy the change.


**NOTE: You must keep this terminal running. Otherwise, the app will not be deployed.** 


##### Step 7. 

1. Got to the react-app terminal and run the following npm command again. AEMFED will now identify the change and deploy the code to AEM.

```

npm run build

```
2. Go to AEM > Site > We.SPA > react > Home.
3. Open this page and verify your generated react-site in AEM is present.

You will not see the react logo on the page, as we have only deployed the .js and .css of react-app to AEM and not the images.


## Can you do following by yourself?
* Explore a Page Model
* Create a React App
* Describe the purpose of aem-clientlib-generator
* Describe the benefits of AEMFED
* Deploy a React-App to AEM 





# Exercises 2 : React Basics & Components

In Exercise 2, you will make an AEM Page editable. In the We.SPA package you installed in Exercise 1, there are already the required AEM components you need for this exercise.


#### Learning Objectives
* Learn the Basics of the React Application
* Explore and explain modularity in SPA 
* Pass data to the React App
  

#### Step 1. Update React Application to see the changes

1. Open the react-app folder in VS Code IDE. 

2. Open and inspect index.html available at this location: **react-app/public/index.html** 
    * This file has only ONE div with **id="root"**; however, there is no content.
    * This is the only HTML page in this entire app. Because of this, it is another reason for why we call this app a Single-Page App (SPA).

3. Open index.js **react-app/src/index.js**
    ```
        ReactDOM.render(<App />,
                        document.getElementById('root'));
    ```
  
     * This line of code instructs Node to render content from the <APP> component and display all the content at the root div of index.html.
      * You can already see now how the JS is driving and displaying content.
      * This is the JS entry point of Application.
  
4. Open App.js from **react-app/src/App.js**

    * This file or component has all sample structure and content (HTML), which is currently being displayed in our AEM instance.

   1. Replace the return method with the following code:
    ```
    return (
      <div className="App">
        <h1>We.SPA</h1>
        <p>Welcome to AEM 6.5 LiveTrials</p>
      </div>
    );

    ```
    OR simply replace all code contained within with the following code:

    ```
    import React, { Component } from 'react';
    import logo from './logo.svg';
    import './App.css';

      class App extends Component {
        render() {
          return (
            <div className="App">
              <h1>We.SPA</h1>
              <p>Welcome to AEM 6.5 LiveTrials</p>
            </div>
          );
        }
      }

      export default App;

    ```

 1. Open the terminal (cmd) at react-app and run the build command:
   ```
    npm run build
   ```
 2. If your AEMFED is running, your AEM home page should reflect the changes you just made.
    * Open http://localhost:4502/content/we-spa/react/Home.html.
   
   ![Welcome](./resources/welcometext.jpeg)

> You may need to delete the browser cache to load the updated content. Press **Command+Shift+R** to delete the cache and reload the page.

#### Step 2. Modularize the React App 
*  There is a similar concept of components in the React or Angular Apps like AEM.
*  Components are basically used to break the page into reusable logical or UI units. It makse the code readable, manageable, and reusable.

1. Go to **react-app/src** and create folder **components**.
2. In **components**, create a folder called, **header**.
3. In the **header** folder, create two files using initial uppercase and naming them as follows: **Header.js** and **Header.css**.
4. Open **Header.js** and add the following code:
    ```
    import React, { Component } from 'react';
    import './Header.css';
    
    export default class Header extends Component {
        render() {
            return (
                <div className="header">
                    <h1>We.SPA Header</h1>
                </div>  
             );
            }
    }

    ```
5. Open **Header.css** and add the following code to add basic styling to the page:
   ```
    .header{

        background : #444;
        color: white;
        padding:100px;
    }

   ```

6. Remove the H1 tag and add this Header component on App.js:

```
  <h1>We.SPA</h1>  - Remove Code
  <Header title="****We.SPA - Single Page Application****"/> - Add Code

```
OR Replace the existing code with the following code:

   ```
   import React, { Component } from 'react';
 import logo from './logo.svg';
 import './App.css';
 import Header from './components/header/Header';

  {/* COMMENT: Import Header component to use it  */}


 class App extends Component {
     render() {
         return (
         <div className="App">
             
             {/* COMMENT: Add Header in order of display  */}
             <Header/>

             <p>Welcome to AEM 6.5 LiveTrials</p>
         </div>
         );
     }
  }

 export default App;
   ```
7. Run the build command from react-app folder in the terminal (cmd):
   ```
    npm run build

   ```

   ![ Header2](./resources/welcometext1.jpeg)

#### Step 3. Passing Data to the React Application

1. Update the Header component to accept title as the value.
   * this.props.value - this.props stands for values passed to this component 
   * *.value stands for value identifies passed by component.

```
import React, { Component } from 'react';
import './Header.css';

export default class Header extends Component {
  render() {
    return (
        <div className="header">

         {/* COMMENT: Header component expects title from component calling it  */}
         
            {this.props.title}

        </div>
        
    );
  }
}


```
2. Pass the value to the Header component from App.js: 



```
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header/Header';

export default class App extends Component {
  render() {
    return (
      <div className="App">

      {/* COMMENT :Passing title as data in Header Component */}

        <Header title="We.SPA- Single Page Application"/>


        <p>Welcome to AEM 6.5 LiveTrials</p>
      </div>
    );
  }
}

``` 
1. Run the build command from react-app and you should see the new title as the following:

![ Header3 ](./resources/welcometext3.jpeg)

**NOTE: The concept of passing data to the react-component is a very important aspect of an AEM-SPA Integration**
  * The AEM page needs to export the page model or JSON as data to react.
  * React will access the data and display the content.


## Try it yourself
* Create a simple footer component to accept a copyright message and company name .
* Pass the required data and display it on the page.

## Conclusion! Important!

  * You can now modularize a page into components.
  * You also learned how to pass values to a component dynamically. 
  * Almost all these things were possbile through workarounds In previous versions of AEM, the WYSIWG editor was not available.
  * This is where **AEM SPA EDITOR** becomes a "big deal."
  * **AEM SPA EDITOR** lets you perform in-context editing of a page. You will learn more about and try more examples of in-context editing in the next exercise.



# Exercises 3 : Editable Page

#### Step 1.Install AEM JS SDK

1. Open terminal at react-app, and run following command one after another to install AEM JS SDK.

```
npm install @adobe/cq-spa-component-mapping
npm install @adobe/cq-spa-page-model-manager
npm install @adobe/cq-react-editable-components

```
2. Open terminal at react-app, and run following command one after another to install other required dependencies.

```
npm install react-fast-compare
npm install ajv --save-dev
npm install clone --save-dev

```

#### Step 2. Create Page Component

Now we need to create a react component for AEM page component. This page component will be responsible for adding page component and component on the page.

1. Create a folder for page component named **page** in lowercase inside **/react-app/src/components** folder.
   
2. Copy **Page.js** and **Page.css** from Ex3 to this newly created page folder. Open Page.js to inspect



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

First Line: We are importing components from **cq-react-editable-components** module which is part of AEM JS  SDK.

```
import {Page, MapTo, withComponentMappingContext } from "@adobe/cq-react-editable-components";

```

Last Line : We need to map AEM components to their counterpart in react-app:

   * This means that JSON content exported by page component will be consumed and displayed by this react page component.
  
```
MapTo('we-spa/components/structure/page')(withComponentMappingContext(AEMPage));

```

#### Step 3. Update App Component 
1. Copy **App.js** from **Ex3** folder to *react-app/src* , it will replace existing App.js. *Note: You may rename existing App.js to App_1.js , so you can revert back if you want"

2. Open new App.js :


```
import React from 'react';
import { Page, withModel, EditorContext, Utils } from '@adobe/cq-react-editable-components';
import Header from "./components/header/Header";
 
class App extends Page {
 
    render() {
        return (
            <div className="App">
                <Header title="We.SPA"/>

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

Inspect following two important LOC in App.js

   * Various components are getting imported from moduler **@adobe/cq-react-editable-components**
   ```
        import { Page, withModel, EditorContext, Utils } from '@adobe/cq-react-editable-components';
   ```

    * **Editor Context Provider** Block -  This block will be adding components on a specific page of SPA.
  
   ```
        <EditorContext.Provider value={ Utils.isInEditor() }>
                    { this.childComponents }
                    { this.childPages }
                </EditorContext.Provider>
   ```

#### Step 4. Update index.js

Now we need to access and pass JSON / Model from AEM to react-app, this will be handled at index.js level.

1. Copy *index.js* from **Ex3** folder to *react-app/src*. 

```
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

2. Inspect following Lines of Code in index.js :

* ModelManager is imported from **@adobe/cq-spa-page-model-manager** , this will be responsible for access and passing Model to react-app

```
import { ModelManager, Constants } from '@adobe/cq-spa-page-model-manager';

```

* We are passing all required values App component for page creation. 
  * You have done similar thing with header component in Exercise 2 where you passed title value to Header.

``` 
<App cqChildren={ model[Constants.CHILDREN_PROP] }
             cqItems={ model[Constants.ITEMS_PROP] }
             cqItemsOrder={ model[Constants.ITEMS_ORDER_PROP] }
             cqPath={ ModelManager.rootPath }
             locationPathname={ window.location.pathname }/>

```

* Lastly , we are initializing Model Manager.
```

ModelManager.initialize({ path: process.env.REACT_APP_PAGE_MODEL_PATH }).then(render);
```

#### Step 5. Deploy and Verify

1. Open Terminal at react-app , and run following command
   ```
        npm run build
   ```

2. Go to AEM and open Home page under /we-spa/react/ in Edit mode.
   You should be able to see an editable page with responsive grid.

   * This responsive grid is there because we have added in AEM page template.

  ![AEM Page](./resources/editablepage.jpeg)





# Exercises 4 : Editable Components in React-app

We have already worked with a few components so let's quickly list them, and you should be able to explain what they are doing.

  * App Component  
  * Header Component
  * Footer Component (*If you took Try It exercise*)
  * Page Component

### How component Works in AEM + SPA setup ?

  With the SPA Editor in AEM, Adobe has separated concerns of SPA or FED developer and the AEM developer.

* AEM Developer will create a component in AEM and provide 
    * structure of component and dialog box for Authors
    * Logic to export content stored by Authors

* SPA Developer will create components in react-app to render component and provide UI. 

Because of this, no HTL code is  required in AEM, because the display will be handled by a SPA Developer in react or angular


## Note
* Core components are already supports SPA use-cases which mean Core components export their content in required JSON format.
* In Live trials exercises,  we will be using core-components mostly so we don't need to create a custom component.
* In general as well ,core components need a proxy component in your project. We have already created those components and deployed through CRX package installed in Exercise 1.
* So you will taking role of React Developer and AEM Developer's task is done through provided exercise.


#### Step 1. Title Component
1. Go to folder **/react-app/src/components** and create new a new folder for the Title Component named "title"

2. Copy Title.js and Title.css from USB/Ex4
3. Open Title.js and lets inspect important parts in each block :

* Importing Basic Components and MapTo from **cq-react-editable-components**
```
import React, { Component } from 'react';
import { MapTo } from '@adobe/cq-react-editable-components';
import "./Title.css";

```

* When component is empty , we need to show a placeholder text. This block has condition to check text
  
```

const TitleEditConfig = {
    emptyLabel: 'Title - We.SPA',
    isEmpty: function (props) {
        return !props || !props.text || props.text.trim().length < 1;
    }
};
```
* Render method to access values and return HTML for display.
```
class Title extends Component {

    render() {
        return (
          this.props.type ? 
          <this.props.type className="title">{this.props.text}</this.props.type> : 
          <h1 className="title">{this.props.text}</h1>
          );
    }
}
```
* Mapping  Title Component in React to AEM Title Component.
```

MapTo('we-spa/components/content/title')(Title, TitleEditConfig);

``` 


#### Step 2. Add component to index.js
1. As components will be added dynamically by our authors, we need to add title component in **index.js** available at **/react-app/src/index.js**

```

require ('./components/title/Title') ;

```
Now header part of index.js should look like as following:
```
  import React from 'react';
  import ReactDOM from 'react-dom';
  import { ModelManager, Constants } from '@adobe/cq-spa-page-model-manager';
  import App from './App';
  require ('./components/page/Page');
  require ('./components/title/Title');
```

#### Step 3. Deploy 
```
npm run build
```

#### Step 4. Open Home Page in AEM Editor
* Open URL http://localhost:4502/editor.html/content/we-spa/react/home.html

* Add **Title - We.SPA** component on page , try to change it's value.

![Title Component](./resources/titlecomponent.jpeg)

## Try It Yourself !
* You can create image and text component for SPA yourself.
* You have got required files for image and text component in **USB/Ex4/image** and **USB/Ex4/image/text**.  Can you make them available in AEM for Authoring ?

Final output should look like as following:

![EditableComponent](./resources/editablecomponent2.jpeg)



# Exercises 5 : Responsive Layout

A Layout container is one of the most useful things in AEM, as it lets you change size of components to match your requirements.

Right now, if you try to resize the Image or the Text component, it won't work. Let's fix this issue.

### Make the Layout container resizable

* The Layout container is already present in *Edit* mode in AEM. The reason it is not working properly is because the Layout Container CSS is missing.

* The CSS is being handled by clientlib generator, so we need to add layout grid css files in the clientlib.config.js file.

1. We have already provided grid css files through the CRX Package. You may have seen it in Exercise 1.

   ![](./resources/reactappclientlibs.jpeg)


2. Edit **/react/clientlib.config.js ** to add dependency as following.
   ```
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
   ```

3. Now resize components in AEM page in Edit Mode.
   ![grid resize](./resources/griddcss.jpeg)


> Similar steps can be used for other required javascript libraries like jquery , bootstrap etc.



# Exercises 6 : Routing

We have been working on one page only , before we create any other page we need to setup proper routing mechanism.

In this exercise we will be adding routing to our SPA.

#### Step 1. Create Navigation Component with Links.

1. Open Terminal at react-app folder and run following command to install React Router and React Router DOM.
```
npm install --save react-router
npm install --save react-router-dom
```

2. Now create **nav** folder for navigation component in **/react-app/src/components**
3. Copy **Nav.js** & **Nav.css** from /USB/Ex6/nav1/nav to recently create nav folder.
4. Inspect **Nav.js** to see **<Link>** as this will generate Links in SPA.  But it needs <BrowserRouter> as the parent. We will add that in index.js in next step.
 
```
            <li className="NavItem" key={this.props.path}>
                <Link className="NavItem-link" to={this.props.url}>
                        {this.props.title}
                </Link>
            </li>
```

1. Copy **index.js** from /USB/Ex6/nav1/ to replace **/react-app/index.js**
2. Inspect this file , BrowserRouter as added on App.
   ```
   <BrowserRouter>
            <App cqChildren={ model[Constants.CHILDREN_PROP] }
                cqItems={ model[Constants.ITEMS_PROP] }
                cqItemsOrder={ model[Constants.ITEMS_ORDER_PROP] }
                cqPath={ ModelManager.rootPath }
                locationPathname={ window.location.pathname }/>
     </BrowserRouter>


   ```
3. Open terminal in react-app , Deploy app to AEM
   ```
        npm run build
   ```
4. Open AEM page and you should see Navigation in the page
   * You don't need to drag and drop navigation to the page because it was added at the template level.
   * It was always in the templagte , but since there was no SPA logic to display, it was not visible.
   
**Note: Navigation won't work right now. There are still issues to fix.**

![Navigation](./resources/nav1.jpeg)

1. Go back to the Home page and scroll to the end of the page - you will now see a few more Navigation components showing up because:
    
      * Multiple Navigation components are showing up because we are using a **Single Page Application** .
      * We will understand this issue in next step and fix it.
  
   ![Navigation](./resources/nav2.jpeg)

#### Step 2. Create a Route Helper to solve this issue.

* The reason we have multiple navigation components is because SPAs will show all the pages at once. Remember, a SPA is only one single page. 

* The reason of having multiple navigation component is because SPA will show all page at once ; because all SPA page is part of one Single Page.
* To fix this issue , we need to define logic to show individual pages.
* We will be creating a Route Helper which will help us to fix this issue.

1. Create **routing** folder at **/react-app/src/components/**
2. Copy RouteHelper.js available at /USB/Ex6/nav2
3. Lets open RouteHelper.js and inspect importants parts block by block:

    * Import Route and withRouter from react-router-*

```
import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import { withRouter } from 'react-router';

```

* In this step we are getting URL of the page and creating a route based on the path. 
* For Example : If Products Page is opened /products
```
<Route path="/Products.html"> {Products-Page-As-Component }</Route>

```

```
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

```

#### Step 3. Update Page Component to use RouteHelper

* Import *withRoute* from RouteHelper
```
import {Page, MapTo, withComponentMappingContext } from "@adobe/cq-react-editable-components";

import {withRoute} from "./../routing/RouteHelper";
..
..
..Same Code
```

* We are passing Page as value in withRoute **withRoute(AEMPage)** , With help of RouteHelper, it provide individual pages for each route/ Link.
```

MapTo('we-spa/components/structure/page')(withComponentMappingContext(withRoute(AEMPage)));

```

#### Step 4. Build & Deploy App 
1. Run following command from react-app folder

```
npm run build 
```

2. Review Home page and now Navigation should work as expected. 
    * Until now you have worked on Home page only ,Now you can go to other pages and edit the pages.




# Exercises 7 : The Header Component, The List Component & others

#### Step 1. Header Component
* Navigation is working as expected, but if we click on Logo or Page Title it will not take us back to the Home Page, which is the expected behavior.

* Let's update the header component to meet this common need.
* These link based components may not have worked before Navigation started working.


1. Copy the header component folder from **/USB/Ex7/header** and replace existing header component at **/react-app/src/components**
2. Open Header.js and lets inspect

    * We are using **< Link>** to create clickable link.
    * Now header components expect navRoot so link know target URL.
   ```
   <header className="Header">
        <Link className="Header-link" to={this.props.navRoot + ".html"}>
                <h1 className="Header-title">
                    We.SPA 
                    <span class="Header-logo">♤</span>
                </h1>
        </Link>
    </header>
   

   ```

3. Open App.js **/react-app/src/** folder

    * We need to pass **navRoot** as value in Header component.
    * You can do it yourself or copy App.js from ****/USB/Ex7/**
   ```
    <Header navRoot="/content/we-spa/react/home"/>
   ```

4. Build and Deploy
    * In terminal run following command from /react-app folder
   ```
    npm run build
   ```

5. Verify clickable and updated Header


## Try It Yourself !
* Hero Component 
* Card Component
* List Component
* Footer Component

Note : You can find code for all these package in /USB/Ex7 , All you need to do is put in right place and add require statements in index.js

You can use these components to make authorable page.

![Page Example](./resources/fullpage1.jpeg)
