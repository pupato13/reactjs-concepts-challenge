# ReactJS Concepts Challenge

## :dart: The Challenge

You need to create a frontend app using ReactJS to interact with your backend application created during the [NodeJS Challenge](https://github.com/pupato13/nodejs-concepts-challenge){:target="\_blank"}.

### Functionalities

-   **`List repositories from your API`**: You should be able to create a list with the **title** field of all repositories that are registered in your API.

-   **`Add a repository to your API`**: You should be able to add a new item to your API using a button with the text **Add** and then, after creation, you should be able to display its name after registration.

-   **`Delete a repository from your API`**: For each item on your list, you must have a button with the text **Remove** that, when clicked, will call a function to remove that item from the list of your frontend and its API.

### Tests Specifications

For this challenge we have the following tests:

-   **`should be able to add new repository`**: For this test to pass, your application must allow a repository to be added to your backend and listed on your frontend within a `LI`.

-   **`should be able to remove repository`**: In order for this test to pass, your application must allow the item to be removed from the list by clicking on the remove button that will be inside the `LI` of the added repository.

# :rocket: Releasing the Kraken

## Requirements

You will only need Node.js and a node global package, Yarn, installed in your environment.

### Node

-   #### Node installation on Windows

    Just go on [official Node.js website](https://nodejs.org/) and download the installer.
    Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

-   #### Node installation on Ubuntu

    You can install nodejs and npm easily with apt install, just run the following commands.

        $ sudo apt install nodejs
        $ sudo apt install npm

-   #### Other Operating Systems
    You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node -v
    v12.18.0

    $ npm -v
    6.13.7

###

### Yarn installation

After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

## :computer: Install

Open your terminal, choose an awesome place to keep this project and type the commands below:

    $ git clone https://github.com/pupato13/reactjs-concepts-challenge.git
    $ cd reactjs-concepts-challenge
    $ yarn install

## Configure app

To run ReactJS Challenge, you will need to start the project NodeJS Challenge before.
You can get the walkthrough clicking [here](https://github.com/pupato13/nodejs-concepts-challenge#rocket-releasing-the-kraken).

After being sure your backend is running correctly, you can go ahead.

## :checkered_flag: Running the project

    $ yarn start

Access: [localhost:3000](http://localhost:3000/)

## :white_check_mark: Running tests

    $ yarn test
