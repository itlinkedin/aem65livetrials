## Automated Forms Conversion service
***

Speed up the conversion of print forms to adaptive forms
Automated Forms Conversion service helps accelerate digitization and modernization of data capture experience through automated conversion of legacy print forms to adaptive forms. The service, powered by Adobe Sensei, automatically converts your PDF forms to device-friendly and responsive adaptive forms. While leveraging the existing investments in PDF Forms, the service also applies appropriate validations to adaptive form fields during conversion. The service helps:

* Save manual effort required to convert legacy forms to adaptive forms
* Generate reusable adaptive form fragments
* Generate Document of Record during conversion
* Apply patterns and appropriate validations during conversion
* Enables Adobe Analytics during conversion

The service supports PDF forms created with any version of AEM Forms or Adobe LiveCycle, going all the way back to AEM 6.0 Forms and Adobe LiveCycle ES3. The service also supports forms created with Adobe Acroba

***

### Conversion workflow

Automated Forms Conversion service runs on Adobe Cloud. You connect your AEM instance to the service, upload legacy forms to your AEM instance, specify configurations, and start the conversion. The complete conversion process is as listed below:

![Conversion workflow](images/Conversionworkflow.png)

****

### Configure the Automated Forms Conversion service

#### Download and install AEM Forms add-on package

An AEM instance contains basic forms capabilities. Install AEM Forms add-on package to avail all the capabilities of AEM Forms. The package is required to set up and run the conversion service: 

