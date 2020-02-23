import React from 'react';
import styles from './index.scss';

const LoginLayout = (props:any) => {
  return(
    <div className={styles.background}>
      <div className={styles.text} >游大嵊旅游智能云办公系统</div>
      {props.children}
    </div>
  )
}

export default LoginLayout
