import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { withAlert } from 'react-alert';  
import axios from 'axios';

class Register extends Component {

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
  
  onSubmit(values){
      axios.post('/auth/register', values)
         .then( (res) => {

            console.log(res.data);

            if(res.data ==='DUPL-ID'){
                this.props.alert.show('DUPLICATE ID!');
            } 
            else if(res.data === 'DUPL-NICK'){
                this.props.alert.show('DUPLICATE NICKNAME!');
            } 
            else{
                this.props.history.push('/');
            }

         });
  }

  render(){

   const { handleSubmit } = this.props;

    return( 
      <div>

        <div className="register-title text-center">
          <h1>Register</h1>
        </div>

        <div className="text-center">
          <form className="form-inline" onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
            <Field
              label="Id"
              name="id"
              type="text"
              component={this.renderField}
            />
            <Field
              label="NickName"
              name="nickname"
              type="text"
              component={this.renderField}
            />
            <Field
              label="Password"
              name="password"
              type="password"
              component={this.renderField}
            />
            <Field
              label="RePassword"
              name="repassword"
              type="password"
              component={this.renderField}
            />

            <div>
               <button 
                  className="btn btn-primary btn-lg register-submit" 
                  type="submit"
               >
               회원가입
               </button>
            </div>
            <div>
               <Link to="/" className="btn btn-danger btn-lg register-button">홈으로 돌아가기</Link>
            </div>
          </form>
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

   if(!values.nickname){
     errors.nickname = "Enter Nickname!";
   }

   if(!values.password){
     errors.password = "Enter Password";
   } 

   if(values.password && values.password.length < 8){
      errors.password = "Please Input More than 8 digits";
   }

   if(values.password !== values.repassword){
      errors.repassword = "Please confirm passwords";
   }
   
   return errors;
 }

export default reduxForm({
  validate,
  form: 'register'
})( withAlert(Register) );