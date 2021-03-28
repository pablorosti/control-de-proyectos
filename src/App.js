import {useState} from 'react';
import styled from 'styled-components';
import {MenuLeft} from './components/MenuLeft';
import {Header} from './elements/Header';
import {auth} from './firebase/firebaseConfig';
import {useHistory} from 'react-router-dom';
import {db} from './firebase/firebaseConfig';
import {FormAddTask} from './components/FormAddTask';
import {useGetTask} from './hooks/useGetTask';
import uuid from 'react-uuid'
import {CardTask} from './elements/CardTask';
import {deleteTask} from './firebase/deleteTask';
import {deleteProject} from './firebase/deleteProject';
import {useAuth} from './context/AuthContext';
import {Helmet} from "react-helmet";

function App() {

  const {user} = useAuth();

  const history = useHistory();

  const [project, getProject] = useState([]);

  const [task] = useGetTask();

  let hour = new Date();

  const handleClick = async () => {
    try {
      await auth.signOut();
      history.push('/login')
    } catch (error) {
      console.log(error);
    }
    
  }

  //this function the we get of component MenuLeft...
  const handleClickProyect = async e => {
    let id = e.target.value;
    
    //when we select a project, execute the following.
    try {
      const doc = await db.collection('proyectos').doc(id).get();
      getProject({...doc.data(), idNew:id});
    } catch (error) {
      console.log('ocurrio un error al intentar obtener los datos por id')
    }
  }
  
  const handleDeleteProject = () => {
    deleteProject(project.idNew)
    getProject([])
  }

  return (
      <>
        <Helmet>
            <title>Control de Proyectos</title>
        </Helmet>
        <DGrid>

          <MenuLeft handleClickProyect={handleClickProyect}/>
          <div>

            <Header>
              {hour.getHours() > 19 || hour.getHours() < 6 
                ? <H4>Buenas noches, {user.displayName}</H4>
                : hour.getHours() >= 6 || hour.getHours() < 12 
                  ? <H4>Buen día, {user.displayName}</H4>
                  : hour.getHours() > 12 || hour.getHours() < 19 
                    ? <H4>Buenas tardes, {user.displayName}</H4>
                    : <H4>Hola, {user.displayName}</H4>
              }
              
              <SignOut onClick={handleClick}><i className="fas fa-sign-out-alt"></i></SignOut>
            </Header>
            <ContainerProyect>
              {project.length === 0 
                ? 
                    project.length !==0 ? <Title>Seleccioná un proyecto</Title> : null
                  
                : <div>
                    
                    <FormAddTask name={project.nombre}
                                id={project.id}
                                idUnico={project.idUnico}
                    />
                    <DFlex>
                      <Title>Proyecto: {project.nombre}</Title>
                      <ContainerTask>
                        {
                          task.map(tarea => {
                            return <div key={uuid()}>
                                {tarea.idUnicoProyecto === project.idUnico 
                                  ? <CardTask>
                                      {tarea.tarea}
                                      <div>
                                        <Button onClick={() => deleteTask(tarea.id)}><i className="fas fa-trash-alt"></i></Button>
                                        
                                      </div>
                                    </CardTask>
                                    
                                  : null}
                            </div>
                          })  
                        }
                      </ContainerTask>
                      
                      <DeleteProject onClick={ handleDeleteProject }>Eliminar Proyecto</DeleteProject> 
                    </DFlex>
                  </div>
              }
            </ContainerProyect>
          </div>
        </DGrid>
      </>
  );
}

export default App;

const DGrid = styled.div`

  @media(min-width:768px){
    display:grid;
    grid-template-columns:1fr 3fr;
  }
`;
const DFlex = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  height:65vh;
`;
const ContainerProyect = styled.div`
  text-align:center;
`;
const ContainerTask = styled.div`

  @media(min-width:768px){
    height: 50vh;
    overflow-y: scroll;
    width:450px;
    margin:0 auto;

    ::-webkit-scrollbar{
      width:7px;
      
    }
    ::-webkit-scrollbar-thumb{
      background:tomato;
      border-radius:5px;
    }
  }
`;
const H4 = styled.h4`
  color:white;
  text-transform:capitalize;
`;
const Title = styled.h2`
  margin:1rem;
`;
const SignOut = styled.button`
  background:transparent;
  border:none;
  cursor:pointer;
  font-size:25px;
  outline:none;

  & > i {
    color:white;
    transition:all .5s;
    :hover{
      color:red;
      transition:.5s all;
    }
  }
`;
const DeleteProject = styled.button`
  width:100px;
  margin-top:20px;
  margin-bottom:20px;
  margin-left:20px;
  background:red;
  color:white;
  border:none;
  border-radius:5px;
  padding:.2rem;
  font-weight:bold;
  cursor:pointer;
  outline:none;
  transition:.5s all;

  :hover{
    background:tomato;
    transition:width .5s all;
  }

  @media(min-width:768px){
    margin-bottom:0;
  }
`;
const Button = styled.button`
  background:transparent;
  border:none;
  margin-left:10px;
  font-size:18px;
  outline:none;
  cursor:pointer;
  transition:all .2s;
  :hover{
    transition:all .2s;
    font-size:20px;
  }
`;