import GlobalModel from "app/interfaces/global/GlobalStore";
import MessageStore from "./MessageStore";



const GlobalStore: GlobalModel = {
    message: MessageStore,
  };


  export default GlobalStore;