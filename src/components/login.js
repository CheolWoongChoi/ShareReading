import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { withAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {

  renderField(field){

    const { meta : {touched, error} } = field;
    const hasError = `${touched && error ? 'has-error' : ''}`
    
    return(
      <div className={hasError}>
        <input 
          className={`form-control input-lg login-input ${hasError}`} 
          type={field.type} 
          placeholder={field.label}
          {...field.input}
        />

        <div className="login-error">
          {touched ? error : ''}
        </div>
      </div>
    )
  }
  
  onSubmit(values){
    axios.post('/auth/login', values)
      .then( (res) => {
        if(res.data){
          //console.log(res.data);
          this.props.history.push('/home');
        }
        else{
           this.props.alert.show('WRONG ID or WRONG PASSWORD');
        }
      });
  }

  render(){

    const { handleSubmit } = this.props;

    return(

      <div>
        <div className="text-center">
          <h1>Share Reading</h1>
          <br/>
          <img src={require("../images/login_welcome.jpg")} width="300px" alt="welcome"/>
        </div>

        <div className="form-group text-center">
          <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
            <Field
              label="ID"
              name="id"
              type="text"
              component={this.renderField}
            />
            <Field
              label="PASSWORD"
              name="password"
              type="password"
              component={this.renderField}
            />
            <button className="btn btn-primary btn-lg login-button" type="submit">로그인</button>
          </form>
        </div>
        
        {/* <div className="text-center">
          <button className="btn btn-success btn-lg login-sso-button">Naver</button>
          <button className="btn btn-warning btn-lg login-sso-button">Kakao</button>
          <button className="btn btn-danger btn-lg login-sso-button">Google</button>
        </div> */}

        <div className="text-center">
          <div className="login-register">
            <Link to="/register" className="btn btn-danger btn-lg login-button">회원가입</Link>
          </div>
        </div>

      </div>
    )
  }
}

function validate(values){

  const errors = {};

  if(!values.id){
    errors.id = "Enter ID!";
  }

  if(values.id && values.id.length < 8){
    errors.id = "Please Input More than 8 digits";
  }

  if(!values.password){
    errors.password = "Enter Password!";
  }

  if(values.password && values.password.length < 8){
    errors.password = "Please Input More than 8 digits";
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'login'
})( withAlert(Login) );