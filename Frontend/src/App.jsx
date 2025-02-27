import { useState, useEffect } from "react";
import React from "react";
import RegisterForm from "./components/register.jsx";
import LoginForm from "./components/login.jsx";
import Profile from "./components/profile.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBar from "./components/navBar.jsx";

function ErrorPage() {
  return (
    <div className="h-[30vh] flex flex-col justify-evenly items-center">
      <h1 className="text-3xl text-center">404 - Page Not Found</h1>
      <p className="text-lg md:text-2xl text-center">
        The page you are looking for does not exist.
      </p>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <NavBar />
          <div
            className="min-h-screen flex flex-col items-start justify-start bg-gray-100 space-y-6"
            // style={{ backgroundImage: "url('/collageBG.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
          >
            {!user ? (
              <>
              <div className="min-h-screen flex flex-col items-center justify-center">

                <h1 className="text-5xl font-bold pt-14 text-black">
                  Welcome! Please Login
                </h1>

                <LoginForm onLogin={handleLogin} />
              </div>
              </>
            ) : (
              <Profile user={user} onLogout={handleLogout} />
            )}
          </div>
        </>
      ),
    },
    {
      path: "/register",
      element: (
        <>
          <NavBar />
          <div className="min-h-[100vh] min-w-[100vw]">
            <RegisterForm />
          </div>
        </>
      ),
    },
  ]);

  return (
    <RouterProvider router={router}>
      {router.currentRoute ? router.currentRoute.element : <ErrorPage />}
    </RouterProvider>
  );
}

export default App;
