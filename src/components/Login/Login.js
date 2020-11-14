import React from 'react';

import { signInWithGoogle } from '../../utils/firebase';
import styles from './Login.module.css';

const Login = ({ setIsLoggedIn, setCurrentUser }) => {
  const showPopUpToSignIn = async () => {
    const userData = await signInWithGoogle();

    if (!userData) {
      alert('로그인에 실패하였습니다.');
      setIsLoggedIn(false);
      return;
    }

    setIsLoggedIn(true);
    setCurrentUser({ ...userData });
    return;
  };

  return (
    <div className={styles.LoginWrap}>
      <div className={styles.Login}>
        <h1>Login</h1>
        <button
          className={styles.GoogleLoginButton}
          onClick={showPopUpToSignIn}>
          Google Login
        </button>
      </div>
    </div>
  );
};

export default Login;