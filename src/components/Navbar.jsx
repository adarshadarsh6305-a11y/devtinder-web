import { useSelector } from "react-redux";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Base_Url} from "../constants";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {removeUser} from "../utils/userSlice";
import {removeFeed} from "../utils/feedSlice";


const Navbar = () => {

  const user = useSelector((store) => store.user);
  const navigate=useNavigate();
  const dispatch=useDispatch();

  //console.log(user);
  const handleLogout= async ()=>{
    await axios.post(Base_Url+"/logout",{},{withCredentials:true});
    dispatch(removeUser());
    dispatch(removeFeed());

    navigate("/login");
  };

  return (

    <div className="navbar bg-base-300 shadow-sm">

      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          DevTinder
        </Link>
      </div>

      {user && (

        <div className="flex items-center gap-3 mr-5">

          <h1 className="font-semibold">
            Welcome {user?.lastName}
          </h1>

          <div className="dropdown dropdown-end">

            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >

              <div className="w-10 rounded-full">

                <img
                  alt="profile"
                  src={user?.photoUrl}
                />

              </div>

            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >

              <li><Link to="/profile" >Profile</Link></li>

              <li><a>Settings</a></li>

              <li onClick={handleLogout}><a>Logout</a></li>

            </ul>

          </div>

        </div>

      )}

    </div>

  );

};

export default Navbar;