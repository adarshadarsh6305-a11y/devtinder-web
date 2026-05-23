import EditProfile from "./EditProfile";
import UserCard from "./UserCard";
import {useSelector} from "react-redux";

const Profile = () => {
const user = useSelector((store) => store.user);
    if(!user) return null;
  return (

 user&&(<div className="flex justify-center mt-1 mb-10">

      <EditProfile user={user}/>
    </div>
   
 )
  );

};

export default Profile;