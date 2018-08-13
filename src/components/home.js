import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAllBooks } from '../actions';
import axios from 'axios';
import Slider from 'react-slick';
import Modal from './modal';


//Slick 화면에 렌더링 되는 '이전', '다음' 버튼 UI - PrevArrow, NextArrow
function PrevArrow(props){
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

function NextArrow(props){
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
    

class Home extends Component{

   constructor(props){
      super(props);
      this.state = {
         nickname: '',              //사용자의 Nickname
         isClickImage: false,       //책 이미지 클릭 확인 - 클릭 시 모달(Modal)을 화면에 띄움
         
         //모달(Modal)에 보여줄 책 정보들
         bookName: '',                   
         author: '',
         pubDate: '',
         memo: ''
      };

      this.clickImage = this.clickImage.bind(this);
      this.clickLogOut = this.clickLogOut.bind(this);
   }

   //컴포넌트 생성 후, 세션 유무 확인 / Redux Action을 통해 서버로부터 책 정보 요청
   componentDidMount(){

      //세션 정보를 확인하여 로그인 유무 확인
      axios.get('/api/sessionInfo')
         .then( (res) => {
            if(res.data){
               this.setState({nickname: res.data.nickname});
            }
            else{
               window.alert('로그인이 필요합니다!');
               this.props.history.push('/');
            }
      });

      //Redux Action - 모든 사용자의 책 정보를 가져오기
      if(!this.props.allbooks.length)
         this.props.fetchAllBooks();
   }

   //로그아웃 처리 - 서버에서는 세션 제거, 사용자 화면에서는 로그인 화면으로 이동
   clickLogOut(){
      axios.get('/api/auth/logout')
            .then( (res) => {
               this.props.history.push('/');
            });
   }

   //책 이미지를 클릭했을 때 모달(Modal)이 나타남, state값에 책 정보를 저장하고 모달(Modal)에 state값을 적용하여 화면에 출력 
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

   //한 사용자(닉네임)의 책 이미지를 화면에 렌더링
   //userBookInfo: 한 사용자의 모든 책 정보, nickname: 사용자의 닉네임
   //userBookInfo 정보: no(숫자), 닉네임, 책 이름, 책 이미지이름, 저자명, 발행일, 메모
   renderImage(userBookInfo, nickname){

      if(userBookInfo){

            //Info: 여러 책 정보들 중, 하나의 책 정보를 갖는 객체
            return userBookInfo.map( (Info) => {
                  return (
                        <div key={Info.bookImage} className="home-book-image-frame"> 
                        <img src={`/uploads/${nickname}/${Info.bookImage}`}
                              className="home-book-image"
                              alt={Info.bookImage}

                              //이미지 클릭 시 모달 등장
                              onClick={() => {this.clickImage(Info)}}
                        />
                        </div>
                  )
            })
      }
   }

   //모든 사용자의 책 정보를 바탕으로, Slick 내부에 책 이미지 정보를 출력
   renderUserBook(){
      const {allbooks} = this.props;
      
      //React-Slick API, responsive 속성은 반응형 웹을 위해 사용
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

      /*
      Reducer로부터 받은 allbooks(모든 책 정보)의 데이터를 변환하여 적재적소의 UI에 출력
      
        allbooks의 데이터 형태,
        allbooks = {
                        'nickname A': [ {no:'', nickname:'', bookName:'', bookImage:'', author:'', memo:''},
                                        {...},
                                        {...}
                                      ],
                        'nickname B': [ {...}, {...}, {...}],
                        ...                               
                   }
      */             
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

   //전체적인 '홈 화면' UI 렌더링
   render(){
      return(
         <div>
            {/* 상단 바 - 사용자 정보 */}
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

            {/* 사용자들의 책 이미지 정보 */}
            <div className="home-book-list">
                  {this.renderUserBook()}
            </div>
            <div>
                  <Modal show={this.state.isClickImage}
                         onClose={ () => { 
                              this.setState({isClickImage: !this.state.isClickImage});

                              //모달이 화면에 출력되면 화면이 이동되지 않도록 스크롤 고정
                              document.querySelector('body').style.overflow = 'auto';
                              document.querySelector('body').style.paddingRight = '0'; 
                         }}
                  >
                        {/* Modal 내용 - 사용자가 작성한 책 정보*/}
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

//Redux를 통해 allbooks Application-State를 받음
function mapStateToProps(state) {
      return {
            allbooks: state.allbooks 
      }
}

//Redux를 연결한 Home 컴포넌트를 내보냄
export default connect(mapStateToProps, { fetchAllBooks })(Home);