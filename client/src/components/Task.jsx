import React from 'react'
import { faEdit, faTrash, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Button } from 'react-bootstrap';

export const Task = () => {
  return (
    <Alert variant="primary">
      <div className="d-flex justify-content-between">
        <h4>Título de tarea</h4>
        <div className='gap-1 d-flex'>
        <Button variant="secondary" className="mr-2">
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button variant="secondary" className="mr-2">
            <FontAwesomeIcon icon={faTrash} />
          </Button>
          <Button variant="secondary">
            <FontAwesomeIcon icon={faPlusCircle} />
          </Button>
        </div>
      </div>
      <p className="mt-3">Nombre de la tarea</p>
      <p>Fecha de entrega</p>
      <p>Prioridad</p>
    </Alert>
  )
}
