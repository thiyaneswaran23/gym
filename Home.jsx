import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function HomePage() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    dob: "",
    height: "",
    weight: "",
    bmi: "",
    goal: "",
    injuries: ""
  });

  const navigate = useNavigate();


  const calculateBMI = (height, weight) => {
    if (height && weight) {
      return (weight / ((height / 100) ** 2)).toFixed(2);
    }
    return "";
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };

    if (name === "height" || name === "weight") {
      updatedFormData.bmi = calculateBMI(updatedFormData.height, updatedFormData.weight);
    }

    setFormData(updatedFormData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/home", formData);
      if (response.status === 201) {
        navigate("/success");
      }
    } catch (error) {
      console.error("Error submitting data:", error.response?.data || error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Health Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              placeholder="Enter your age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="input-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Height (cm)</label>
            <input
              type="number"
              name="height"
              placeholder="Enter your height in cm"
              value={formData.height}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Weight (kg)</label>
            <input
              type="number"
              name="weight"
              placeholder="Enter your weight in kg"
              value={formData.weight}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>BMI</label>
            <input
              type="text"
              name="bmi"
              value={formData.bmi}
              readOnly
              placeholder="BMI will be calculated"
            />
          </div>

          <div className="input-group">
            <label>Goal</label>
            <select name="goal" value={formData.goal} onChange={handleChange} required>
              <option value="">Select Your Goal</option>
              <option value="WeightLoss">Weight Loss</option>
              <option value="Fitness">Fitness</option>
              <option value="WeightTraining">Weight Training</option>
            </select>
          </div>

          <div className="input-group">
            <label>Injuries (if any)</label>
            <textarea
              name="injuries"
              placeholder="Mention any injuries (optional)"
              value={formData.injuries}
              onChange={handleChange}
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default HomePage;
