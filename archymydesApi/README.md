# Archimydes Mock API Server

This application is a simple api server which provides the set of APIs required to build the app given in the frontend coding challenge. 

---
## Requirements

To get this application up and running. You need to have the following tools in your machine
- git
- nodejs (^v12.16.0)
- npm (it comes along with node by default)

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Node installation on Mac
  Just go on [official Node.js website](https://nodejs.org/) and download the installer. Alternatively you can use `brew` as well.
  ** Using brew: **
  
      brew update
      brew install nvm
      export NVM_DIR=~/.nvm
      source $(brew --prefix nvm)/nvm.sh
      source ~/.bash_profile
      echo $NVM_DIR
      nvm install v12.16.1

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

  If the installation was successful, you should be able to run the following command.

      $ node --version
      v12.16.1

      $ npm --version
      6.13.4

  If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

      $ npm install npm -g

---

## Install    
      
    $ git clone https://github.com/Archimydes/coding-challenges.git
    $ cd coding-challenges
    $ npm install

## Running the project

    $ npm start

if the application started successfully you will see the following in your terminal

    Api server listerning at port 3000
    Swager API Doc is available now at http://localhost:3000/api-docs

## API Documentation
We are using swagger to keep our api documentation upto date. Swagger should provide you all that you need.

**Swagger Url:** `http://localhost:3000/api-docs`