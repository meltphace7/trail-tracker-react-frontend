import React from 'react'
import Modal from "../modal/Modal";
import classes from './LoadingScreen.module.css';
import LoadingSpinner from '../UI/LoadingSpinner'

const LoadingScreen = () => {
    return (
      <Modal>
        <div className={classes.background}>
                <div className={classes['loading-spinner']}>
                    <LoadingSpinner />
          </div>
        </div>
      </Modal>
    );
}

export default LoadingScreen
