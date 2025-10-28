import { createContext } from "react";
import { socket } from "../lib/socket";

// Creates a React Context for the global WebSocket instance.
export const SocketContext = createContext(socket);
