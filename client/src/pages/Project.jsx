import React, { useEffect } from 'react'

import { Link, useParams } from 'react-router-dom';
import { AlertMsg } from '../components/AlertMsg';
import { useProjects } from '../hooks/useProjects';

import { Task } from '../components/Task';

export const Project = () => {

 const {id} = useParams();

  const {loading,alert,getProject,project}= useProjects()

  const {name,description,dataExpire,client,_id} = project

  useEffect(() => {

    getProject(id)
  
  }, [id])
  
  if(alert.msg) return <AlertMsg {...alert}/>
  return (
    <>
      <>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <div>
              <h1> {name} </h1>
              <Link to={`/projects/edit-project/${id}`}>
                <p>Editar</p>
              </Link>
            </div>
            <div>
              <p>Tareas del proyecto</p>
              <div
              /* onClick={} */
              >
                <p>Nueva Tarea</p>
              </div>
            </div>
            <Task />
            <div>
              <p>Colaboradores</p>
              <button
              
              >
                <p>Agregar Colaborador</p>
              </button>
            </div>
            Aquí se mostrarán todos los colaboradores //todo: componente
            Collaborator
          </div>
        )}
      </>
    </>
  );
}
