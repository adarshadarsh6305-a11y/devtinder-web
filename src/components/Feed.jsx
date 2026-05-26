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
if(!feed) return;
if(feed.length<=0){
    return (<div className="flex justify-center text-3xl my-10">

No New Users Found
    </div>)
}
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