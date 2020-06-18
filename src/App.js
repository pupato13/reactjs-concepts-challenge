import React, { useState, useEffect } from "react";

import "./styles.css";

//import "bootstrap/dist/css/bootstrap.min.css";

import api from "./services/api";

import InsertRepo from "./components/InsertRepo";

function App() {
    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        api.get("repositories").then((response) => {
            console.log(response);
            setRepositories(response.data);
        });
    }, []);

    async function handleAddRepository() {
        // TODO
        let txtRepositoryTitle = document.getElementById("txtRepositoryTitle");

        // if (!txtRepositoryTitle.value.trim()) {
        //     txtRepositoryTitle.setAttribute("class", "textbox input-error");
        //     return;
        // }

        try {
            await createRepository(txtRepositoryTitle.value);
        } catch (err) {
            alert("Ops! Something bad happened!");
            console.log(err);
        }

        //alert(txtRepositoryName.value);
    }

    const createRepository = async (title) => {
        var repository = {
            title,
            url: "teste",
            techs: [],
        };

        let response = await api.post("repositories", repository);

        if (response.status === 200) {
            console.log(response);

            txtRepositoryTitle.setAttribute("class", "textbox");
            txtRepositoryTitle.value = "";

            setRepositories([...repositories, response.data]);
        }
    };

    async function handleRemoveRepository(id) {
        // TODO
        console.log(id);

        //let repoIndex = repositories.findIndex((repo) => repo.id === id);

        let response = await api.delete(`repositories/${id}`);

        if (response.status === 204) {
            //alert("Repository deleted!");

            refreshRepositories(id);
        }

        //setRepositories([...repositories, {}]);
        //let repos = repositories.filter((repo) => repo.id !== id);

        //setRepositories([...repositories, repos]);
    }

    const refreshRepositories = (id) => {
        console.log(id);

        //repositories.splice(repoIndex, 1);
        let ulElement = document.querySelector("ul");
        ulElement.innerHTML = "";

        let repos = repositories.filter((repo) => repo.id !== id);

        console.log(repos);

        repos.map((repo) => {
            let liElement = document.createElement("li");
            liElement.innerHTML = repo.title;

            let buttonElement = document.createElement("button");
            buttonElement.innerHTML = "Remover";
            buttonElement.onclick = () => handleRemoveRepository(repo.id);

            liElement.appendChild(buttonElement);
            ulElement.appendChild(liElement);
        });

        setRepositories([...repositories, repos]);
    };

    return (
        <div>
            <label className="label" htmlFor="txtRepositoryTitle">
                Repository Title
            </label>
            <input
                type="text"
                className="textbox"
                id="txtRepositoryTitle"
                placeholder="Title"
            />
            <button className="btnAdicionar" onClick={handleAddRepository}>
                Adicionar
            </button>

            <ul data-testid="repository-list">
                {repositories.map((repository) => (
                    <li key={repository.id}>
                        {repository.title}
                        <button
                            onClick={() =>
                                handleRemoveRepository(repository.id)
                            }
                        >
                            Remover
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
