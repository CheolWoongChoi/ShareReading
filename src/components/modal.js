
import React, { Component } from 'react';
import PropTypes from 'prop-types';

 // 바깥쪽 회색 배경
 const backdropStyle = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 50
 };

 // 안쪽 화면에 모달 CSS
 const modalStyle = {
    backgroundColor: '#fff',
    borderRadius: 5,
    maxWidth: 500,
    minHeight: 300,
    margin: '0 auto',
    padding: 30
 };


class Modal extends Component {
  
   //모달 화면을 출력
   render() {
    if(!this.props.show){
       return null;
    }

    //화면 스크롤 고정
    document.querySelector('body').style.overflow = 'hidden';
    //document.querySelector('body').style.paddingRight = '17px';

    return (
      <div className="backdrop" style={backdropStyle}>
         <div className="modalContent" style={modalStyle}>
            <div className="text-right">
              <button className="btn btn-danger" onClick={this.props.onClose}>
                창 닫기
              </button>
            </div>

            {/* 모달 종류(책 추가/책 수정)에 따라 내용을 다르게 보여줌 */}
            {this.props.children}
         </div>
       </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;