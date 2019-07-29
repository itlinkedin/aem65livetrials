import React from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { Page, withModel, EditorContext, Utils } from '@adobe/cq-react-editable-components';
 
class App extends Page {
 
    render() {
        return (
            <div className="App">
                
                <Header navRoot="/content/we-spa/react/home"/>
                
                <EditorContext.Provider value={ Utils.isInEditor() }>
                    { this.childComponents }
                    { this.childPages }
                </EditorContext.Provider>

                <Footer/>
            </div>
        );
    }
}
 
export default withModel(App);
