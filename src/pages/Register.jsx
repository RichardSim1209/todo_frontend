import { useState, useContext, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { storeContext } from "../context/storeContext";
import { toast } from "react-toastify";
import Spinner from "../layout/Spinner";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const { isLoading, setIsLoading, apiUrl } = useContext(storeContext);

  const navigate = useNavigate();

  // helper to clear form inputs
  function clearForm() {
    setEmailInput("");
    setPasswordInput("");
  }

  async function registerUser() {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailInput, password: passwordInput }),
      });
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message[0].msg);
        toast.error(data.message);
        setIsLoading(false);
        return;
      }
      toast.success("Registration successful! Please login to continue.");

      // Reset form fields immediately
      setIsLoading(false);
      clearForm();

      // Redirect to login page after successful registration
      navigate("/login");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      // toast.error("An error occurred. Please try again.");
    } finally {
      // make sure fields are cleared even if request fails
      clearForm();
    }
  }

  function summitHandler(e) {
    e.preventDefault(); // Prevent default form submission behavior
    registerUser(); // Call the async function to handle registration
    // setIsLoading(true);
  }

  function toggle() {
    setShowPassword((prev) => !prev);
  }

  // automatically hide password after 5 seconds if shown
  useEffect(() => {
    let timer;
    if (showPassword) {
      timer = setTimeout(() => setShowPassword(false), 5000);
    }
    return () => clearTimeout(timer);
  }, [showPassword]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-primary sm:text-3xl">
            Register on our Todo App
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Register to start make a reservation on our Todo App.
          </p>

          <form
            onSubmit={summitHandler}
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <p className="text-center text-lg font-medium">
              Create an account with us today
            </p>

            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  type="email"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  required
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gold-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  required
                />

                <span
                  className="absolute inset-y-0 end-0 grid place-content-center px-4"
                  onClick={toggle}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white"
            >
              Sign Up
            </button>

            <p className="text-center text-sm text-gray-500">
              Have an account?{" "}
              <Link className="underline" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
export default Register;
