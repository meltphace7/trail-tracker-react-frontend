import React from 'react'
import Modal from './Modal';
import classes from './AddTrailErrorMessage.module.css'

const AddTrailErrorMessage = (props) => {
    return (
      <Modal>
        <div className={classes['message-container']}>
          <h2 className={classes.message}>Please include at least one photo!</h2>
          <button onClick={props.onCloseErrorMsg} className={classes.button}>OK</button>
        </div>
      </Modal>
    );
}

export default AddTrailErrorMessage
