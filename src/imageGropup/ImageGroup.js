import React from 'react';
import ImageItem from "../imageItem/ImageItem";
import classes from './ImageGroup.module.css'

function ImageGroup(props) {
    return props.teg.map((item, index) => {
        return (
            <div className={classes.ImageGroup} key={'image' + index}>
                <h1>{item}</h1>
                <div className={classes.ImageGrid}>
                    {props.src.map((item) => {
                        return (
                            <ImageItem
                                key={'index'+ item.url}
                                src={item.url}
                            />
                        )
                    })}
                </div>
            </div>
        );
    })

}

export default ImageGroup;