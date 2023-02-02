import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const ForgetPassword = () => {

  const [alert, setAlert] = useState({});
  const [email, setEmail] = useState('');

 

  return (
    <div>
        <h1 className='text-info text-center mb-3 fw-bold' style={{fontSize:'32px'}}>Forgotten Password</h1>
        <Form>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label htmlFor='email'>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name='email' id='email'/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label htmlFor='password'>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name='password' id='password' />
          </Form.Group>
          <Form.Group className='d-flex justify-content-end gap-2'>
        <Link to={'/'}><Button variant="info" type="submit" className='text-white mt-2'>
          Cancel
        </Button></Link>
        <Button variant="info" type="submit" className='text-white mt-2'>
          Recover Password
        </Button>
        </Form.Group>
  
        </Form>
    </div>
  )
}
