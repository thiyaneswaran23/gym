import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Login.css"; 

function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/signin', {
                email: email,
                password: password
            });

            if (response.status === 200) {
               
                navigate("/home");
            } else {
               
                navigate("/signup");
            }
        } catch (error) {
            setError(error.response?.data.message || "Error signing in");
            console.error("Error signing in:", error.response?.data || error.message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Sign In</button>
                    {error && <p className="error-text">{error}</p>}
                </form>
                <p className="signup-text">
                    Don't have an account? 
                    <button className="signup-btn" onClick={() => navigate("/signup")}>
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Signin;
