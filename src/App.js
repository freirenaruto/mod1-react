import React, { useState, useEffect } from "react";

import api from './services/api';
import "./styles.css";

//O app funcionou, porem os testes não executam.
function App() {
  const [repo, setRepo] = useState([]);

  useEffect(()=>{
    async function loadRepos(){
      try{
        const resp = await api.get('/repositories');

        if(!resp.data){
          throw new Error("Não foi possivel realizar busca");
        }

        setRepo([...resp.data]);
      }catch(err){
        alert(err.message);
      }
    }

    loadRepos();
  }, [repo]);

  async function handleAddRepository() {
    const data = {
      title: "React",
      url: "testando",
      techs: ["React", "Node"]
    }

    try{
      const res = await api.post(`/repositories`, data);

      setRepo([...repo, data]);
    }catch(err){
      alert(err.message);
    }
  }

  async function handleRemoveRepository(id) {
    try{
      await api.delete(`/repositories/${id}`);

      setRepo(repo.filter(rep => rep.id !== id));
    }catch(err){
      alert(err.message);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repo.map(rep => (
          <li key={rep.id}>
            <span>{rep.title}</span>

            <button onClick={() => handleRemoveRepository(rep.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
