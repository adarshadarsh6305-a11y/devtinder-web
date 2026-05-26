import axios from "axios";
import { Base_Url } from "../constants";
import { useDispatch } from "react-redux";
import {removeOneFeed} from "../utils/feedSlice";
const UserCard = ({ feed }) => {
const dispatch = useDispatch();
const handleSendRequest = async (status,userId)=>{
try{
  const res=await axios.post(Base_Url+"/request/send/"+status+"/"+userId,{}
    ,{withCredentials:true}
  );
  dispatch(removeOneFeed(userId));
}
catch(err){
  console.log(err);
}
}
  const {
    firstName,
    lastName,
    about,
    age,
    gender,
    photoUrl,
    skills
  } = feed;

  return (

    <div className="card bg-base-300 w-96 shadow-2xl hover:scale-[1.02] transition duration-300">

      <figure>
        <img
          src={photoUrl}
          alt="User"
          className="w-full h-64 object-cover"
        />
      </figure>

      <div className="card-body space-y-4">

        {/* Name + Age */}
      <div>

  <div className="flex items-center gap-2">

    <h1 className="text-4xl font-bold text-white">
      {firstName} {lastName}
    </h1>

    <span className="text-2xl text-gray-300 font-medium">
      {age}
    </span>

  </div>

  <p className="text-gray-400 text-sm mt-1 capitalize">

    {gender}

  </p>

</div>

        {/* About */}
        {about && (

          <p className="text-gray-300 text-base leading-relaxed">

            {about}

          </p>

        )}

        {/* Skills */}
        {skills && (

          <div className="flex flex-wrap gap-2">

            {skills.map((skill, index) => (

              <span
                key={index}
                className="px-3 py-1 bg-white/10 backdrop-blur-sm text-gray-200 rounded-full text-sm"
              >
                {skill}
              </span>

            ))}

          </div>

        )}

        {/* Buttons */}
        <div className="card-actions justify-center gap-4 pt-3">

          <button className="btn bg-green-500 hover:bg-green-600 text-white border-none rounded-xl px-6 font-semibold shadow-md"
          onClick={()=>handleSendRequest("interested",feed._id)}>
            Interested
          </button>

          <button className="btn bg-red-500 hover:bg-red-600 text-white border-none rounded-xl px-6 font-semibold shadow-md"
          onClick={()=>handleSendRequest("ignored",feed._id)}>
            Ignore
          </button>

        </div>

      </div>

    </div>

  );

};

export default UserCard;