1. Download the AEM Forms add-on package. 
     * Windows: [AEMFD-Win-Pkg](https://www.dropbox.com/s/qn4zpvjcdu2n6pv/adobe-aemfd-win-pkg-6.0.90.zip?dl=0)
     * Mac: [AEMfd-OSX-pkg](https://www.dropbox.com/s/iwrs48czndcz7hj/adobe-aemfd-osx-pkg-6.0.90.zip?dl=0)

2. Log in to AEM instance as an administrator and open the Package Manager. The default URL is http://<server>:4502/crx/packmgr/index.jsp.

3. Click Upload Package, select the AEM Forms Automated Forms Conversion service package, and click Upload. After the package is uploaded, click package name, and click Install. The package is installed.

#### Download and install Conversion Manager package

Conversion Manager package provides AEM cloud service configurations and Review and Correct editor for the conversion service. It also allows you to connect your AEM instance with conversion service running on Adobe I/O. Perform the following steps to download and install the package:

1. Download the AEM Forms [Automated Forms Conversion service package](https://artifactory.corp.adobe.com/artifactory/maven-aemforms-release-local/com/flamingo/automated-forms-conversion/1.1.8/automated-forms-conversion-1.1.8.zip). 

2. Log in to AEM instance as an administrator and open the Package Manager. The default URL is http://<server>:4502/crx/packmgr/index.jsp.

3. Click Upload Package, select the AEM Forms Automated Forms Conversion service package, and click Upload. After the package is uploaded, click package name, and click Install. The package is installed.

#### Set up flamingo-imsconfig-service

1. Goto Tools > Security > Users
2. Look for `flamingo-imsconfig-service` user
3. Select and click on `Properties`
4. Click on `Keystore` Tab
5. Specify a password
6. Select `Add Private Key from KeyStore file` option
7. Set the following fields:
```
New Alias: mykey
KeyStore File: <upload identity.p12>
KeyStore File Password: password
Private Key Alias: mykey
Private Key Password: password
```
8. Submit
9. Save and Close.

#### Create Adobe I/O integration

1. Navigate to `Tools`>`Security`>`Adobe IMS Configuration`
2. Click `Create`
3. Select `Automated Forms Conversion Service` in Cloud Solution.
4. `mykey` Certificate should be automatically selected.
5. Click `Next`
7. Specify the below:
    * Title: Specify a title.
    * Authorization Server: https://ims-na1.adobelogin.com
    * API Key: `6657623da8f54051be3ae9738e3ae1e5`
    * Client Secret: `7698751c-14b7-463a-88ca-cf5525e5852d`
    * Payload:  
    ```
    {
    "exp": 1561640522,
    "iss": "6D1B46345CD3E5B30A495E27@AdobeOrg",
    "sub": "D7B01B345D12771A0A495EC7@techacct.adobe.com",
    "https://ims-na1.adobelogin.com/s/ent_aemforms_sdk": true,
    "aud": "https://ims-na1.adobelogin.com/c/6657623da8f54051be3ae9738e3ae1e5"
    }

    
#### Configure the cloud service
Create a cloud service configuration to connect your AEM Instance to the conversion service. It also allows you to specify a template, theme, and form fragments for a conversion. You can create multiple cloud service configurations separate for each set of forms. For example, you can have a separate configuration for sales department forms and a separate one for customer support forms. Perform the following steps to create a cloud service configuration:

1. On your AEM Forms instance, tap Adobe Experience Manager > Tools  > Cloud Services > Automate Forms Conversion Configuration.

2. Tap the Global folder and tap Create. The page to create Automated Forms Conversion configuration appears. The configuration is created in the Global folder. You can also create the configuration in a different folder that already exists or create a new folder for your configurations. 

3. In the Basic tab of the Create Automated Forms Conversion Configuration page, specify a value for the following fields:

    * Title:	Specify a unique title for the configuration. The title is displayed in the UI used to start conversion.
    * Name:	Specify a unique name for the configuration. The configuration is saved in the CRX-Repository with the specified name. The name can be identical to the title.  
    * Thumbnail location	Location of the thumbnail for the configuration.  
    * Service URL: Specify the https://aemformsconversion.adobe.io/ URL in the service URL field. 
    * Template: Specify the default template to be applied to converted forms. You can always specify a different template before starting the conversion.
    * Theme:	Specify the default theme to be applied to converted forms. You can always specify a different theme before starting the conversion.
    * Existing Fragments: Specify the location of existing fragments, if any.

    ![Service-Configuration-basic](images/Service-Configuration-basic.png)

4. In the Advanced tab of the Create Automated Forms Conversion Configuration page, specify value for the following field:

    * Generate Document of Record:	Select the option to automatically generate Document of Record for converted forms.
    * Enable Analytics:	Select the option to enable Adobe Analytics on all the converted forms.

    ![Service-Configuration-advanced](images/Service-Configuration-advanced.png)

5. Tap Save & Close. The cloud configuration is created. Your AEM Forms instance is ready to start converting legacy forms to adaptive forms.

****
### Start the conversion process

#### Upload PDF forms to your AEM Forms server

1. Log in to the AEM Forms instance. 
2. Tap Adobe Experience Manager  > Navigation    > Forms > Forms & Documents.

3. ap Create > Folder. Specify Title and Name of the folder. Tap Create. A folder is created.

4. Tap to open the newly created folder.

5. Tap Create > File Upload. Select the [form to upload](./SampleForm.pdf), click Open, and click Upload. The forms are uploaded. 

#### Run the conversion

After you have uploaded the forms and configured the service, perform the following steps to start the conversion:

1. On your AEM Forms instance, tap Adobe Experience Manager  > Navigation    > Forms > Forms & Documents.

2. Select the folder containing PDF forms (forms to be converted) and tap Start Automated Forms Conversion. The Conversion Settings dialog appears

![Start-Conversion-Dialog](images/Start-Conversion-Dialog.png)

3. In the General tab of the Conversion Settings dialog:

Select a Cloud Configuration. Template and Theme options are automatically filled on selecting the configuration. You can specify a different template or a theme, if required.
Select the Extract Fragment option to allow the conversion service to identify, extract, and download form fragments for converted forms.
Specify the location of Existing Fragments, if required. Conversion service uses the Form Fragments available at the specified location in converted forms, wherever applicable.

4. In the Output tab of Conversion Settings dialog, specify the location to save converted forms (adaptive forms), adaptive form schema, form fragments, and form fragments schemas.

5. Tap Start Conversion. The Conversion is started. The Conversion in Progress logo is displayed until the conversion is in progress. The logo is removed after the conversion is complete. You can periodically refresh the folder to check the conversion status. A status email is also sent on the configured email address on completion of conversion. 
On a successful conversion, the converted adaptive form and related schema are downloaded to the folder specified in the Output tab of the conversion dialog. Form fragments and corresponding schema are downloaded only if the Extract Fragment option is selected before starting the conversion.
![conversion-in-progress](images/conversion-in-progress.png)

6. Review and correct the converted forms

***
