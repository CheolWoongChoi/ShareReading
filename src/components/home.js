import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAllBooks } from '../actions';
import axios from 'axios';
import Slider from 'react-slick';
import Modal from './modal';

/* React-Slick 이전, 다음 버튼 */
function NextArrow(props) {
      const { className, style, onClick } = props;
      return (
        <div
          className={className}
          style={{ ...style, display: "block"}}
          onClick={onClick}
        >
        </div>
      );
    }
    
function PrevArrow(props) {
      const { className, style, onClick } = props;
      return (
        <div
          className={className}
          style={{ ...style, display: "block"}}
          onClick={onClick}
        >
        </div>
      );
    }

class Home extends Component {

   constructor(props){
      super(props);
      this.state = {
         nickname: '',
         isClickImage: false,

         bookName: '',
         author: '',
         pubDate: '',
         memo: ''
      };

      this.clickImage = this.clickImage.bind(this);
      this.clickLogOut = this.clickLogOut.bind(this);
   }

   componentWillMount(){
      axios.get('/sessionInfo')
         .then( (res) => {
            if(res.data)
            this.setState({nickname: res.data.nickname});
            else{
                  window.alert('로그인이 필요합니다!');
                  this.props.history.push('/');
            }
      });
   }

   componentDidMount(){
      if(!this.props.allbooks.length)
        this.props.fetchAllBooks();
   }

   clickLogOut(){
      axios.get('/auth/logout')
            .then( (res) => {
               this.props.history.push('/');
            });
   }

   clickImage(bookInfo){
      this.setState({
            isClickImage: !this.state.isClickImage,
            no: bookInfo.no,
            bookName: bookInfo.bookName,
            author: bookInfo.author,
            pubDate: bookInfo.pubDate,
            memo: bookInfo.memo
      });
   }

   renderImage(userBookInfo, nickname){
         
      if(userBookInfo){
            return userBookInfo.map( (Info) => {
                  return (
                  <div key={Info.bookImage} className="home-book-image-frame"> 
                     <img src={require(`../../server/uploads/${nickname}/${Info.bookImage}`)} 
                          className="home-book-image"
                          alt={Info.bookImage}
                          onClick={() => {this.clickImage(Info)}}
                     />
                  </div>
                  )
            })
      }
   }

   renderUserBook(){
      const {allbooks} = this.props;
      
      const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
            responsive: [
                  {
                        breakpoint: 1000,
                        settings: {
                              slidesToShow: 3,
                              slidesToScroll: 1
                        }
                  },
                  {
                        breakpoint: 800,
                        settings: {
                              slidesToShow: 2,
                              slidesToScroll: 1
                        }
                  },
                  {
                        breakpoint: 550,
                        settings: {
                              slidesToShow: 1,
                              slidesToScroll: 1
                        }
                  }
            ]
      };

      return Object.getOwnPropertyNames(allbooks)
            .map( (nickname) => { 
                  return(
                        <div key={nickname}>
                              <h2 className="home-book-nickname-frame">
                                    <span className="home-book-nickname">'{nickname}'</span>
                                    <span className="home-book-nickname-post"> 님의 책</span>
                              </h2>                             
                              <Slider {...settings}>
                                    {this.renderImage(allbooks[nickname], nickname)}
                              </Slider>
                        </div>
                  );
            });
   }

   render(){
      return(
         <div>
            {/* 맨 윗줄 - 회원관리정보 */}
            <div className="home-member text-right">
               <span>안녕하세요, <span className="home-nickname">{this.state.nickname}</span>님!</span>
               <Link 
                  to={{
                       pathname: "/mypage",
                       state: {nickname: this.state.nickname}
                  }} 
                  className="home-member-btn btn btn-primary"
               >
                  내 책 수정하기
               </Link>
               <button
                  className="home-member-btn btn btn-danger" 
                  onClick={this.clickLogOut}
               >
                  로그아웃
               </button>
            </div>

            {/* 회원들의 책 이미지정보 */}
            <div className="home-book-list">
                  {this.renderUserBook()}
            </div>
            <div>
                  <Modal show={this.state.isClickImage}
                              onClose={ () => { 
                                    this.setState({isClickImage: !this.state.isClickImage}) 
                              }}
                  >
                  {/* Modal 내용 - 회원이 작성한 책정보*/}
                  <div>
                        <label className="home-book-text-title">책 이름</label>
                        <p className="home-book-text-content">{this.state.bookName}</p>
                  </div>
                  <div>
                        <label className="home-book-text-title">저자</label>
                        <p className="home-book-text-content">{this.state.author}</p>
                  </div>
                  <div>
                        <label className="home-book-text-title">발행일</label>
                        <p className="home-book-text-content">{this.state.pubDate}</p>
                  </div>
                  <div>
                        <label className="home-book-text-title">메모</label>
                        <p className="home-book-text-content">{this.state.memo}</p>
                  </div>
                  </Modal>
            </div>
         </div>
      );
   }
}

function mapStateToProps(state) {
      return { 
            allbooks: state.allbooks 
      }
}

export default connect(mapStateToProps, { fetchAllBooks })(Home);