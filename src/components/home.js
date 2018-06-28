import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { getNickname } from '../actions';
// import { getImages } from '../actions';
import { fetchAllBooks } from '../actions';
import axios from 'axios';

class Home extends Component {

   constructor(props){
      super(props);
      this.state = {
         nickname: ''
      };
   }

   componentDidMount(){
      if(!this.state.nickname){
         axios.get('/sessionInfo')
            .then( (res) => {
               this.setState({nickname: res.data.nickname});
            });
      }
      if(!this.props.allbooks.length)
        this.props.fetchAllBooks();
   }

   clickLogOut(){
      axios.get('/auth/logout');
   }

   renderImage(userBookInfo, nickname){
         
      if(userBookInfo){
            return userBookInfo.map( (Info) => {
                  return ( 
                  <img src={require(`../../server/uploads/${nickname}/${Info.bookImage}`)} 
                        key={Info.bookImage}
                        alt={Info.bookImage}
                        width="200"
                        height="200"
                  />
                  )
            })
      }
   }

   renderUserBook(){
      const {allbooks} = this.props;
      
      return Object.getOwnPropertyNames(allbooks)
            .map( (nickname) => { 
                  return(
                        <div key={nickname}>
                              <h1>{nickname}님의 책 CHOICE</h1>                             
                              {this.renderImage(allbooks[nickname], nickname)}
                        </div>
                  );
            });
   }

   render(){
      return(
         <div>
            {/* 맨 윗줄 - 회원관리정보 */}
            <div className="home-member text-right">
               <span>안녕하세요, {this.state.nickname}님!</span>
               <Link to="/mypage" className="home-member-btn btn btn-primary">마이페이지</Link>
               <Link to="/" className="home-member-btn btn btn-danger" onClick={this.clickLogOut}>로그아웃</Link>
            </div>

            {/* 회원들의 책 이미지정보 */}
            <div>
                  {this.renderUserBook()}
            </div>
         </div>
      );
   }
}

function mapStateToProps(state) {
      return { 
            nicknames: state.nicknames,
            images: state.images,
            allbooks: state.allbooks 
      }
}

export default connect(mapStateToProps, { fetchAllBooks })(Home);