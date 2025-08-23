import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { publicAPI } from "../utils/config";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await publicAPI.post("/auth/login", { email, password });
      const user = res.data.user;
      console.log(user);
      Cookies.set("user", JSON.stringify(user));

      toast.success("Logged in Successfully");
      navigate("/dashboard");
    } catch (error) {
      console.log("error: ", error);
      toast.error("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#F8F4ED]">
      <div className="bg-[#FFFDF9] shadow-lg rounded-2xl p-12 w-full max-w-lg border border-[#E8E2D9]">
        <h1 className="text-[40px] font-semibold mb-8 text-[#4A3F35] text-center font-['Merriweather']">
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit} className="space-y-7">
          <div>
            <label className="block text-lg mb-2 text-[#4A3F35] font-['Quicksand']">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-4 rounded-lg border border-[#DCCFC3] focus:outline-none focus:ring-2 focus:ring-[#A3B18A] font-['Quicksand'] text-[18px]"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-lg mb-2 text-[#4A3F35] font-['Quicksand']">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-4 rounded-lg border border-[#DCCFC3] focus:outline-none focus:ring-2 focus:ring-[#A3B18A] font-['Quicksand'] text-[18px]"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#4A3F35] text-xl"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#A3B18A] text-white font-['Quicksand'] text-[18px] font-semibold py-4 rounded-lg shadow hover:bg-[#7B6F81] transition disabled:opacity-70 flex justify-center items-center"
          >
            Login
          </button>
        </form>

        <p className="text-center text-lg text-[#4A3F35] mt-8 font-['Quicksand']">
          Don’t have an account?{" "}
          <span className="text-[#A3B18A] font-semibold cursor-pointer hover:underline">
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
