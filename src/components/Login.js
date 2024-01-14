import React, { useState } from 'react'
import './Login.scss'
import { loginApi } from '../services/userServices'
import { toast } from 'react-toastify';


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isShowPassword, setIsShowPassword] = useState(false)

    const handelLogin = async () => {
        if(!email || !password){
            toast.error('Email and password must be required!')
            return;
        } 
        let res =  await loginApi(email, password)
        if(res && res.token) {
            localStorage.setItem('token', res.token)
            console.log('checking: ', res)
        }
    }
  return (
      <div className='login-container col-12 col-sm-4'>
          <div className='title'>Log in</div>
          <div className='text'>Email or username</div>
          <input type='text' placeholder='Email or user name'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
          ></input>
          <div className='password-container'>
            <input  type={isShowPassword ? 'password' : 'text'} placeholder='Password'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
            ></input>
                <i className= {isShowPassword ? `fa-regular fa-eye-slash` : `fa-regular fa-eye`} 
                    onClick={() => setIsShowPassword(!isShowPassword)}>
                </i>
          </div>
          <button className={email && password ? 'active' : ''} 
                disabled={email && password ? false : true}
                onClick={() => handelLogin()}
                >Login</button>
          <div className='go-back'> 
            <i class="fa-solid fa-angle-left"></i> Go back
          </div>
      </div>
  )
}

export default Login