import React from 'react'
import { Form } from 'react-bootstrap'

export const RecoverPassword = () => {
  return (
    <div>
      <h1 className='text-info text-center mb-3 fw-bold' style={{fontSize:'32px'}}>Restore Password</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label htmlFor='password'>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name='password' id='password' />
            </Form.Group>
        </Form>
    </div>
  )
}
