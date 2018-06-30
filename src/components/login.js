import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { withAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {

  componentDidMount(){
    axios.get('/sessionInfo')
        .then( (res) => {
            if(res.data){
                this.props.history.push('/home'); 
            }
        });
  } 

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
          if(res.data.isLogin)
              this.props.history.push('/home');
        }
        else{
           this.props.alert.show('(아이디) 또는 (비밀번호)를 잘못입력하셨습니다!');
        }
      });
  }

  render(){

    const { handleSubmit } = this.props;

    return(

      <div>
        <div className="text-center">
          <p className="login-title">SHARE READING</p>
          <p className="login-subtitle">추천하고 싶은 책을 공유하는 프로젝트</p>
          <img src={ require("../images/login_welcome.jpg") } width="300px" alt="welcome"/>
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
            <button className="btn btn-primary btn-lg login-button" type="submit">로그인하기</button>
          </form>
        </div>
        
        {/* <div className="text-center">
          <button className="btn btn-success btn-lg login-sso-button">Naver</button>
          <button className="btn btn-warning btn-lg login-sso-button">Kakao</button>
          <button className="btn btn-danger btn-lg login-sso-button">Google</button>
        </div> */}

        <div className="text-center">
          <div className="login-register">
            <Link to="/register" className="btn btn-danger btn-lg login-button">회원가입하기</Link>
          </div>
        </div>

      </div>
    )
  }
}

function validate(values){

  const errors = {};

  if(!values.id){
    errors.id = "아이디를 입력해주세요!";
  }

  if(values.id && values.id.length < 8){
    errors.id = "8자리 이상 입력해주세요!";
  }

  if(!values.password){
    errors.password = "비밀번호를 입력해주세요!";
  }

  if(values.password && values.password.length < 8){
    errors.password = "8자리 이상 입력해주세요!";
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'login'
})( withAlert(Login) );