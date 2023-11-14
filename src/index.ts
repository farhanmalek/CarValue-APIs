import app from "./app";

//----PORT----//
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Serving Base @ http://localhost:${PORT}`);
}); //listen is used to start web server and listens for incoming HTTP requests on a specific port.
