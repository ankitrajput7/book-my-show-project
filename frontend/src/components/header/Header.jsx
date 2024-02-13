import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import bookmyshow from "../../../assets/images/bookmyshow.jpg";
import user from "../../../assets/images/User.png";
import { getUserDataApi, searchMovieByTextApi } from "../../utils/axios";
import { getUserData } from "../../utils/redux/userData";
import { useSideBarContext } from "../../utils/context/SideBarContext";
import { useLoginContext } from "../../utils/context/LoginContext";
import { Link } from "react-router-dom";
import { useUserCity } from "../../utils/hooks";

function Header() {
  const { openLogin } = useLoginContext();
  const loginState = useSelector((state) => state.login.login);
  const name = useSelector((state) => state.userData?.name);
  const dispatch = useDispatch();
  const { openSideBar } = useSideBarContext();
  const city = useUserCity();

  useEffect(() => {
    if (loginState) {
      getUserDataApi().then((result) => {
        dispatch(getUserData(result.data));
      });
    }
  }, [loginState]);

  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    let timer = setTimeout(() => {
      searchMovie(searchText);
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText]);

  const searchMovie = async (text) => {
    let { data } = await searchMovieByTextApi(text);
    setSearchResult(data?.results);
    console.log(data);
  };

  return (
    <>
      {/* <header className="mt-1 sticky top-0 bg-white z-10"> */}
      <header className="mt-1 relative top-0 bg-white ">
        <div className="flex h-14 justify-between items-center">
          <div className="flex space-x-6 ml-2 items-center relative">
            <Link to={"/"}>
              <img
                className="h-12 cursor-pointer"
                src={bookmyshow}
                alt="logo.jpg"
              ></img>
            </Link>

            <input
              className="border-[1px] border-black/10 outline-none h-8 w-40 px-2 sm:w-64 md:w-96"
              type="text"
              placeholder="search"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            ></input>
          </div>

          {searchResult?.length > 0 && (
            <ul className="fixed w-96 bg-white left-36 top-14 z-10 p-4">
              {searchResult?.map((recomndation) => {
                return (
                  <li className="px-2 text-sm py-[2px]" key={recomndation.id}>
                    {" "}
                    {recomndation.name || recomndation.title}
                  </li>
                );
              })}
            </ul>
          )}

          <div className="flex space-x-4 mr-2 self-center">
            <div className="text-sm self-center">{city}</div>
            {!loginState ? (
              <button
                className="bg-red-500 text-sm p-1 text-white rounded-md px-4 font-medium"
                onClick={() => openLogin("user")}
              >
                Sign in
              </button>
            ) : (
              <div className="flex space-x-2">
                <img
                  className="w-8 pb-2 "
                  src={user}
                  alt="user-image.png"
                ></img>
                <h4
                  className="pb-0 text-sm font-normal cursor-pointer"
                  onClick={() => openSideBar()}
                >
                  {!name ? "Hi, Guest" : name}
                </h4>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-100 h-12 flex justify-center sm:justify-between items-center text-xs lg:text-sm md:text-sm  sm:text-xs">
          <ul className="flex my-2 space-x-2  lg:mr-16 lg:space-x-4 md:ml-10 md:space-x-4 sm:space-x-2 sm:ml-2">
            <Link to={"/movielist"}>Movies</Link>
            <li>Stream</li> <li>Eents</li> <li>Plays</li> <li>Sports</li>
            <li>Activities</li>
          </ul>

          <ul className="sm:flex hidden space-x-2 mr-2 lg:mr-16 lg:space-x-4 md:mr-10 md:space-x-4 sm:mr-2 ">
            <li>ListYourShow</li> <li>Corporates</li> <li>Offers</li>
            <li>Gift Cards</li>
          </ul>
        </div>
      </header>
    </>
  );
}

export default Header;
