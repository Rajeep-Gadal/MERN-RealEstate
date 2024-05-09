import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignIn = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // this is used to help to prevent the event that if a user submit a form it will not refresh the web.

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);

      if (data.success == false) {
        setLoading(false);
        setError(data.message);
        return;
      }

      setLoading(false);
      setError(null);
      navigate("/");
    
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Enter your Email"
          className="border p-3 rounded-lg"
          id="email"
          required
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Create a Password"
          className="border p-3 rounded-lg"
          id="password"
          required
          onChange={handleChange}
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80">
          {loading ? "loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't have an account?</p>
        <Link to={"/sign-up"}>
        <span className="text-blue-700 hover:underline hover:opacity-75">Sign Up</span>
        </Link>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default SignIn;