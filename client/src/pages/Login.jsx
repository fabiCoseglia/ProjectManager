import React from 'react'
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { clientAxios } from '../config/clientAxios'
import { AlertMsg } from '../components/AlertMsg'
import useAuth from '../hooks/useAuth'
import { useForm } from '../hooks/useForm'

import './login.css'

export const Login = () => {

  const [alert, setAlert] = useState({});
  const {setAuth}= useAuth();
  const navigate = useNavigate();

  const handleShowAlert = (msg,timeOut= true) =>{
    setAlert({msg});

    if(timeOut){
      setTimeout(() => {
        setAlert({});
      }, 4000);
    }
  };

  const {formValues,handleImputChange,reset}= useForm({
    email:"",
    password:"",

  });

  const {email,password}= formValues;

  const handleSubmit = async(e) =>{
    e.preventDefault();

    if([email,password].includes('')){
      handleShowAlert('All fields are required');
      return null
    }

    try {
      const {data} = await clientAxios.post('/auth/login',{email,password});

      //console.log(data);

      
      setAuth(data.user);
      sessionStorage.setItem('token',data.token)
      navigate('/projects')
    } catch (error) {
      console.error(error);
      handleShowAlert(error.response?.data.msg);
    }

  }

  return (
    <div>
      

      {
        alert.msg && <AlertMsg {...alert} />
      }

      <Form
      noValidate
      onSubmit={handleSubmit}
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)',
        border: '1px solid gray',
        borderRadius: '10px',
        padding: '20px'}}
      >
        <h1 className='text-info text-center mb-3 fw-bold text-white' style={{fontSize:'32px'}}>Login</h1>
      <Form.Group className="mb-3">
        <Form.Label htmlFor='email' className='text-white'>Email address</Form.Label>
        <Form.Control type="email"
         placeholder="Enter email" 
         name='email' 
         id='email'
         value={email}
         onChange={handleImputChange}
         />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor='password'className='text-white'>Password</Form.Label>
        <Form.Control 
        type="password" 
        placeholder="Password" 
        name='password' 
        id='password'
        value={password}
        onChange={handleImputChange}
        />
      </Form.Group>
      <Form.Group className='d-flex justify-content-end gap-2'>
        <Button variant='outline-light hover1' type="submit" className='mt-2'>
          Log in
        </Button>
        <Link to={'/register'}><Button variant='outline-light hover1' type="submit" className='mt-2'>
          Sign Up
        </Button></Link>
        </Form.Group>
        <Form.Group className='d-flex justify-content-center mt-4'>
          <Form.Text className=''><Link className='text-white mt-10' to={'/forget-password'}>I forgot my password</Link></Form.Text>
        </Form.Group>
 
    </Form>

    </div>
   
    
  )
}
