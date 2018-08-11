import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { withAlert } from 'react-alert';  
import axios from 'axios';

class Register extends Component {

  //텍스트 필드 UI
  renderField(field){
      const { meta : {touched, error} } = field;
      const hasError = `${touched && error ? 'has-error' : ''}` 

      return(
         <div>
            <div className={`form-group text-left ${hasError}`}>
               <label className="register-label">{field.label}</label>
               <input 
                  className="form-control input-lg register-field" 
                  type={field.type}
                  {...field.input}
               />
            </div>

            <div className="register-error">
               {touched ? error : ''}
            </div>
         </div>
      )
  }
  
  //회원가입에 필요한 Form 정보를 서버로 전송, 서버에서 중복 여부 검사
  onSubmit(values){
      axios.post('/api/auth/register', values)
         .then( (res) => {
            if(res.data ==='DUPL-ID'){
                this.props.alert.show('중복된 ID입니다!');
            } 
            else if(res.data === 'DUPL-NICK'){
                this.props.alert.show('중복된 닉네임입니다!');
            } 
            else{
                window.alert('회원가입 되었습니다.');
                this.props.history.push('/');
            }
         });
  }


  //전체적인 '회원 가입' UI 렌더링
  render(){
    const { handleSubmit } = this.props;

    return( 
      <div>

        <div className="register-title text-center">
          <p>회원가입</p>
        </div>

        <div className="text-center">
          <form className="form-inline" onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
            <Field
              label="아이디"
              name="id"
              type="text"
              component={this.renderField}
            />
            <Field
              label="닉네임"
              name="nickname"
              type="text"
              component={this.renderField}
            />
            <Field
              label="비밀번호"
              name="password"
              type="password"
              component={this.renderField}
            />
            <Field
              label="비밀번호 확인"
              name="repassword"
              type="password"
              component={this.renderField}
            />

            <div>
               <button 
                  className="btn btn-primary btn-lg register-submit" 
                  type="submit"
               >
               등록하기
               </button>
            </div>
            <div>
               <Link to="/" className="btn btn-danger btn-lg register-button">로그인화면으로 돌아가기</Link>
            </div>
          </form>
        </div>
        
      </div>
    )
  }
}

//회원 가입 입력 정보 검사(validation)
function validate(values){
  
   const errors = {};
 
   if(!values.id){
     errors.id = "아이디를 입력해주세요!";
   }

   if(values.id && values.id.length < 8){
      errors.id = "8자리 이상이어야 합니다!";
   }

   if(!values.nickname){
     errors.nickname = "닉네임을 입력해주세요!";
   }

   if(!values.password){
     errors.password = "비밀번호를 입력해주세요!";
   } 

   if(values.password && values.password.length < 8){
      errors.password = "비밀번호는 8자리 이상이어야 합니다!";
   }

   if(values.password !== values.repassword){
      errors.repassword = "입력하신 비밀번호와 일치되어야 합니다!";
   }
   
   return errors;
 }

 //Redux-Form을 연결한 Register 컴포넌트를 내보냄
export default reduxForm({
  validate,
  form: 'register'
})( withAlert(Register) );