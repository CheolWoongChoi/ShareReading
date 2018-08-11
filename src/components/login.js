import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { withAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {

  //컴포넌트 생성 후, 브라우저와 세션 유무에 따라 사용자에게 정보 전달
  componentDidMount(){

    //인터넷 익스플로러를 사용하는 사용자에게 오류 메시지 전달
    if(navigator.userAgent.toLowerCase().indexOf('trident')>-1){
        window.alert('인터넷 익스플로러에서 작동하지 않습니다. <구글 CHROME>을 사용해주세요!');
    }

    //세션을 통해 로그인 유무 확인
    axios.get('/api/sessionInfo')
        .then( (res) => {
            if(res.data){
                window.alert('로그인 상태이기 때문에, Home 화면으로 이동합니다.')
                this.props.history.push('/home'); 
            }
        });
  } 

  //텍스트 필드 UI 반환
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
  
  //사용자의 로그인 정보를 서버로 전달, 로그인 정보 일치 여부에 따라 다르게 반응
  onSubmit(values){
    axios.post('/api/auth/login', values)
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

  //전체적인 '로그인 화면' UI 렌더링
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

          <div className="text-center">
            <div className="login-register">
              <Link to="/register" className="btn btn-danger btn-lg login-button">회원가입하기</Link>
            </div>
          </div>

        </div>
    )
  }
}

//Redux-Form을 이용한 오류 검사(Validation)
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

//Redux-Form을 적용한 컴포넌트를 내보냄
export default reduxForm({
  validate,
  form: 'login'
})( withAlert(Login) );