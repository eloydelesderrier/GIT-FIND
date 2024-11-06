import {useState} from 'react'
import {Header} from "../../components/Header";
import imagem from "../../assets/imagem.png";
import ItemList from "../../components/ItemList";
import "./styles.css";



function App(){
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState([]);
  const [repos, setRepos] = useState([]);

  const hanbleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`)
    const newUser = await userData.json();
    
    if (newUser.name){
      const {avatar_url, name, login,bio} = newUser;
      setCurrentUser({avatar_url, name, login,bio})

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`)
      const newRepos = await reposData.json();

      if (newRepos.length){
          setRepos(newRepos);
      }
    
    }
  }

  return (
    <div className="App">
       <Header/>
       <div className="conteudo">
        <img src={imagem} className="background"alt="background app"/>
        <div className="info">
          <div>
            <input 
              name="usuario" 
              value={user}  
              onChange={ event => setUser(event.target.value)} 
              placeholder="@username"
            />
            <button onClick={hanbleGetData}>Buscar</button>
          </div>
          {currentUser.name ? (
          <>
            <div className='perfil'>
              <img src={currentUser.avatar_url} className="profile" alt=''/>
              <div>
                <h3>{currentUser.name}</h3>
                <span>@{currentUser.login}</span>
                <p>{currentUser.bio}</p>
              </div>
            </div>
            <hr/>
          </>
          ): null}
        
          {repos.length? (
            <div>
              <h4 className='repositorio'>Repositórios</h4>
              {repos.map(repos=>(
                <ItemList title={repos.name} description={repos.description}/>
              ))}
              
          </div>
          ):null}
          
        </div>
       </div>
    </div>
   
  )
}


export default App;







