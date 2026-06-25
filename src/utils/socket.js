import {Base_Url} from "../constants";
import io from "socket.io-client";

export const createSocket=()=>{
    if(window.location.hostname === "localhost"){
    return io(Base_Url);
    }
    else{
        return io("/",{path:"/api/socket.io"})
    }
}