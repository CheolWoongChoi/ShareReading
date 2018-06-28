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
          style={{ ...style, display: "block", background: "blue" }}
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
          style={{ ...style, display: "block", background: "blue" }}
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
                  <div key={Info.bookImage} className="home-book-image"> 
                     <img src={require(`../../server/uploads/${nickname}/${Info.bookImage}`)} 
                          alt={Info.bookImage}
                          width="200"
                          height="250"
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
            prevArrow: <PrevArrow />
      };

      return Object.getOwnPropertyNames(allbooks)
            .map( (nickname) => { 
                  return(
                        <div key={nickname}>
                              <h1>{nickname}님의 책 CHOICE</h1>                             
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
               <span>안녕하세요, {this.state.nickname}님!</span>
               <Link to="/mypage" className="home-member-btn btn btn-primary">마이페이지</Link>
               <Link to="/" className="home-member-btn btn btn-danger" onClick={this.clickLogOut}>로그아웃</Link>
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
                  <div className="home-book-text">
                        <label className="">책명</label>
                        <p>{this.state.bookName}</p>
                  </div>
                  <div className="home-book-text">
                        <label className="">저자</label>
                        <p>{this.state.author}</p>
                  </div>
                  <div className="home-book-text">
                        <label className="">발행일</label>
                        <p>{this.state.pubDate}</p>
                  </div>
                  <div className="home-book-text">
                        <label className="">나의 메모</label>
                        <p>{this.state.memo}</p>
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