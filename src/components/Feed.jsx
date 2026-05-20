import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {Base_Url} from "../constants";
import axios from "axios";
import {useEffect} from "react";
import UserCard from "./UserCard";
import {addFeed} from "../utils/feedSlice";

const Feed = () =>{
   const dispatch=useDispatch();
    const feed=useSelector((store)=>store.feed);
    const fetchFeed=async ()=>{
    if(feed?.length > 0) return;
        try{
          const res=await axios.get(Base_Url+"/feed",
    {withCredentials:true},);
    console.log(res.data);
    dispatch(addFeed(res.data));
    
          }
        catch(err){
            console.log(err);
        }
    };
    useEffect(()=>{
        fetchFeed();
    },[]);

    return(
        <>
        
  <div className="flex justify-center pt-6 pb-20">

  {feed?.length > 0 && (
    <UserCard feed={feed[0]} />
  )}

</div>
     </>
    );

}
 export default Feed;