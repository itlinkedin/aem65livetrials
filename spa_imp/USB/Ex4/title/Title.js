import React, {Component} from 'react';
import {MapTo} from '@adobe/cq-react-editable-components';
import "./Title.css";

const TitleEditConfig = {
 
    emptyLabel: 'Title - We.SPA',
 
    isEmpty: function(props) {
        return !props || !props.text || props.text.trim().length < 1;
    }
};
 

class Title extends Component {
 
 
    render() {

        return (this.props.type ? <this.props.type className="title">{this.props.text}</this.props.type> : <h1 className="title">{this.props.text}</h1>);
    }
}
 
MapTo('we-spa/components/content/title')(Title, TitleEditConfig);
