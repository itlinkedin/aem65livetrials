import React, {Component} from 'react';
import {MapTo} from '@adobe/cq-react-editable-components';
import './Hero.css';
 
const HeroEditConfig = {
 
    emptyLabel: 'Hero - We.SPA',
 
    isEmpty: function(props) {
        return !props || !props.src || props.src.trim().length < 1;
    }
};
 
class Hero extends Component {
 
    get content() {
         if(this.props.src && this.props.src.length > 0) {
            return (
                     <div>
                       <img src={this.props.src} alt={this.props.alt} />
                        <div class="hero-text">{this.props.title}</div>
                    </div>);
        }
        
    }
 
    render() {
             return <div class="hero">{this.content}</div>;
            }
        }
 
MapTo('we-spa/components/content/hero')(Hero, HeroEditConfig);