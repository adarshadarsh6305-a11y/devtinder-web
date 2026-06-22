import {Base_Url} from "../constants";
import io from "socket.io-client";

export const createSocket=()=>{
    return io(Base_Url);
}