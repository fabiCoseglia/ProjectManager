import { useState} from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import { clientAxios } from '../config/clientAxios';
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
          <h1 className='text-white text-center mb-3 fw-bold' style={{fontSize:'32px'}}>Forgotten Password</h1>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label htmlFor='email' className='text-white'>Email address</Form.Label>
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
        <Link to={'/'}><Button variant="outline-light" type="submit" className='mt-2'>
          Cancel
        </Button></Link>
        <Button variant="outline-light" type="submit" className='mt-2'>
          Recover Password
        </Button>
        </Form.Group>
  
        </Form>
    </div>
  )
}
