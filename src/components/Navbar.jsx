import { useSelector } from "react-redux";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Base_Url} from "../constants";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {removeUser} from "../utils/userSlice";
import {removeFeed} from "../utils/feedSlice";
import {removeConnections} from "../utils/connectionSlice";
import {removeRequests} from "../utils/requestSlice";





const Navbar = () => {

  const user = useSelector((store) => store.user);
  const navigate=useNavigate();
  const dispatch=useDispatch();

  //console.log(user);
  const handleLogout= async ()=>{
    await axios.post(Base_Url+"/logout",{},{withCredentials:true});
    dispatch(removeUser());
    dispatch(removeFeed());
    dispatch(removeConnections());
    dispatch(removeRequests());


    navigate("/login");
  };


  return (

    <div className="navbar bg-base-300 shadow-sm">

      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
           🧑‍💻 DevTinder
        </Link>
      </div>

      {user && (

        <div className="flex items-center gap-3 mr-5">

          <h1 className="font-semibold">
            Welcome, {user?.lastName}
          </h1>

          <div className="dropdown dropdown-end">

            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >

             <div className="w-10 h-10 rounded-full overflow-hidden">

  <img
    alt="profile"
    src={user.photoUrl}
    className="w-full h-full object-cover"
  />

</div>

            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >

              <li><Link to="/profile" >Profile</Link></li>

              <li><Link to="/connections">Connections</Link></li>

              <li><Link to="/requests">Requests</Link></li>

              <li><Link to="/payments">Payments</Link></li>

              <li onClick={handleLogout}><a>Logout</a></li>

               

            </ul>

          </div>

        </div>

      )}

    </div>

  );

};

export default Navbar;