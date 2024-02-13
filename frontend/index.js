import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import store from "./src/utils/redux/store";
import { Provider } from "react-redux";
import Header from "./src/components/header/Header";
import Footer from "./src/components/footer/Footer";
import Login from "./src/components/user/Login";
import Register from "./src/components/user/Register";
import Error from "./src/components/Error";
import Home from "./src/components/home/Home";
import MovieCard from "./src/components/home/MovieCard";
import { LoginProvider } from "./src/utils/context/LoginContext";
import { SideBarProvider } from "./src/utils/context/SideBarContext";
import TvSerialCard from "./src/components/home/TvSerialCard";
import MovieList from "./src/components/home/movieList/MovieList";
import { SearchProvider } from "./src/utils/context/SearchContext";
import WatchList from "./src/components/home/WatchList";
import ResetPassword from "./src/components/user/ResetPassword";

const AppLayout = () => {
  return (
    <>
      {" "}
      <SearchProvider>
        <SideBarProvider>
          <LoginProvider>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>{" "}
          </LoginProvider>
        </SideBarProvider>
      </SearchProvider>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout></AppLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/movie/:type/:id",
        element: <MovieCard />,
      },
      {
        path: "/serial/:id",
        element: <TvSerialCard />,
      },
      {
        path: "/movielist",
        element: <MovieList />,
      },
      {
        path: "/watchlist",
        element: <WatchList />,
      },
    ],
  },
  {
    path: "/password_reset",
    element: <ResetPassword />,
  },
]);

const app = ReactDOM.createRoot(document.getElementById("root"));

app.render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);
