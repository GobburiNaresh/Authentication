import React, { useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../store/auth-context';
import {useHistory} from 'react-router-dom';

const ProfileForm = () => {
  const newPasswordRef = useRef();
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const passwordSubmitHandler = (event) => {
    event.preventDefault();
    const enteredNewPassword = newPasswordRef.current.value;
    console.log(enteredNewPassword)
    console.log(authCtx)
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCHjc2vY2MdSR3_pMDJSb4BCMv3WMkgXJ0',{
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPassword,
        returnSecureToken: false
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      history.replace('/');
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    newPasswordRef.current.value = '';
  }

  return (
    <form className={classes.form} onSubmit={passwordSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength='7' ref={newPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
