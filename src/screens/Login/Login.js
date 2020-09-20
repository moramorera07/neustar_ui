import React, { Component } from "react";
import { Container, Form, Button } from "semantic-ui-react";
import './Login.css'
import PostData from '../../services/PostData'
import { Redirect } from 'react-router-dom'

class Login extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            username : "",
            password : "",
            redirect: false
        } 
        this.login = this.login.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
    }

    async login(){
        const { username, password } = this.state;

        await PostData.login({ username: username, password: password }).then((result) => {
            if(result.data.status !== "error"){
                sessionStorage.setItem('user_credentials', JSON.stringify(result.data.output));
                this.setState({redirect: true});
            }else{
                alert("Invalid credentials")
            }
        }).catch(function (error) {
            console.log(error);
        })
        
    }

    onChangeUsername(e) {
        this.setState({[e.target.name] : e.target.value})
    }

    render(){
        if(this.state.redirect){
            return (<Redirect to={'/domains/add'}/>)
        }

        if(sessionStorage.getItem("user_credentials")){
            return (<Redirect to={'/domains/add'}/>)
        }

        return (
            <Container className="main_container">
                <Form className="form_container">
                    <Form.Field className="form_field_custom">
                        <label className="label_form">Username</label>
                        <input type="text" name="username" placeholder='Username' onChange={this.onChangeUsername}/>
                    </Form.Field>
                    <Form.Field className="form_field_custom">
                        <label className="label_form">Password</label>
                        <input type="password" name="password" placeholder='Password' onChange={this.onChangeUsername}/>
                    </Form.Field>
                    <Button className="login_button" type='submit' onClick={this.login}>Login</Button>
                </Form>
            </Container>
        )
    }
}

export default Login;