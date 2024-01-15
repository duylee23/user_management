import React, { useState, useEffect, useContext } from 'react'
import './Login.scss'
import { loginApi } from '../services/userServices'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';


const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [showLoadingApi, setShowLoadingApi] = useState(false)

    const {login} = useContext(UserContext)

    // useEffect(() => {
    //     let token = localStorage.getItem('token')
    //     if(token) {
    //         navigate('/')
    //     }
    // }, [])

    const handelLogin = async () => {
        if(!email || !password){
            toast.error('Email and password must be required!')
            return;
        } 
        setShowLoadingApi(true)
        let res =  await loginApi(email, password)
        if(res && res.token) {
            localStorage.setItem('token', res.token)
            login(email, res.token)
            navigate('/')
            toast.success('Login successfully!')
        } else{
            if(res && res.status === 400) {
                toast.error(res.data.error)
            }
        }
        setShowLoadingApi(false)
    }
  return (
      <div className='login-container col-12 col-sm-4'>
          <div className='title'>Log in</div>
          <div className='text'>Email or username eve.holt@reqres.in</div>
          <input type='text' placeholder='Email or user name'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
          ></input>
          <div className='password-container'>
            <input  type={!isShowPassword ? 'password' : 'text'} placeholder='Password'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
            ></input>
                <i className= {!isShowPassword ? `fa-regular fa-eye-slash` : `fa-regular fa-eye`} 
                    onClick={() => setIsShowPassword(!isShowPassword)}>
                </i>
          </div>
          <button className={email && password ? 'active' : ''} 
                disabled={(email && password ) ? false : true}
                onClick={() => handelLogin()}
                >  
                {showLoadingApi ? <i class="fa-solid fa-spinner fa-spin-pulse"></i> : 'Login' }
            </button>
          <div className='go-back'> 
            <i class="fa-solid fa-angle-left"></i>&nbsp;Go back
          </div>
      </div>
  )
}

export default Login