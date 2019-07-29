import React, {Component} from 'react';
import {MapTo} from '@adobe/cq-react-editable-components';
import "./Text.css";

const TextEditConfig = {
 
    emptyLabel: 'Text - We.SPA',
 
    isEmpty: function(props) {
        return !props || !props.text || props.text.trim().length < 1;
    }
};
 

class Text extends Component {
 
    get richTextContent() {
        return <div className="textbox" dangerouslySetInnerHTML={{__html:  this.props.text}}/>;
    }
 
    get textContent() {
        return <div className="textbox">{this.props.text}</div>;
    }
 
    render() {
        return this.props.richText ? this.richTextContent : this.textContent;
    }
}
 
MapTo('we-spa/components/content/text')(Text, TextEditConfig);
