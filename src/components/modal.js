
import React, { Component } from 'react';
import PropTypes from 'prop-types';

 // The gray background
 const backdropStyle = {
   position: 'fixed',
   top: 0,
   bottom: 0,
   left: 0,
   right: 0,
   backgroundColor: 'rgba(0,0,0,0.3)',
   padding: 50
 };

 // The modal "window"
 const modalStyle = {
   backgroundColor: '#fff',
   borderRadius: 5,
   maxWidth: 500,
   minHeight: 500,
   margin: 'auto auto',
   padding: 30
 };


class Modal extends Component {
  
   render() {

    if(!this.props.show) {
       return null;
    }
    
    return (
      <div className="backdrop" style={backdropStyle}>
         <div className="modalContent" style={modalStyle}>
            <div className="text-right">
              <button className="btn btn-danger" onClick={this.props.onClose}>
                창 닫기
              </button>
            </div>
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