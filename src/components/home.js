import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getNickname } from '../actions';

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
               this.setState({id: res.data.authId});
               this.setState({nickname: res.data.nickname});
            });
      }

      this.props.getNickname();
   }

   clickLogOut(){
      axios.get('/auth/logout');
   }

   renderUserBook(nicknames){
      return (
            <div>
                  {
                     nicknames.map( (nick) => {
                        return (
                              <div key={nick.nickname}>
                                    <h2>({nick.nickname}님)</h2>
                                    <h4>[{nick.nickname}님의 책's]</h4>
                              </div>
                        )
                     })
                  } 
            </div>
       
      );
   }


   render(){
      return(
         <div>
            {/* 맨 윗줄 - 회원관리정보 */}
            <div className="home-member text-right">
               <span>안녕하세요, {this.state.nickname}님! ({this.state.id})</span>
               <Link to="/mypage" className="home-member-btn btn btn-primary">마이페이지</Link>
               <Link to="/" className="home-member-btn btn btn-danger" onClick={this.clickLogOut}>로그아웃</Link>
            </div>

            {/* 회원들의 책 이미지정보 */}
            <div>
                  {this.renderUserBook(this.props.nicknames)}
            </div>
         </div>
      );
   }
}

function mapStateToProps(state) {
      return { nicknames: state.nicknames }
}

export default connect(mapStateToProps, { getNickname })(Home);