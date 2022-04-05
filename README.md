## Welcome to the wiliot exercise.

We need to clone and run two repos to make it work. Are you ready?

### First step - Spin up the SERVER

Let's clone the [server](https://github.com/and-dzh3/ws-srv), that provides the data on a socket on the adress: `ws://localhost:8999`:

`git clone https://github.com/and-dzh3/ws-srv.git`

Then run the follow commands:

`cd ws-srv/`

`npm install`

`npm i -g typescript `

`./node_modules/.bin/tsc`

`node ./dist/server/server.js`

### Second step - Spin up the CLIENT 

Let's now clone the client, that provides the UI for the user on `localhost:3000/`. Open another tab on the Terminal and run:

`git clone https://github.com/olserra/wiliot-exercise`

Then run the follow commands:

`cd wiliot-exercise/`

`yarn install`  

`yarn start` 

To Run Test Suite:  

`yarn test`  

### Third step - Shut down the CLIENT and the SERVER

On both terminal tabs press:

`Crtl + C` to stop them.
