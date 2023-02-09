import React, { useEffect, useRef } from "react";
import { Button, Container, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { useProjects } from "../hooks/useProjects";
import { AlertMsg } from "./AlertMsg";
import './FormProject.css';

export const FormProject = () => {
  const { alert, showAlert, storeProject, project } = useProjects();

  const { id } = useParams();

  const inputName = useRef(null);
  const inputDescription = useRef(null);
  const inputDateExpire = useRef(null);
  const inputClient = useRef(null);
  
  const {formValues, handleImputChange, reset,setFormValues} = useForm({
    name : "",
    description : "",
    dateExpire : "",
    client : ""
  });

  let {name, description, dateExpire, client} = formValues;

  useEffect(() => {
    
    if (id) {

      inputName.current.value = project.name;
      inputDescription.current.value = project.description;
      inputDateExpire.current.value = project.dateExpire && project.dateExpire.split("T")[0];
      inputClient.current.value = project.client;

      setFormValues({
        name: project.name,
        description: project.description,
        dateExpire: project.dateExpire.split('T')[0],
        client: project.client,
      });

    }
  }, [id]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if ([name, description, dateExpire, client].includes("")) {
      showAlert("All fields are required");
      return null;
    }

    storeProject({
      id: id ? id : null,
      name,
      description,
      dateExpire,
      client,
    });
  };


  return (
    <Container className="formMobileView">
    {
      alert.msg && <AlertMsg {...alert} />
    }

<Form style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)',
    border: '1px solid gray',
    borderRadius: '10px',
    padding: '20px'}} className='mb-3'onSubmit={handleSubmit}>

      <h1 className='text-white text-center mb-3 fw-bold' style={{fontSize:'32px'}}> {id ? 'Update Project' : 'Create Project'} </h1>

      <FormGroup className="mb-1">
        <FormLabel className="text-white">Project name</FormLabel>
        <FormControl type="text" placeholder="Enter project name" name="name" id='name' value={name}
          onChange={handleImputChange} ref={inputName}  />
      </FormGroup>
      <FormGroup className="mb-1">
        <FormLabel className="text-white">Client name</FormLabel>
        <FormControl type="text" placeholder="Enter client name" name="client" id='client' value={client} 
          onChange={handleImputChange} ref={inputClient} />
      </FormGroup>
      <FormGroup className="mb-1">
        <FormLabel className="text-white">Delivery date</FormLabel>
        <FormControl type="date" name="dateExpire" id='date-expire' value={dateExpire}
          onChange={handleImputChange}  ref={inputDateExpire}/>
      </FormGroup  >
      <FormGroup className="mb-1">
        <FormLabel className="text-white">Description</FormLabel>
        <FormControl as="textarea" rows="3" placeholder="Enter project description"name="description" id='description'value={description}
          onChange={handleImputChange}  ref={inputDescription}/>
      </FormGroup >
      <Button variant="outline-light" type="submit" className="mt-2 ml-auto">
        {id ? 'Update Project' : 'Create Project'}
      </Button>
    </Form>
   
  </Container>
  );
};
