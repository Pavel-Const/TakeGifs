import React, {Component} from 'react';
import axios from "axios";
import Form from "../Form/Form";
import classes from './MainBoard.module.css'
import ImageItem from "../imageItem/ImageItem";
import ImageGroup from "../imageGropup/ImageGroup";

class MainBoard extends Component {

    state = {
        images: [],
        imagesGroup: [],
        loading: false,
        group: false,
        data: true,
        httpError: false,
        inputValueClick: '',
        clickImage: false,
    };

    onClickImage = (teg) => {
        this.setState({
            inputValueClick: teg,
            clickImage: true
        })
    }


    loadImages = (teg) => {

        let response = ''
        let arrayUrl = []
        this.setState({
            loading: true
        })
        let tegs = teg.split(',')
        let images = []

        if (teg === 'delay') {
            //let images = this.state.images
            try {

                let timer = setInterval(async () => {
                    response = await axios.get(`https://api.giphy.com/v1/gifs/random?api_key=gTJAO48YcpmrADUyo4opy4ES4g7iDBxx`)
                    images = [...this.state.images, {
                        url: [response.data.data.image_url],
                        teg: teg
                    }]
                    await this.setState({
                        images,
                        data: true
                    })
                }, 500)

                setTimeout(() => {
                    clearInterval(timer);
                    this.setState({
                        loading: false
                    })
                }, 5000);

            } catch (e) {
                console.log(e)
                this.setState({
                    httpError: true,
                    loading: false
                })
            }
        } else {
            try {
                tegs.map(async (teg) => {
                    response = await axios.get(`https://api.giphy.com/v1/gifs/random?api_key=gTJAO48YcpmrADUyo4opy4ES4g7iDBxx&tag=${teg}`)
                    arrayUrl.push(response.data.data.image_url)
                    if (arrayUrl[0] === undefined) {
                        images=[]
                        this.setState({
                            data: false,
                            loading: false,
                            images
                        })} else {
                        this.setState({
                            loading: false
                        })
                    }
                })
                if(this.state.data) {
                    images = [...this.state.images, {
                        url: arrayUrl,
                        teg: tegs
                    }]
                    this.setState({
                        images,
                        data: true
                    })
                } else return null
            } catch (e) {
                console.log(e)
                this.setState({
                    httpError: true,
                    loading: false
                })
            }
        }
        // if (arrayUrl[0]=== undefined) {
        //     this.setState({
        //         data: false,
        //         loading: false
        //     })
        // }
        // else
        // if (this.state.group === false) {
        //     const images = this.state.images
        //     images.push(
        //         {
        //             url: arrayUrl,
        //             teg: teg
        //         })
        //     this.setState({
        //             images,
        //             data: true,
        //             loading: false
        //         }
        //     )
        // }
    }

    groupImage = () => {
        if (this.state.group === false) {
            let result = this.state.images.reduce(function (r, a) {
                r[a.teg] = r[a.teg] || [];
                r[a.teg].push(a);
                return r;
            }, Object.create(null));
            this.setState({
                    group: true,
                    imagesGroup: result
                }
            )
        } else {
            this.setState({
                    group: false
                }
            )
        }
    }

    clearBoard = () => {
        this.setState({
            images: [],
            imagesGroup: [],
            loading: false,
            group: false
        })
    }
    renderImages = () => {
        if (this.state.group === false) {
            return (<div className={classes.ImageList}>
                {
                    this.state.images.map((img, index) => {
                            return (
                                <ImageItem
                                    data={this.state.data}
                                    key={index}
                                    src={img.url}
                                    teg={img.teg}
                                    onClick={() => this.onClickImage(img.teg)}
                                />)
                        }
                    )
                }
            </div>)
        }
        if (this.state.group === true) {
            return Object.keys(this.state.imagesGroup).map((teg, index) => {
                const tegs = []
                tegs.push(teg)
                const urls = this.state.imagesGroup[teg]
                return (
                    <ImageGroup
                        key={index}
                        src={urls}
                        teg={tegs}
                    />)
            })
        }
    }

    render() {
        return (
            <div>
                <Form
                    state={this.state}
                    loadImages={this.loadImages}
                    clearBoard={this.clearBoard}
                    groupImages={this.groupImage}
                />
                {this.renderImages()}
            </div>
        );
    }
}

export default MainBoard;
