import classe from './ImageItem.module.css'
import React, {Component} from 'react';

class ImageItem extends Component {
    renderImg() {
        return this.props.src.map((src, index) => {
            return (<img
                onClick={this.props.onClick}
                className={classe.ImageItem}
                src={src}
                key={index}
            />)
        })
    }

    render() {
        return (
            <div className={classe.ImageTwo}>
                { this.renderImg()}
            </div>
        );
    }
}

export default ImageItem;


