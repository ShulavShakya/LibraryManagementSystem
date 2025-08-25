import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { publicAPI } from "../utils/config";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Your passwords donot match");
    }

    if (password.length < 8) {
      toast.error("Password too small");
    }
    try {
      const res = await publicAPI.post("/user/register", {
        name,
        email,
        password,
      });
      const user = res.data.user;
      const token = res.data.data.token;
      console.log(user);
      Cookies.set("user", JSON.stringify(user));
      Cookies.set("token", token);

      toast.success("Registered successfully");
      navigate("/user-dashboard");
    } catch (error) {
      console.log("error: ", error);
      toast.error("Registration Failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#F8F4ED]">
      <div className="bg-[#FFFDF9] shadow-lg rounded-2xl p-12 w-full max-w-lg border border-[#E8E2D9]">
        <h1 className="text-[40px] font-semibold mb-8 text-[#4A3F35] text-center font-['Merriweather']">
          Welcome
        </h1>

        <form onSubmit={handleSubmit} className="space-y-7">
          <div>
            <label className="block text-lg mb-2 text-[#4A3F35] font-['Quicksand']">
              UserName
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-4 rounded-lg border border-[#DCCFC3] focus:outline-none focus:ring-2 focus:ring-[#A3B18A] font-['Quicksand'] text-[18px]"
              placeholder="UserName"
            />
          </div>
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
          <div>
            <label className="block text-lg mb-2 text-[#4A3F35] font-['Quicksand']">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full p-4 rounded-lg border border-[#DCCFC3] focus:outline-none focus:ring-2 focus:ring-[#A3B18A] font-['Quicksand'] text-[18px]"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#4A3F35] text-xl"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#A3B18A] text-white font-['Quicksand'] text-[18px] font-semibold py-4 rounded-lg shadow hover:bg-[#7B6F81] transition disabled:opacity-70 flex justify-center items-center"
          >
            Register
          </button>
        </form>

        <p className="text-center text-lg text-[#4A3F35] mt-8 font-['Quicksand']">
          Already have an account?{" "}
          <button
            className="text-[#A3B18A] font-semibold cursor-pointer hover:text-[#7B6F81]"
            onClick={() => navigate("/")}
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
