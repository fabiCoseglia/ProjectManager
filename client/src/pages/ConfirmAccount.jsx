import { useEffect,useState } from 'react';
import { Link, useNavigate, useParams} from 'react-router-dom';
import { clientAxios } from '../config/clientAxios';
import Swal from 'sweetalert2';
import { Alert } from 'react-bootstrap';
import { AlertMsg } from '../components/AlertMsg';

export const ConfirmAccount = () => {
  const params = useParams();
  const {token} = params;

  const navigate = useNavigate();

  const [alert, setAlert] = useState({});
  

  const handleShowAlert = (msg) =>{
    setAlert({msg});

    setTimeout(() => {
      setAlert({});
    }, 400000);
  };

  useEffect(() => {
    
    const confirmAccount = async () =>{
      try {
        
        const {data} = await clientAxios.get(`/auth/checked?token=${token}`);

        //mandar sweet alert

        Swal.fire({
          icon: 'success',
          title: 'confirmed account',
          text: data.msg,
          confirmButtonText : "Login",
          allowOutsideClick : false
        }).then(result => {
          if(result.isConfirmed){
            navigate('/')
          }
        })


      } catch (error) {
        console.error(error);
        handleShowAlert(error.response?.data.msg);
      }
    }
      confirmAccount();

  }, []);
  

  return (
    <div>
      <h1 className='text-info text-center mb-3 fw-bold' style={{fontSize:'32px'}}>Confirm Password</h1>
      {
        alert.msg && (
          <>
          <AlertMsg {...alert}/>
          <Alert> ℹ It's possible that your account is already confirmed. <Link to={'/'}><span>Try Login</span></Link>.</Alert>
          </>
        
        )
      }
    </div>
    

    )
    
}
