import React, {Component} from 'react';
import {MapTo} from '@adobe/cq-react-editable-components';
import {Link} from "react-router-dom";
import { NavLink } from "react-router-dom";
import {BrowserRouter} from 'react-router-dom';
import {Route} from 'react-router-dom';

import "./List.css";
 
const ListEditConfig = {
 
    emptyLabel: 'List - We.SPA',
 
    isEmpty: function(props) {
        return !props || !props.items || props.items.length < 1;
    }
};

class ListItem extends Component {
 
    render() {
        if(!this.props.path || !this.props.title || !this.props.url) {
            return null;
        }
        return (
            <li className="ListItem" key={this.props.path}>
                <Link className="ListItem-link" to={this.props.url}>
                        {this.props.title}
                </Link>
            </li>
        );
    }
}

export default class List extends Component {
    render() {
        return (
                <div className="List">
                    <ul className="List-wrapper">
                        { this.props.items && this.props.items.map((listItem, index) => {
                            return <ListItem path={listItem.path} url={listItem.url} 
                                             title={listItem.title} />
                            })
                       }
                    </ul>
                </div>
        );
    }
}
MapTo("we-spa/components/content/list")(List, ListEditConfig);