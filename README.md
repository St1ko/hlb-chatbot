# HLB-chatbot

A chatbot made for HLB Van Daal during a school project at Fontys University of Applied Sciences - Bachelor ICT & Media Design

## Requirements

For development, you will need Node.js and package manager Yarn, installed in your environement. Also make sure `git` is available in your PATH.

### Node.js installation
To install Node.js and npm go to the [official Node.js website](https://nodejs.org/) and download the installer or run the following commands in your command line.

    $ sudo apt install nodejs
    $ sudo apt install npm

You can verify your installation by running the following commands.

    $ node --version
    v12.12.0
    
    $ npm --version
    6.9.0
    
### Yarn installation
To install Yarn, run the following command in your command line.

    $ npm install -g yarn

## Local development
Clone this repository to you local machine by running the following command in your command line.

    $ git clone https://github.com/St1ko/hlb-chatbot
    
### Installing app dependencies
Now go to the project directory and install the apps dependencies.

    $ cd hlb-chatbot
    $ yarn

### Running the app
To start the application run the following command. This will compile all scss files into one css file and start up the node server. 

    $ yarn start
    
Go to `http://localhost:8000` to view the application that is running on your local machine.

## Built With

* [BotUI](https://botui.org/) - Chatbot framework
* [Node.js](https://nodejs.org/en/) - Used for the backend
* [Nodemailer](https://www.npmjs.com/package/nodemailer) - Used to send e-mails from Node.js

## Authors

* **Stijn Albert** - [St1ko](https://github.com/St1ko)
* **Manon van den Berg** - [NonPon](https://github.com/NonPon)
* **Winnie Hoogakker** - [WinneNH](https://github.com/WinnieNH)
* **Eva Kaper** - [Appelszijnvies](https://github.com/Appelszijnvies)
* **Tom Somhorst** - [tom-x-s](https://github.com/tom-x-s)
* **Thijs de Veth** - [tdeveth](https://github.com/tdeveth)
