import { useState} from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import { clientAxios } from '../../config/clientAxios';
import { AlertMsg } from '../components/AlertMsg';

export const ForgetPassword = () => {

  const [alert, setAlert] = useState({});
  const [email, setEmail] = useState('');
  const [disable, setDisable] = useState(false);

 const handleSubmit = async(e) =>{
  e.preventDefault();
  if(!email){
    handleShowAlert('Email is required');
    return null
  }

  try {

    setDisable(true);
    const {data} = await clientAxios.post('/auth/send-token',{email});
    setDisable(false);
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: 'Recover Password',
      text: 'Please, check your email',
      showConfirmButton: true,
      confirmButtonText: 'Ok',
      allowOutsideClick: false
    });

    setEmail('');

  } catch (error) {
    handleShowAlert(error.response.data.msg);
    setEmail('');
  }

 }

 const handleShowAlert = (msg) =>{
  setAlert({msg});

  setTimeout(() => {
    setAlert({});
  }, 4000);
}

  return (
    <div>
        <h1 className='text-info text-center mb-5 fw-bold' style={{fontSize:'32px'}}>Forgotten Password</h1>

        {
          alert.msg && <AlertMsg {...alert} />
        }

        <Form
        onSubmit={handleSubmit}
        noValidate
        >

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label htmlFor='email'>Email address</Form.Label>
            <Form.Control 
            type="email" 
            placeholder="Enter email" 
            name='email' 
            id='email'
            value={email}
            onChange= {(e)=>setEmail(e.target.value)}
            disabled={disable}
            />
          </Form.Group>

          {/* <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label htmlFor='password'>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name='password' id='password' />
          </Form.Group> */}
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
