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

## Deploying to production
To deploy this application to a prodcuction environment, some additional steps are required. After following the steps of the previous section, you want to generate a SSL certificate using LetsEncrypt. This is required to run the chatbot in an IFrame. It is required to have a server running and a domain name pointing to it.

First, install certbot to your server:

    $ sudo add-apt-repository ppa:certbot/certbot
    $ sudo apt-get update
    $ sudo apt-get install certbot
    
Now generate a SSL certificate using the following command:

    $ certbot certonly --manual

Follow the interactive script until the session states
> "Make sure your web server displays the following content at `http://yourdomain/.well-known/acme-challenge/some-string`" 

Where `some-string` is a long alphanumeric string. This string will be the name of a file that you are about to create now.

Now before you continue, you need to create two directories and a file in `hlb-chatbot/client`. (Without closing the current session!)

*(replace `some-string` with your long alphanumeric string)*

    $ cd hlb-chatbot/client
    $ mkdir .well-known
    $ mkdir .well-known/acme-challenge
    $ vim .well-known/acme-challenge/some-string   


In the vim window you want to paste the other long alphanumeric string listed under the url. Save the file (in vim: `esc :wq enter`.

To verify that everything is fine, open up your browser and navigate to: `http://yourdomain.com/.well-known/acme-challenge/some-string`
Your browser should download your challenge file. If it’s not the case, take everything back from the start. Don’t touch your shell, restart from directory & file creation.

Go back to your certbot session and continue by pressing enter.

### Add credentials to config.json

Finally in `hlb-chatbot/config.json` you need to point to the created SSL credentials. Change the `production` object in the `config.json` file to look like this:

```
{
  ...
  
  "production": {
    "config_id": "production",
    "http_port": 80,
    "https_port": 443,
    "ssl_credentials_path": "/etc/letsencrypt/live/yourdomain/"
  }
}
```

### Starting the server
We're almost done. We need to install the pm2 package, to make sure our Node.js application keeps running when we logout of our server.

    $ npm install -g pm2
    
Now we're all set and can start our Node.js application by running the following command:

    $ pm2 start yarn -- deploy
    
The application is now available on your domain.

## Built With

* [BotUI](https://botui.org/) - Chatbot framework
* [Node.js](https://nodejs.org/en/) - Used for the backend

## Authors

* **Stijn Albert** - [St1ko](https://github.com/St1ko)
* **Manon van den Berg** - [NonPon](https://github.com/NonPon)
* **Winnie Hoogakker** - [WinneNH](https://github.com/WinnieNH)
* **Eva Kaper** - [Appelszijnvies](https://github.com/Appelszijnvies)
* **Tom Somhorst** - [tom-x-s](https://github.com/tom-x-s)
* **Thijs de Veth** - [tdeveth](https://github.com/tdeveth)
