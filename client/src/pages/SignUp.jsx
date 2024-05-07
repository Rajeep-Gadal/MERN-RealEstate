import React from "react";

const SignUp = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          id="username"
          required
        />
        <input
          type="email"
          placeholder="Enter your Email"
          className="border p-3 rounded-lg"
          id="email"
          required
        />
        <input
          type="password"
          placeholder="Create a Password"
          className="border p-3 rounded-lg"
          id="password"
          required
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80">
          Sign Up
        </button>
      </form>
      <div className="flex gap-2 mt-5">
          <p>Have an account?</p>
          <span className="text-blue-700">Sign In</span>
        </div>
    </div>
  );
};

export default SignUp;
