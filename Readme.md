# BINARY TREE

Given an input string with basic math operations + - x ÷ ( ) on whole numbers (both
positive and negative). e.g “(1 + 1) x 2”, you must:
a) Convert the input string into a binary tree.
b) Produce the answer to the input string.

e.g given the string: ((15 ÷ (7 − (1 + 1) ) ) × -3 ) − (2 + (1 + 1)), the expected tree is
as follows with the answer -13.

---
## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environment.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g


## Install

  $ npm install

## Testing the project

    $ npm test

## Running the project

    $ npm start


## Running the project in swagger

    $ Install Swagger --> https://swagger.io/docs/open-source-tools/swagger-ui/usage/installation/
    $ swagger project start

## Docker Build

    $ docker build -t .

## Docker Tag , Below params needs to be changed according to their requirements

    $ docker tag ${PRO_NAME}:${VER} ${DOCKER_REG}/${PRO_NAME}:${VER}

## Docker Push , Below params needs to be changed according to their requirements

    $ docker push ${DOCKER_REG}/${PRO_NAME}:${VER}
