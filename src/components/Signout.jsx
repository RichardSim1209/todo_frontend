import { useContext } from "react";
import { storeContext } from "../context/storeContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Signout() {
  const { isAuth, setIsAuth } = useContext(storeContext);

  const navigate = useNavigate();

  function SignOutHandler() {
    // remove token from the localStorage
    localStorage.removeItem("token");
    // set isAuth to false
    setIsAuth(false);
    navigate("/login");
    toast.success("You have successfully signed out");
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-700">
      <div className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-center mb-4">Sign out</h2>
        <p className="text-xl text-center">
          Are you sure you want to sign out?
        </p>
        <div className="flex items-center justify-center mt-4">
          <button
            type="button"
            className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={SignOutHandler}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
export default Signout;
