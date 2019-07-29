# SPA Scenarios

We.Retail wants to tranform their existing SPA site into an Authorable SPA site in AEM.

## Prerequisites
* AEM 6.4.2
* npm  6.4.x
* node 10.x
* maven 3.3.x

### NOTE :
* OPTION 1: If you want to set up everything on your own, you can following all the steps.
* OPTION 2: You can directly download the completed [Project](we-spa.zip), This project contains files with completed steps. All you need to do is extract the [Project](we-spa.zip) and deploy it to AEM.

# AEM Project

## 1. Create a Maven Project


``` 
mvn org.apache.maven.plugins:maven-archetype-plugin:2.4:generate \
 -DarchetypeGroupId=com.adobe.granite.archetypes \
 -DarchetypeArtifactId=aem-project-archetype \
 -DarchetypeVersion=15 \
 -DarchetypeCatalog=https://repo.adobe.com/nexus/content/groups/public/
 
 ```
Enter the following values in Interactive mode:

* groupId: com.adobe.training
* artifactId: we-spa
* version: 1.0-SNAPSHOT
* package: com.adobe.training.wespa
* appsFolderName: we-spa
* artifactName: we-spa
* componentGroupName: we-spa
* confFolderName: we-spa
* contentFolderName: we-spa
* cssId: we-spa
* packageGroup: we-spa
* siteName: we-spa

Enter Y to confirm.
 
## 2. Update the following in the generated project as we do not need it for training.
  *  Delete it.tests and it.launcher
  *  Delete /content/training/en and /fr
  *  Delete /conf/.../template-types
  *  Change parent POM.xml to remove it.tests and launcher
  *  Change uber jar version to 6.4.0 in parent pom.xml
  *  Delete site.core / src/test
 
 ## 3. Deploy Project
 
```
mvn clean install -PautoInstallPackage -Padobe-public
```

# React Project

## 1. Install create-react-app module for node.
```
npm i create-react-app
```
## 2. Create sample React app from: https://github.com/facebook/create-react-app#creating-an-app

```
npx create-react-app react-app
cd to react-app and npm start
```

## 3.Install aem clientlib generator
```
In the react-app directory, run this command: npm install aem-clientlib-generator --save-dev
```
## 4. Create file **clientlib.config.js** in react-app and add the following code:

```

module.exports = {
    // default working directory (can be changed per 'cwd' in every asset option)
    context: __dirname,
 
    // path to the clientlib root folder (output)
    clientLibRoot: "./../ui.apps/src/main/content/jcr_root/apps/training/clientlibs",
 
    libs: {
        name: "react-app",
        allowProxy: true,
        categories: ["we-spa.react"],
        serializationFormat: "xml",
        jsProcessor: ["min:gcc"],
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


## 5. Update Package.json inside react-app
```
"build": "react-scripts build && clientlib --verbose",
```
 
 
 # Add React Project As Module in AEM Project
 1. Create [pom.xml](pom.xml) in react-app 
 ```
 
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
    <modelVersion>4.0.0</modelVersion>
 
    <!-- ====================================================================== -->
    <!-- P A R E N T  P R O J E C T  D E S C R I P T I O N                      -->
    <!-- ====================================================================== -->
    <parent>
        <groupId>com.adobe.training</groupId>
        <artifactId>we-spa</artifactId>
        <version>1.0-SNAPSHOT</version>
        <relativePath>../pom.xml</relativePath>
    </parent>
 
    <!-- ====================================================================== -->
    <!-- P R O J E C T  D E S C R I P T I O N                                   -->
    <!-- ====================================================================== -->
    <artifactId>we-spa.react</artifactId>
    <packaging>pom</packaging>
    <name>We-SPA - React App</name>
    <description>We-SPA React Module</description>
 
 
    <!-- ====================================================================== -->
    <!-- B U I L D   D E F I N I T I O N                                        -->
    <!-- ====================================================================== -->
    <build>
    <plugins>
    <plugin>
        <groupId>com.github.eirslett</groupId>
        <artifactId>frontend-maven-plugin</artifactId>
        <version>${frontend-maven-plugin.version}</version>
 
        <executions>
 
        <execution>
            <id>install node and npm</id>
            <goals>
            <goal>install-node-and-npm</goal>
            </goals>
            <configuration>
            <nodeVersion>${node.version}</nodeVersion>
            <npmVersion>${npm.version}</npmVersion>
        </configuration>
        </execution>
 
        <execution>
            <id>npm install</id>
            <goals>
            <goal>npm</goal>
            </goals>
            <!-- Optional configuration which provides for running any npm command -->
            <configuration>
            <arguments>install</arguments>
            </configuration>
        </execution>
 
        <execution>
            <id>npm run build</id>
            <goals>
            <goal>npm</goal>
            </goals>
            <configuration>
            <arguments>run build</arguments>
            </configuration>
        </execution>
 
        </executions>
    </plugin>
    </plugins>
</build>
</project>
```

## 2. Add React as Module in parent pom.xml

```
 <modules>
        <module>core</module>
        <module>react-app</module>
        <module>ui.apps</module> 
    </modules>
```

## 3. Add frontend plugin to parent pom.xml

```
<properties>
        <aem.host>localhost</aem.host>
        <aem.port>4502</aem.port>
        <aem.publish.host>localhost</aem.publish.host>
        <aem.publish.port>4503</aem.publish.port>
        <sling.user>admin</sling.user>
        <sling.password>admin</sling.password>
        <vault.user>admin</vault.user>
        <vault.password>admin</vault.password>
		<frontend-maven-plugin.version>1.6</frontend-maven-plugin.version>
   		<node.version>v10.8.0</node.version>
    	<npm.version>6.2.0</npm.version>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
    </properties>
```

# Deploy project to AEM
```
From project root, run this command: mvn clean install -PautoInstallPackage -Padobe-public
```
