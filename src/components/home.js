import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Home extends Component {

   constructor(props){
      super(props);
      this.state = {
         id: '',
         nickname: ''
      };
   }

   componentDidMount(){

      if(!this.state.id){
         axios.get('/sessionInfo')
            .then( (res) => {
               //console.log(res.data);
               this.setState({id: res.data.authId});
               this.setState({nickname: res.data.nickname});
            });
      }
   }

   clickLogOut(){
      axios.get('/auth/logout');
   }

   render(){
      return(
         <div>
            <div>
               <h1>Hello, {this.state.nickname}님! ({this.state.id})</h1>
            </div>
            <div>
               <Link to="/" className="btn btn-primary btn-lg" onClick={this.clickLogOut}>LogOut</Link>
            </div>
         </div>
      );
   }
}

export default Home;