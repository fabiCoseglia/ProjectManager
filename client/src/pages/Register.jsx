import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { clientAxios } from '../config/clientAxios';
import { AlertMsg } from '../components/AlertMsg';
import { useForm } from '../hooks/useForm';
import Swal from 'sweetalert2';

export const Register = () => {

  const [alert, setAlert] = useState({});
  const [disable, setDisable] = useState(false);

  const exRegEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}/;

  const {formValues,setFormValues,handleImputChange,reset}= useForm({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const {name,email,password,password2}= formValues;

  const handleSubmit = async(e) =>{
    e.preventDefault();

    //console.log(formValues);

    if([name,email,password,password2].includes('')){
      handleShowAlert('Todos los campos son obligatorios');
      return null
    }

      if(!exRegEmail.test(email)){
        handleShowAlert('Debe ingresar un Email válido');
        return null
    };

    if(password !== password2){
      handleShowAlert('Las contraseñas deben ser iguales');
      return null
    };

    try {

      setDisable(true);
      const {data} = await clientAxios.post('/auth/register',{
        name,
        email,
        password
      });
      setDisable(false);
      console.log(data.msg);

      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Usuario Registrado',
        text: 'Por favor, revise su email para confirmar su registro',
        showConfirmButton: false,
        timer: 3500
      })

      reset();
    } catch (error) {
      console.error(error)
      handleShowAlert(error.response.data.msg);
      reset();
    }
    };
    

  const handleShowAlert = (msg) =>{
    setAlert({msg});

    setTimeout(() => {
      setAlert({});
    }, 4000);
  }

  return (
    <div>
      
      {
        alert.msg && <AlertMsg {...alert} />
      }
      <Form
      onSubmit={handleSubmit}
      noValidate
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)',
      border: '1px solid gray',
      borderRadius: '10px',
      padding: '20px'}}
      >
      <h1 className='text-white text-center mb-3 fw-bold' style={{fontSize:'32px'}}>Create Account</h1>
      
      <Form.Group className="mb-3">
        <Form.Label htmlFor='name' className='text-white'>Name</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Enter name" 
        name='name' 
        id='name' 
        value={name} 
        onChange={handleImputChange}  />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor='email'className='text-white'>Email address</Form.Label>
        <Form.Control 
        type="email" 
        placeholder="Enter email" 
        name='email' 
        id='email'
        value={email} 
        onChange={handleImputChange}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor='password'className='text-white'>Password</Form.Label>
        <Form.Control 
        type="password" 
        placeholder="Password" 
        name='password' 
        id='password'
        value={password} 
        onChange={handleImputChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor='password2'className='text-white'>Confirm password</Form.Label>
        <Form.Control 
        type="password" 
        placeholder="Password" 
        name='password2' 
        id='password2'
        value={password2} 
        onChange={handleImputChange} />
      </Form.Group>

      <Form.Group className='d-flex justify-content-end gap-2'>
        <Link to={'/'}><Button variant="outline-light" type="submit" className='mt-2'>
          Cancel
        </Button></Link>
        <Button 
        variant="outline-light" 
        type="submit" 
        className='mt-2'
        disabled = {disable}
        >
          Sign in
        </Button>
        </Form.Group>
 
    </Form>
    </div>

  )
}
