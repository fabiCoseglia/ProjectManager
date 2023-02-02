import React from 'react'
import { useEffect,useState } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import { clientAxios } from '../../config/clientAxios';

export const ConfirmAccount = () => {
  const params = useParams();
  const {token} = params;

  const [alert, setAlert] = useState({});
  const navigate = useNavigate();

  const handleShowAlert = (msg) =>{
    setAlert({msg});

    setTimeout(() => {
      setAlert({});
    }, 4000);
  };

  useEffect(() => {
    
    const confirmAccount = async () =>{
      try {
        
        const {data} = await clientAxios.get(`/auth/checked?token=${token}`);

        //mandar sweet alert
       /*  Swal.fire({
          icon: 'info',
          title: 'Felicitaciones!',
          text: data.msg,
          confirmButtonText : "Iniciá sesión",
          allowOutsideClick : false
        }).then(result => {
          if(result.isConfirmed){
            navigate('/')
          }
        }) */


      } catch (error) {
        console.error(error);
        handleShowAlert(error.response?.data.msg);
      }
    }
  
  }, []);
  

  return (
    <div>ConfirmAccount</div>

    )
    
}
