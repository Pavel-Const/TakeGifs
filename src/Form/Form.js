import React, {Component} from 'react';
import classes from './Form.module.css'
import Button from "../button/Button";
import Input from "../input/Input";

function validateInput(input) {
    const re = /^[a-zA-Z\,^ ]+$/;
    return re.test(String(input));
}

class Form extends Component {
    constructor(props) {
        super(props);
        this.inputRef = null;
    }

    state = {
        isFormValid: true,
        input: {
            value: '',
            type: 'text',
            errorMessageTeg: 'заполните поле "тег" используя только латинские буквы',
            errorMessageData: 'ничего не найдено',
            errorMessageHttp: 'произошла http ошибка'

        }
    }


    clickImage = () => {
        if(this.props.state.inputValueClick !== ''){

            this.inputRef.value = this.props.state.inputValueClick
            console.log(this.state.input.value)
            // const input = this.state.input
            // input.value = this.props.state.inputValueClick
            // this.setState({
            //     input
            // })
            this.props.state.inputValueClick = ''
        }
    }


    submitHandler = event => {
        event.preventDefault()
    }

    onChangeHandler = (event) => {
        const input = this.state.input  //созд. копию state
        input.value = event.target.value  //меняем значение инпута
        this.setState({
            input //заменяем state
        })
        this.validateControl()
    }

    validateControl = () => {

        if (this.state.input.value.trim() === '') //проверка не пустая ли строка
        {
            this.setState({isFormValid: false})
        }
        if (validateInput(this.state.input.value.trim())) {
            this.setState({isFormValid: true})
        } else {this.setState({isFormValid: false})}
        if(!this.props.state.data){this.props.state.data = true}
    }

    clickLoad = () => {
        this.validateControl()
        let condition = () => {
            if (this.state.isFormValid === true) {
                this.props.loadImages(this.state.input.value)
            }
        }
        setTimeout(condition, 0)
    }

    clickClear = () => {
        this.props.clearBoard()
        const input = this.state.input
        input.value = ''
        this.setState({
                input
            }
        )
        this.inputRef.value = ''
    }

    render() {
        this.clickImage()
        return (
            <div>
                <form className={classes.Form} onSubmit={this.submitHandler}>
                    <Input
                        reference={ref => this.inputRef = ref}
                        onChange={event => this.onChangeHandler(event)}
                        isFormValid={this.state.isFormValid}
                        errorMessageTeg={this.state.input.errorMessageTeg}
                        errorMessageData={this.state.input.errorMessageData}
                        errorMessageHttp={this.state.input.errorMessageHttp}
                        state={this.props.state}
                    />
                    {!this.props.state.loading
                        ? <Button
                            onClick={this.clickLoad}
                            type={'load'}
                        >Загрузить</Button>
                        : <Button
                            onClick={this.clickLoad}
                            type={'load'}
                            disabled={true}
                        >Загрузка...</Button>}


                    <Button
                        onClick={this.clickClear}
                        type={'clear'}
                    >Очистить</Button>
                    {!this.props.state.group
                        ? <Button
                            onClick={this.props.groupImages}
                            type={'group'}
                        >Группировать</Button>
                        : <Button
                            onClick={this.props.groupImages}
                            type={'group'}
                        >Разгрупировать</Button>}

                </form>
            </div>
        );
    }
}

export default Form;
