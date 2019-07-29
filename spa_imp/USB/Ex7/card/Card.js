import React, { Component } from 'react';
import { MapTo } from '@adobe/cq-react-editable-components';
import './Card.css';

const CardEditConfig = {

    emptyLabel: 'Card - We.SPA',

    isEmpty: function (props) {
        return !props || !props.src || props.src.trim().length < 1;
    }
};

class Card extends Component {

    get content() {
        if (this.props.src && this.props.src.length > 0) {
            return (
                <div class="card">
                    <img class="card__img" src={this.props.src} alt={this.props.alt}></img>

                    <div class="card__info">
                        <div class="card__title">{this.props.title}</div>
                        <div class="cta-box">
                            <a class="card__cta" href={this.props.link}>More Info</a>
                        </div>
                    </div>

                </div>);
        }

    }

    render() {
        return <div>{this.content}</div>;
    }
}

MapTo('we-spa/components/content/card')(Card, CardEditConfig);