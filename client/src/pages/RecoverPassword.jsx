import { useEffect } from 'react';
import { useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import {useNavigate, useParams} from 'react-router-dom'
import Swal from 'sweetalert2';
import { clientAxios } from '../../config/clientAxios';
import { AlertMsg } from '../components/AlertMsg';
export const RecoverPassword = () => {

  const [alert, setAlert] = useState({});
  const [password, setPassword] = useState("");
  const [tokenChecked, setTokenChecked] = useState(false);

  const params= useParams();
  const {token} = params;
  const navigate = useNavigate();

  const handleShowAlert = (msg) =>{
    setAlert({msg});

    /* setTimeout(() => {
      setAlert({});
    }, 4000); */
  };

  useEffect(() => {
  
    const checkToken = async() => {

      try {
        

        const {data} = await clientAxios.get(`/auth/reset-password?token=${token}`);
        setTokenChecked(true);

      } catch (error) {
        console.error(error)
        handleShowAlert(error.response.data.msg);
      }

    }

    checkToken();
  }, [])
  
  const handleSubmit = async(e) =>{
    e.preventDefault();

    if(!password){
      handleShowAlert('Password is required');
      return null
    }

    try {
      const {data}= await clientAxios.post(`/auth/reset-password?token=${token}`,{
        password
      })
  
      Swal.fire({
        icon: 'success',
        title: 'password changed successfully!',
        text: data.msg,
        confirmButtonText : "Login",
        allowOutsideClick : false
      }).then(result => {
        if(result.isConfirmed){
          setPassword('');
          navigate('/')
        }
      })
      
    } catch (error) {
      handleShowAlert(error.response.data.msg);
      setPassword('');
    }

    

  }

  return (
    <div>
      <h1 className='text-info text-center mb-3 fw-bold' style={{fontSize:'32px'}}>Restore Password</h1>

      {
        alert.msg && <AlertMsg {...alert}/>
      }

      {
        !tokenChecked && <Alert> ℹ Possibly the link has expired, please, check your email.</Alert>
      }

      {
        tokenChecked && (
        <Form
        onSubmit={handleSubmit}
        >
        <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label htmlFor='password'>Password</Form.Label>
              <Form.Control 
              type="password" 
              placeholder="Password" 
              name='password' 
              id='password'
              value={password}
              onChange ={(e)=>setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="info" type="submit" className='text-white mt-2'>
          Change Password
        </Button>
        </Form>)
        }
    </div>
  )
}
