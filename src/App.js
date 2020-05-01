import React, { useState, useEffect } from "react";

import api from "./services/api";
import "./styles.css";

//O app funcionou, porem os testes não executam.
export default function App() {
  const [repo, setRepo] = useState([]);

  useEffect(() => {
    async function loadRepos() {
      try {
        const resp = await api.get("/repositories");

        if (!resp) {
          throw new Error("Não foi possivel realizar busca");
        }

        setRepo([...resp.data]);
      } catch (err) {
        alert(err.message);
      }
    }

    console.log("cap");
    loadRepos();
  }, []);

  async function handleAddRepository() {
    const data = {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    };

    try {
      const res = await api.post(`/repositories`, data);

      setRepo([...repo, data]);
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);
      setRepo(repo.filter((rep) => rep.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repo.map((rep) => (
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
