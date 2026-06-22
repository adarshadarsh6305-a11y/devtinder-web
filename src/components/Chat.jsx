import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { createSocket } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const { toUserId } = useParams();

  const [newMessage, setNewMessage] = useState("");

  const [messages,setmessages] = useState([]); 

  const user=useSelector((store)=>store.user);
  const userId=user?._id;
  const firstName=user?.firstName;

  useEffect(()=>{
    if(!userId) return;
    const socket=createSocket();
    socket.emit("joinChat",{userId,toUserId});


    socket.on("recievedMessage",({firstName,text})=>{
      setmessages((messages)=>[...messages,{firstName,text}]);
    });
      
    

    return ()=>{
        socket.disconnect();
    };
  },[userId,toUserId]);


 const sendMessage=()=>{
  const socket=createSocket();
  const text=newMessage;
  socket.emit("sendMessage",{userId,toUserId,firstName,text});
  setNewMessage("");
 }


  return (
    <div className="w-3/4 mx-auto mt-10 mb-20 border border-gray-700 rounded-lg">
 

      {/* Header */}
      <div className="p-4 border-b border-gray-700 bg-base-300 rounded-t-lg">
        <h2 className="font-bold text-xl">
          Chat             
        </h2>
      </div>

      {/* Messages */}
     <div className="h-[500px] overflow-y-auto p-5 bg-base-200 space-y-2">
{messages.map((msg, index) => (
       
  <div
    key={index}
    className={`chat ${
      msg.firstName === firstName
        ? "chat-end"
        : "chat-start"
    }`}
  >

    <div className="chat-header text-xs text-gray-400 mb-1">
      {msg.firstName}
    </div>

    <div
      className={`chat-bubble ${
        msg.firstName === firstName
          ? "chat-bubble-primary"
          : ""
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

        <button onClick={(()=>sendMessage())} className="btn btn-primary rounded-xl px-4 font-semibold shadow-md">
          Send
        </button>
      </div>

    </div>
  );
};

export default Chat;