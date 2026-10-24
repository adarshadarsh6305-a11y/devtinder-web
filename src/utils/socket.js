import { Base_Url } from "../constants";
import io from "socket.io-client";

export const createSocket = () => {
return io(
window.location.hostname === "localhost"
? Base_Url
: "https://devtinder-fy18.onrender.com",
{
withCredentials: true,
}
);
};