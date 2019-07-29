import React, {Component} from 'react';
import './Header.css'; 
import {MapTo} from '@adobe/cq-react-editable-components';
import {Link} from "react-router-dom";
import { withRouter } from 'react-router';

const HeaderEditConfig = {
 
    emptyLabel: 'Header - We.SPA',
 
    isEmpty: function(props) {
        return !props || !props.text || props.text.trim().length < 1;
    }
};

export default class Header extends Component {
 
  render() {
      return (
      	<header className="Header">
          <Link className="Header-link" to={this.props.navRoot + ".html"}>
                <h1 className="Header-title"> We.SPA <span class="Header-logo">♤</span></h1>
               </Link>
        </header>
         );
     }
  }

MapTo('we-spa/components/content/header')(Header, HeaderEditConfig);


