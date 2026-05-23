import { useState } from "react";
import {useEffect} from "react";
import UserCard from "./UserCard";
import {useDispatch} from "react-redux";
import {addUser} from "../utils/userSlice";
import axios from "axios";
import { Base_Url } from "../constants";




const EditProfile = ({user}) => {

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [skills, setSkills] = useState(user?.skills || []);

  const [toast,setToast]= useState(false);
  const dispatch=useDispatch();

useEffect(() => {

    if(user){

      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setPhotoUrl(user.photoUrl || "");
      setAge(user.age || "");
      setGender(user.gender || "");
      setAbout(user.about || "");
      setSkills(user.skills || []);

    }

  }, [user]);

  const saveProfile=async ()=>{
    try{

    
    const res= await axios.patch(Base_Url+"/profile/edit",
      {firstName,
    lastName,
    about,
    age,
    gender,
    photoUrl,
    skills},
    {withCredentials:true}
     );
     dispatch(addUser(res.data?.data));
     setToast(true);
     setTimeout(()=>{
      setToast(false);
     },3000);
    }
    catch(err){
     
  console.log(err.response.data);

    }
  }

  return (
    <>
<div className="flex justify-center items-start gap-8 py-8">
       
    <div className="card bg-base-300 w-[430px] shadow-2xl border border-base-100">

      <div className="card-body space-y-4">

        {/* Top Section */}
        <div className="flex items-center gap-4 pb-2">

          <img
            src={photoUrl}
            alt="profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-primary shadow-lg"
          />

          <div>

            <h1 className="text-3xl font-bold text-white">
                Edit Profile
            </h1>

            <p className="text-gray-400 text-sm mt-1">
              Update your personal details
            </p>

          </div>

        </div>

        {/* First Name */}
        <div>

          <label className="label">
            <span className="label-text text-gray-300">
              First Name
            </span>
          </label>

          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input input-bordered w-full bg-base-200"
          />

        </div>

        {/* Last Name */}
        <div>

          <label className="label">
            <span className="label-text text-gray-300">
              Last Name
            </span>
          </label>

          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input input-bordered w-full bg-base-200"
          />

        </div>

        {/* Photo URL */}
        <div>

          <label className="label">
            <span className="label-text text-gray-300">
              Photo URL
            </span>
          </label>

          <input
            type="text"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            className="input input-bordered w-full bg-base-200"
          />

        </div>

        {/* Age */}
        <div>

          <label className="label">
            <span className="label-text text-gray-300">
              Age
            </span>
          </label>

          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="input input-bordered w-full bg-base-200"
          />

        </div>

        {/* Gender */}
        <div>

          <label className="label">
            <span className="label-text text-gray-300">
              Gender
            </span>
          </label>

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="select select-bordered w-full bg-base-200"
          >

            <option value="">Select Gender</option>

            <option value="male">Male</option>

            <option value="female">Female</option>

            <option value="other">Other</option>

          </select>

        </div>

        {/* About */}
        <div>

          <label className="label">
            <span className="label-text text-gray-300">
              About
            </span>
          </label>

          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Tell something about yourself..."
            className="textarea textarea-bordered w-full h-28 bg-base-200 resize-none"
          />

        </div>
        {/* Skills */}
<div>

  <label className="label">
    <span className="label-text text-gray-300">
      Skills
    </span>
  </label>

  <input
    type="text"
    value={skills.join(", ")}
    onChange={(e) => setSkills(
      e.target.value.split(",")
    )}
    placeholder="HTML, CSS, React"
    className="input input-bordered w-full bg-base-200"
  />

</div>

        {/* Save Button */}
        <div className="flex justify-center pt-4">

          <button onClick={saveProfile} className="btn btn-primary px-10 text-white rounded-xl shadow-md">
            Save Profile
          </button>

        </div>

      </div>

    </div>
   
    <UserCard feed={{firstName,lastName,age,gender,skills,about,photoUrl}}/>
</div>



{toast&&(
  <div className="toast toast-top toast-center">

  <div className="alert alert-success">
    <span>Profile Saved successfully.</span>
  </div>
</div>
)}
</>
  );

};

export default EditProfile;