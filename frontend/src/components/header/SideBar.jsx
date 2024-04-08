import { useLocalStorage } from "../../utils/hooks";
import { logout } from "../../utils/redux/loginSlice";
import { useDispatch , useSelector} from "react-redux";
import { useSideBarContext } from "../../utils/context/SideBarContext";
import user from "../../../assets/images/User.png";
import { useNavigate } from "react-router-dom";

function ProfileSideBar() {
  const { closeSideBar } = useSideBarContext();
  const dispatch = useDispatch();
  const [setToLocalStorage, removeFromLocalStorage] = useLocalStorage();
  const navigate = useNavigate();
  const name = useSelector((state) => state.userData?.name);

  function handleLogOut() {
    dispatch(logout());
    removeFromLocalStorage(["login", "loginToken"]);
    closeSideBar();
    navigate("/");
  }

  return (
    <>
      <div
        className="fixed z-10 w-full h-[100vh] top-0 left-0 bottom-0 right-0 bg-black/30"
        onClick={closeSideBar}
      ></div>

      <div className="w-80 fixed z-20 top-0 right-0 bg-white p-4">
        <div className="flex justify-between border-b-[1px] border-black/20 pb-4">
          <h1 className="font-semibold">Hey! {name?.length>0?name:"User"}</h1>
          <img className="w-8" src={user} alt="default user img"></img>
        </div>

        <ul className="flex flex-col">
          <li
            className="p-4 border-b-[1px] border-black/20 text-sm cursor-pointer hover:bg-slate-100"
            onClick={() => {
              navigate("/watchlist");
            }}
          >
            Watch List
          </li>

          <li className="p-4 border-b-[1px] border-black/20 text-sm cursor-pointer hover:bg-slate-100">
            Your Orders
          </li>
          <li className="p-4 border-b-[1px] border-black/20 text-sm cursor-pointer hover:bg-slate-100">
            Stream Library
          </li>
          <li className="p-4 border-b-[1px] border-black/20 text-sm cursor-pointer hover:bg-slate-100">
            Play Credit Card
          </li>
          <li className="p-4 border-b-[1px] border-black/20 text-sm cursor-pointer hover:bg-slate-100">
            Help & Support
          </li>
          <li className="p-4 border-b-[1px] border-black/20 text-sm cursor-pointer hover:bg-slate-100">
            Accounts & Settings
          </li>
          <li className="p-4 border-b-[1px] border-black/20 text-sm cursor-pointer hover:bg-slate-100">
            Rewards
          </li>
          <li className="p-4 border-b-[1px] border-black/20 text-sm cursor-pointer hover:bg-slate-100">
            Book A Smile
          </li>
        </ul>

        <button
          className="w-full mt-4 border-[1px] border-red-500 p-2 rounded-md text-red-500 font-semibold text-sm"
          onClick={handleLogOut}
        >
          Log out
        </button>
      </div>
    </>
  );
}

export default ProfileSideBar;
