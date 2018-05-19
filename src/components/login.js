import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import connect from 'react-redux';
import axios from 'axios';

class Login extends Component {

  componentDidMount(){
      axios.get('/api')
        .then( (res) => {
            this.setState({data : res.data});
            console.log(this.state.data);
        });
  }

  idField(field){

    return(
      <div>
        <input 
          className="form-control input-lg login-input" 
          type="text" 
          placeholder="ID"
          {...field.input}
        />
      </div>
    )
  }

  passwordField(field){

    return(
      <div>
        <input 
          className="form-control input-lg login-input" 
          type="password" 
          placeholder="Password"
          {...field.input}
        />
      </div>
    )
  }
  
  onSubmit(values){
    console.log(values);
  }

  render(){

    const { handleSubmit } = this.props;

    return(
      <div>
        <div className="text-center">
          <h1>Share Reading</h1>
          <br/>
          {<img src={require("../images/login_welcome.jpg")} width="300px" alt="welcome"/>}
        </div>

        <div className="form-group text-center">
          <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
            <Field
              label="ID"
              name="id"
              component={this.idField}
            />
            <Field
              label="PASSWORD"
              name="password"
              component={this.passwordField}
            />
            <button className="btn btn-primary btn-lg login-button" type="submit">로그인</button>
          </form>
        </div>
        
        <div className="text-center">
          <button className="btn btn-success btn-lg login-sso-button">Naver</button>
          <button className="btn btn-warning btn-lg login-sso-button">Kakao</button>
          <button className="btn btn-danger btn-lg login-sso-button">Google</button>
        </div>

        <div className="text-center">
          <div className="login-register">
            <a href="/register">Register</a>
          </div>
        </div>

      </div>
    )
  }
}

export default reduxForm({
  form: 'login'
})(Login);