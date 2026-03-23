import { useState } from "react";
import "./index.css"
import {Link} from "react-router-dom"

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Data:", formData);
    alert("Signup Successful!");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
         
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
         
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          
        />

        <button type="submit" >
          Sign Up
        </button>
        <p>Already have an account <Link to="/">log in </Link></p>
      </form>
    </div>
  );
}



export default Signup;