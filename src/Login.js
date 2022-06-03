import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from './firebase';
import './Login.css'

function Login() {

    const signIn = (e) =>
    {
        auth.signInWithPopup(provider)
        .then(response=> console.log(response))
        .catch(err => alert(err.message));
    };

  return (
    <div className='login'>
       <div className="home">
               <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt=""/> 
                <div className="login_text">
                    <h1>Sign in to Whatsapp</h1>
                </div>
                <Button type="submit" onClick={signIn}>Sign in With Google</Button>
           </div>
    </div>
  )
}

export default Login