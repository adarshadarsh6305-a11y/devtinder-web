import Navbar from "./Navbar";
import Footer from "./Footer";
import {Outlet} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {Base_Url} from "../constants";
import axios from "axios";
import {useEffect} from "react";


import {useNavigate} from "react-router-dom";
import {addUser} from "../utils/userSlice";

const Body = () =>{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const user=useSelector((store)=>store.user);

    const fetchUser=async ()=>{
    if(user) return;
        try{
          const res=await axios.get(Base_Url+"/profile/view",
    {withCredentials:true},);
    dispatch(addUser(res.data));
    console.log(res.data);
          }
        
        catch(err){
            if(err.status===401){
               navigate("/login");
            }
            console.log(err);
        }

    };
    useEffect(()=>{
        fetchUser();
    },[]);
    
    return(
     <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
     </div>
    
    );
}
 export default Body;