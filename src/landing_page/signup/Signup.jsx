import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

function Signup() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        if (!username || !email || !password) {
            setError("All fields are required");
            return;
        }
        if (username.trim().length < 3) {
            setError("Username must contain at least 3 characters");
            return;
        }
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }
        try {
            setLoading(true);

            await axios.post("https://zerodha-stock-trading-app-backend.onrender.com/register", {
                username,
                email,
                password
            },
            {
                withCredentials: true,
            });
            setSuccess("Account created successfully! Redirecting to login...");
            setUsername("");
            setEmail("");
            setPassword("");
            
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } catch (err) {
            setError(err.response?.data?.message || "Unable to create account");
        } finally {
            setLoading(false);
        }
    };

    return ( 
        <div className="signup-page">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5">
                        <div className="card signup-card">
                            <div className="card-body p-4">
                                <div className="text-center mb-4">
                                    <img src="media/images/logo.svg" alt="Zerodha Logo" className='signup-logo' />
                                    <h2 className="mt-4">
                                        Open your account
                                    </h2>
                                    <p className="text-muted mt-2">
                                        Invest in stocks, derivatives, mutual funds and more.
                                    </p>
                                </div>
                                {error && (
                                    <div className="alert alert-danger">
                                        {error}
                                    </div>
                                )}
                                {success && (
                                    <div className="alert alert-success">
                                        {success}
                                    </div>
                                )}
                                <form onSubmit={handleSignup}>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Username
                                        </label>
                                        <input 
                                            type="text" 
                                            className='form-control' 
                                            value={username} 
                                            onChange={(e) => {setUsername(e.target.value); setError("");}}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Email
                                        </label>
                                        <input 
                                            type="email" 
                                            className='form-control' 
                                            value={email} 
                                            onChange={(e) => {setEmail(e.target.value); setError("");}}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label">
                                            Password
                                        </label>
                                        <input 
                                            type="password" 
                                            className='form-control' 
                                            value={password} 
                                            onChange={(e) => {setPassword(e.target.value); setError("");}}
                                        />
                                    </div>
                                    <button type='submit' className='btn btn-primary w-100' disabled={loading}>
                                        {
                                            loading ? "Signing Up..." : "Sign Up"
                                        }
                                    </button>
                                </form>
                                <div className="text-center mt-4">
                                    <span className="text-muted">
                                        Already have an account?
                                    </span>
                                    <Link to={"/login"} className='ms-2'>
                                        Login
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Signup;