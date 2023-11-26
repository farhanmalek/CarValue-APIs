"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
//----PORT----//
const PORT = 4000;
app_1.default.listen(PORT, () => {
    console.log(`Serving @ http://localhost:${PORT}`);
}); //listen is used to start web server and listens for incoming HTTP requests on a specific port.
