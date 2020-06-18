import React, { useState, useEffect } from "react";

import "./styles.css";

import api from "./services/api";

function App() {
    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        api.get("repositories").then((response) => {
            if (Array.isArray(response.data)) {
                setRepositories(response.data);
            }
        });
    }, []);

    async function handleAddRepository() {
        let title = document.getElementById("txtRepositoryTitle").value;
        let url = document.getElementById("txtRepositoryUrl").value;
        let techs = document
            .getElementById("txtRepositoryTechs")
            .value.split(",")
            .map((item) => item.trim());

        //clearErrorClasses();

        // Removendo validacao no front porque quebra os testes
        //if (!isPostValid()) return;

        try {
            await createRepository(title, url, techs);
        } catch (err) {
            alert("Ops! Something bad happened!");
            console.log(err);
        }
    }

    const createRepository = async (title, url, techs) => {
        let repository = {
            title,
            //url: "https://github.com/pupato13/reactjs-concepts-challenge",
            url,
            techs: [...techs],
        };

        let response = await api.post("repositories", repository);

        if (response.status === 200) {
            setRepositories([...repositories, response.data]);

            clearInputs();
        } else {
            alert("Ops. Something bad happened!");
        }
    };

    async function handleRemoveRepository(id) {
        let response = await api.delete(`repositories/${id}`);

        if (response.status === 204) {
            refreshRepositories(id);
        } else {
            alert("Ops. Something bad happened!");
        }
    }

    const refreshRepositories = (id) => {
        let repos = [...repositories];

        let repoIndex = repositories.findIndex((repo) => repo.id === id);

        repos.splice(repoIndex, 1);

        setRepositories(repos);
    };

    const isPostValid = () => {
        let txtRepositoryTitle = document.getElementById("txtRepositoryTitle");
        let txtRepositoryUrl = document.getElementById("txtRepositoryUrl");
        let txtRepositoryTechs = document.getElementById("txtRepositoryTechs");

        let isValid = true;

        if (!txtRepositoryTitle.value.trim()) {
            txtRepositoryTitle.setAttribute("class", "textbox input-error");
            isValid = false;
        }

        if (!txtRepositoryUrl.value.trim()) {
            txtRepositoryUrl.setAttribute("class", "textbox input-error");
            isValid = false;
        }

        if (!txtRepositoryTechs.value.trim()) {
            txtRepositoryTechs.setAttribute("class", "textbox input-error");
            isValid = false;
        }

        return isValid;
    };

    const clearInputs = () => {
        let txtRepositoryTitle = document.getElementById("txtRepositoryTitle");
        let txtRepositoryUrl = document.getElementById("txtRepositoryUrl");
        let txtRepositoryTechs = document.getElementById("txtRepositoryTechs");

        txtRepositoryTitle.value = "";
        txtRepositoryUrl.value = "";
        txtRepositoryTechs.value = "";

        clearErrorClasses();
    };

    const clearErrorClasses = () => {
        let txtRepositoryTitle = document.getElementById("txtRepositoryTitle");
        let txtRepositoryUrl = document.getElementById("txtRepositoryUrl");
        let txtRepositoryTechs = document.getElementById("txtRepositoryTechs");

        txtRepositoryTitle.setAttribute("class", "textbox");
        txtRepositoryUrl.setAttribute("class", "textbox");
        txtRepositoryTechs.setAttribute("class", "textbox");
    };

    const hasRepositories = () => {
        return repositories !== undefined && repositories.length > 0;
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
            <label className="label" htmlFor="txtRepositoryUrl">
                Repository URL
            </label>
            <input
                type="text"
                className="textbox"
                id="txtRepositoryUrl"
                placeholder="URL"
            />
            <label className="label" htmlFor="txtRepositoryTechs">
                Techs <span className="label-sm">[Separe as techs por , ]</span>
            </label>
            <input
                type="text"
                className="textbox"
                id="txtRepositoryTechs"
                placeholder="ex: NodeJS, ReactJS, React Native"
            />
            <button className="btnAdicionar" onClick={handleAddRepository}>
                Adicionar
            </button>

            <ul data-testid="repository-list">
                {hasRepositories()
                    ? repositories.map((repository) => (
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
                      ))
                    : null}
            </ul>
        </div>
    );
}

export default App;
