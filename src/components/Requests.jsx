import axios from "axios";
import { Base_Url } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {

  const requests = useSelector((store) => store.requests);

  const dispatch = useDispatch();

  const fetchRequests = async () => {

    if(requests) return;

    try{

      const res = await axios.get(
        Base_Url + "/user/requests/received",
        { withCredentials:true }
      );
    
      dispatch(addRequests(res.data.data));
      console.log(res.data);

    }

    catch(err){

      console.log(err.response.data);

    }

  };

  useEffect(()=>{

    fetchRequests();

  },[]);
  console.log(requests);
    
  if(!requests) return null;

  // EMPTY STATE
  if(requests.length === 0){

    return (

      <div className="flex flex-col items-center justify-center my-24">

        <h1 className="text-4xl font-bold text-white mb-4">
          No Requests Received
        </h1>

        <p className="text-gray-400 text-lg">
          Connection requests will appear here 🚀
        </p>

      </div>

    );

  }

  return (

    <div className="flex flex-col items-center my-10">

      <h1 className="text-4xl font-bold text-white mb-8">
        Requests Received
      </h1>

      <div className="w-full max-w-2xl space-y-4">

    {requests
  .filter((request) => request?.fromUserId != null)
  .map((request) => {

    const {
      _id,
      firstName,
      lastName,
      photoUrl,
      about,
      age,
      gender
    } = request.fromUserId;

    return (

      <div
        key={_id}
        className="flex items-center justify-between bg-base-200 px-5 py-4 rounded-2xl shadow-lg"
      >

        {/* LEFT SECTION */}
        <div className="flex items-center gap-10">

          {/* IMAGE */}
          <img
            src={
              photoUrl ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="profile"
            className="w-16 h-16 rounded-full object-cover"
          />

          {/* USER INFO */}
          <div>

            <h2 className="text-lg font-bold text-white">
              {firstName} {lastName}
            </h2>

            <p className="text-sm text-gray-400 capitalize">
              {age} • {gender}
            </p>

            {about && (
              <p className="text-sm text-gray-300 mt-1">
                {about}
              </p>
            )}

          </div>

        </div>

        {/* RIGHT BUTTONS */}
        <div className="flex gap-4">

          <button
            className="btn btn-sm bg-red-500 hover:bg-red-600 border-none text-white rounded-lg px-5"
          >
            Reject
          </button>

          <button
            className="btn btn-sm bg-pink-500 hover:bg-pink-600 border-none text-white rounded-lg px-5"
          >
            Accept
          </button>

        </div>

      </div>

    );

})}

      </div>

    </div>

  );

};

export default Requests;