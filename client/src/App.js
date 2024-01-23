import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Detail from "./pages/Post";
import CreatePost from "./pages/Post/Create";
import Profile from "./pages/Profile";
import UpdateProfile from "./pages/Profile/Update";
import Login from "./pages/Auth";
import Register from "./pages/Auth/Register";


const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
} 

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/post/:id",
        element: <Detail />
      },
      {
        path: "/add-post",
        element: <CreatePost />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/profile/edit/:id/:username",
        element: <UpdateProfile />
      },
    ]
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  },
])

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App;

