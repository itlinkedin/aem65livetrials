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