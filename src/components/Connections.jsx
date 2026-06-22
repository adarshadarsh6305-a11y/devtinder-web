import axios from "axios";
import {Link} from "react-router-dom";
import { Base_Url } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {

  const userConnections = useSelector(
    (store) => store.connections
  );

  const dispatch = useDispatch();

  const fetchConnections = async () => {

     if(userConnections && userConnections.length > 0) return;

    try{

      const res = await axios.get(
        Base_Url + "/user/connections",
        { withCredentials:true }
      );

   

      dispatch(addConnections(res.data.data));

    }

    catch(err){
   console.log(err.response.data);
}

  };

  useEffect(()=>{
    fetchConnections();
  },[]);

if(!userConnections) return;

  if(userConnections?.length === 0){

  return (

    <div className="flex flex-col items-center justify-center my-24 ">

      <h1 className="text-4xl font-bold text-white mb-4">
        No Connections Yet
      </h1>

      <p className="text-gray-400 text-lg">
        Start connecting with developers 🚀
      </p>

    </div>

  );

}

  return (

    <div className="flex flex-col items-center my-10 mb-20">

      <h1 className="text-4xl font-bold text-white mb-8">
        Your Connections
      </h1>

      <div className="w-full max-w-2xl space-y-5">

        {userConnections
  .filter((connection) => connection != null)
  .map((connection) => {

          const {
            _id,
            firstName,
            lastName,
            photoUrl,
            about,
            age,
            gender,
            skills
          } = connection;

          return (

           <div
  key={_id}
  className="flex items-center justify-between bg-base-300 p-5 rounded-3xl shadow-xl hover:scale-[1.02] transition duration-300"
>

  {/* Left Section */}
  <div className="flex items-center gap-5">

    <img
      src={photoUrl}
      alt="profile"
      className="w-20 h-20 rounded-full object-cover"
    />

    <div>

      {/* Name */}
      <h2 className="text-2xl font-bold text-white">
        {firstName} {lastName}
      </h2>

      {/* Age + Gender */}
      {age&&gender&&(<p className="text-sm text-gray-400 mt-1 capitalize">
        {age} • {gender}
      </p>
        )}

      {/* About */}
      {about && (
        <p className="text-gray-300 text-sm mt-2 leading-relaxed">
          {about}
        </p>
      )}

      {/* Skills */}
      {skills?.length > 0 && (

        <div className="flex flex-wrap gap-2 mt-3">

          {skills.map((skill, index) => (

            <span
              key={index}
              className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-200"
            >
              {skill}
            </span>

          ))}

        </div>

      )}

    </div>

  </div>

  {/* Right Section */}
  <Link to={"/chat/"+_id}><button  className="btn btn-primary rounded-xl px-6">
    Message
  </button>
  </Link>

</div>

          );

        })}

      </div>

    </div>

  );

};

export default Connections;