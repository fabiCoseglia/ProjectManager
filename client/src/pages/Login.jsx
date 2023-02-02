import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'


export const Login = () => {

  return (
    <div>
      <h1 className='text-info text-center mb-3 fw-bold' style={{fontSize:'32px'}}>Login</h1>
      <Form>

      <Form.Group className="mb-3">
        <Form.Label htmlFor='email'>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' id='email'/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor='password'>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password' id='password' />
      </Form.Group>
      <Form.Group className='d-flex justify-content-end gap-2'>
        <Button variant="info" type="submit" className='text-white mt-2'>
          Log in
        </Button>
        <Link to={'/register'}><Button variant="info" type="submit" className='text-white mt-2'>
          Sign Up
        </Button></Link>
        </Form.Group>
        <Form.Group className='d-flex justify-content-center mt-4'>
          <Form.Text className=''><Link className='text-dark' to={'/forget-password'}>I forgot my password</Link></Form.Text>
        </Form.Group>
 
    </Form>

    </div>
   
    
  )
}
