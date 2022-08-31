import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import classes from './MessageTrailSubmit.module.css';
import LoadingIcons from "react-loading-icons";

const MessageTrailSubmit = (props) => {
   const [isUploading, setIsuploading] = useState(true)
   
    useEffect(() => {
        if (props.uploading === false) {
          setIsuploading(false);
        }
      }, [props.uploading, isUploading]);
    
    const closeModalHandler = function () {
      props.onClose(false)
    }



    const loadingMessage = (
      <React.Fragment>
        <h1 className={classes["message-text"]}>Uploading...</h1>
        <LoadingIcons.SpinningCircles />
      </React.Fragment>
    );

    const successMessage = (
      <React.Fragment>
        <h1 className={classes['message-text']}>Trail Submitted!</h1>
        <button onClick={closeModalHandler}>OK</button>
      </React.Fragment>
    );

    return (
      <Modal>
        <div className={classes["trail-submit-message"]}>
          {isUploading && loadingMessage}
          {!isUploading && successMessage}
        </div>
      </Modal>
    );
}

export default MessageTrailSubmit
