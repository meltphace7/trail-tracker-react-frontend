import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import classes from './MessageTrailSubmit.module.css';
import LoadingIcons from "react-loading-icons";

const MessageTrailSubmit = (props) => {
   const [isUploading, setIsuploading] = useState(true)
   
    useEffect(() => {
        console.log(props.uploading);
        if (props.uploading === false) {
          setIsuploading(false);
        }
      }, [props.uploading, isUploading]);
    
    const closeModalHandler = function () {
      props.onClose(false)
    }



    const loadingMessage = <div>
        <h1>Uploading...</h1>
        <LoadingIcons.SpinningCircles />
    </div>

    return (
      <Modal>
        <div className={classes["trail-submit-message"]}>
          {isUploading && loadingMessage}
          {!isUploading && <h1>TRAIL SUBMITED!</h1>}
          <button onClick={closeModalHandler}>OK</button>
        </div>
      </Modal>
    );
}

export default MessageTrailSubmit
