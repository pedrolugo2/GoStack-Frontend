import React, { useEffect, useState} from "react";
import List from "./components/List"

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([])
  useEffect(() => {
    api.get('repositories').then( res => {
      console.log(res);
      setRepositories(res.data);
    })
  }, []);

  async function handleAddRepository() {
    api.post('repositories', {
      title: "Desafio Node.js",
      url: "https://github.com/Rocketseat/bootcamp-gostack-desafios",
      techs: [
          "Node.js",
          "Python"
          ]}).then( res => {
      setRepositories([...repositories,res.data]);
    })
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`)
    const repositoryIndex = repositories.findIndex( repo => repo.id === id);
    const updatedRepos = Object.assign([], repositories);
    updatedRepos.splice(repositoryIndex,1)
    setRepositories(updatedRepos);
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repo =>
          <li key={repo.id}>{repo.title}
          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
