import{useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {addUser} from "../utils/userSlice";
import {useNavigate} from "react-router-dom";
import {Base_Url} from "../constants";

const Login = () => {
  const [emailId,setEmailId]=useState("adarsh@gmail.com");
  const [password,setPassword]=useState("Adarsh@123");
  const dispatch=useDispatch();
  const navigate=useNavigate();
const handleLogin = async ()=>{
  try{
  const res=await axios.post(Base_Url+"/login",
    {emailId,password},{withCredentials:true});
    dispatch(addUser(res.data));
    return navigate("/");
  }
  catch(err){
    console.log(err.message);
  }
}
  return (
     <div className="flex items-center justify-center min-h-screen bg-base-100 p-4">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md transform -translate-y-20">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              value={emailId}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
              placeholder="you@example.com"
              onChange={(e)=>setEmailId(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              value={password}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
              placeholder="••••••••"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
 <div className="flex justify-center">
            <button onClick={handleLogin}
              type="button" 
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition shadow-sm"
            >
              Sign In
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          No account? <a href="#" className="text-blue-600 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;