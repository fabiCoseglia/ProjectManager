import { useContext } from 'react'
import ProjectsContext from '../context/ProjectProvider'

export const useProjects = () => {
  return useContext(ProjectsContext);

  
}
