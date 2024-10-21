import {useState} from 'react'
import {Header} from "../../components/Header";
import imagem from "../../assets/imagem.png";
import ItemList from "../../components/ItemList";
import "./styles.css";



function App(){
  const[user, setUser] = useState('');
  const[currentUser, setCurrentUser] = useState(null);
  const[repos, setRepos] = useState(null);

  const handleGetDate = async()=>{
    const userDate = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userDate.json();
    

    if (newUser.name){
      const {avatar_url, name, bio, login, id} = newUser;
      setCurrentUser(avatar_url, name, bio, login, id);

      const reposDate = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposDate.json();
      
      

      if (newRepos.length){
        setRepos(newRepos);
      }


      
    }
  };
  return (
    <div className="App">
      <Header/>
      <div className='conteudo'>
        <img src={imagem} className='imagem' alt='imagem app'/>
        <div className='info'>
          <div>
            <input
              name="usuario"
              value={user}
              onChange={event=>setUser(event.target.value)}
              placeholder='@username'
            
            />
            <button onClick={handleGetDate}>Buscar</button>
            
          </div>
        

          {currentUser? (
            <>
              <div className='perfil'>
  
                <img                
                  src={currentUser}
                  className="profile"
                  alt=''
                />
                <div>
                  <h3>{currentUser.name}</h3>
                  <span>@{currentUser.login}</span>
                  <p>{currentUser.bio}</p>
                </div>
              </div>
            <hr/>
            </>
          ):null}
              
          
          {repos?.length ?(
            <div>


              <h4 className='repositorio'>Repositório</h4>
             
              {repos.map((repo)=>(
                <ItemList title={repo.name} description={repo.description}></ItemList>
              ))}
                
            </div>
           

          ):null}
      
        </div>
      </div>
    </div>
  );
}


export default App;







