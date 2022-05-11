import { createContext } from "react";

const Context = createContext({
  handleConnect: () => {},
  handleDisconnect: () => {},
  connected: false,
});
export default Context;
