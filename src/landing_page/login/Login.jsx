import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        if ( !email || !password ) {
            setError("All fields are required");
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

            const response = await axios.post("http://localhost:3002/login", {
                email,
                password
            },
            {
                withCredentials: true,
            });
            console.log("LOGIN RESPONSE:", response.data);
            setSuccess("Login successful! Redirecting to dashboard...");
            setTimeout(() => {
                window.location.href = "http://localhost:3001";
            }, 1500);
            
        } catch (err) {
            setError(err.response?.data?.message || "Unable to login");
        } finally {
            setLoading(false);
        }
    };

    return ( 
        <div className="login-page">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-4">
                        <div className="card login-card">
                            <div className="card-body p-4">
                                <div className="text-center mb-4">
                                    <img src="media/images/logo.svg" alt="Zerodha Logo" className='login-logo' />
                                    <h2 className="mt-4">
                                        Welcome Back
                                    </h2>
                                    <p className="text-muted mt-2">
                                        Access your portfolio, holdings and trading dashboard.
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
                                <form onSubmit={handleLogin}>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Email
                                        </label>
                                        <input 
                                            type="email" 
                                            className='form-control' 
                                            value={email} 
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                setError("");
                                            }}
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
                                            loading ? "Logging In..." : "Login"
                                        }
                                    </button>
                                </form>
                                <div className="text-center mt-4">
                                    <span className="text-muted">
                                        Don't have an account?
                                    </span>
                                    <Link to={"/signup"} className='ms-2'>
                                        Sign Up
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

export default Login;