import app from "./app";
require("dotenv").config();

//----PORT----//
const PORT = process.env.PORT || 3000; //process.env.PORT is used to get the port number from the environment variable. If it is not available, then the default port is 3000.
app.listen(PORT, () => {
  console.log(`Serving @ http://localhost:${PORT}`);
}); //listen is used to start web server and listens for incoming HTTP requests on a specific port.
