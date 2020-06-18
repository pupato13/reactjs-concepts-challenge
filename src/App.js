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
		let response = await api.delete(`repositories/${id}`);

		if (response.status === 204) {
			refreshRepositories(id);
		} else {
			alert("Ops. Something bad happened!");
		}
	}

	const refreshRepositories = (id) => {
		const repos = [...repositories];

		const repoIndex = repositories.findIndex((repo) => repo.id === id);

		repos.splice(repoIndex, 1);

		setRepositories(repos);
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
