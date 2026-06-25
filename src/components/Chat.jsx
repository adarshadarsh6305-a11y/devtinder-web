import { useLocation,useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { createSocket } from "../utils/socket";
import { useSelector } from "react-redux";

import axios from "axios";
import { Base_Url } from "../constants";

const Chat = () => {
  const { toUserId } = useParams();
  const location = useLocation();
  const toUser=location.state;

  const socketRef = useRef(null);

  const [newMessage, setNewMessage] = useState("");

  const [messages,setmessages] = useState([]); 

  const [isTargetUserOnline, setIsTargetUserOnline] = useState(false);

  const user=useSelector((store)=>store.user);
  const userId=user?._id;
  const firstName=user?.firstName;
  const lastName=user?.lastName;



  const chatMessages = async ()=>{
    const res=await axios.get(Base_Url+"/chat/"+toUserId,{withCredentials:true});
    console.log(res.data);
    const chatData= res?.data?.chat?.messages.map((msg)=>{
      return {
         userId: msg.fromUserId._id,
        firstName:msg.fromUserId.firstName,
              lastName:msg.fromUserId.lastName,
              text:msg.text
      };
    }
    );
    setmessages(chatData);
  
  }
  useEffect(()=>{
    chatMessages();
  },[toUserId]);

  useEffect(() => {
  if (!userId) return;

  socketRef.current = createSocket();

  socketRef.current.emit("joinChat", { userId, toUserId });

  socketRef.current.on("recievedMessage", ({ userId, firstName, lastName, text }) => {
    setmessages((messages) => [...messages, { userId, firstName, lastName, text }]);
  });

  socketRef.current.on("onlineUsersInChat", (onlineUsers) => {
    setIsTargetUserOnline(onlineUsers.includes(toUserId));
  });

  return () => {
    socketRef.current.disconnect();
  };
}, [userId, toUserId]);
      
    


 const sendMessage = () => {
  const text = newMessage.trim();
  if (!text) return;

  socketRef.current.emit("sendMessage", {
    userId,
    toUserId,
    firstName,
    lastName,
    text
  });

  setNewMessage("");
};

 return (
  <div className="w-3/4 mx-auto mt-10 mb-20 border border-gray-700 rounded-lg">

    {/* Header */}
    <div className="p-4 border-b border-gray-700 bg-base-300 rounded-t-lg flex items-center justify-between">
      
      <h2 className="font-bold text-xl">
       {toUser?.firstName}  {toUser?.lastName}
      </h2>

      <div className="flex items-center gap-2">
        <span
          className={`w-3 h-3 rounded-full ${
            isTargetUserOnline ? "bg-green-500" : null
          }`}
        ></span>

        <span className="text-sm text-gray-300">
          {isTargetUserOnline ? "Online" : null}
        </span>
      </div>

    </div>

    {/* Messages */}
    <div className="h-[500px] overflow-y-auto p-5 bg-base-200 space-y-2">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`chat ${
            msg.userId === userId ? "chat-end" : "chat-start"
          }`}
        >
          {/* <div className="chat-header text-xs text-gray-400 mb-1">
            {`${msg.firstName} ${msg.lastName}`}
          </div> */}

          <div
            className={`chat-bubble ${
              msg.userId === userId ? "chat-bubble-primary" : ""
            }`}
          >
            {msg.text}
           
          </div>
        </div>
      ))}
    </div>

    {/* Input */}
    <div className="p-4 border-t border-gray-700 flex gap-3">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
        className="input input-bordered w-full"
      />

      <button
        onClick={() => sendMessage()}
        className="btn btn-primary rounded-xl px-4 font-semibold shadow-md"
      >
        Send
      </button>
    </div>

  </div>

)};
export default Chat;
