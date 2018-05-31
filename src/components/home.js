import React, { Component } from 'react';

class Home extends Component {

   constructor(props){
      super(props);
      this.state = {
         id: '',
         nickname: ''
      };
   }

   render(){
      return(
         <div>
            Hello, {this.state.nickname}! ({this.state.id})
         </div>
      );
   }
}

export default Home;