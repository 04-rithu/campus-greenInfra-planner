import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await login(email, password);
             const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.role === 'user') {
                toast.success('User Login successful!');
                navigate('/user/dashboard');
            } else {
                toast.error('Access Denied: Not a standard user');
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Login failed.';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=2560")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '1rem'
        }}>
            <div className="glass-card animate-fade-in" style={{ 
                width: '100%', 
                maxWidth: '450px', 
                padding: '3rem',
                border: '1px solid rgba(255,255,255,0.2)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{ 
                        width: '70px', 
                        height: '70px', 
                        backgroundColor: 'rgba(46, 125, 50, 0.1)', 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        margin: '0 auto 1.5rem'
                    }}>
                        <FaUser size={30} color="#1b5e20" />
                    </div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#1b5e20', marginBottom: '0.5rem' }}>User Login</h2>
                    <p style={{ color: '#455a64', fontSize: '1rem' }}>Welcome back to the Green Portal</p>
                </div>

                <form onSubmit={handleSubmit} className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label className="form-label" style={{ fontSize: '0.9rem', color: '#1b5e20' }}>Email Address</label>
                        <input
                            type="email"
                            className="form-input"
                            style={{ 
                                backgroundColor: 'rgba(255,255,255,0.8)', 
                                border: '1px solid rgba(46, 125, 50, 0.2)',
                                padding: '0.9rem'
                            }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="user@campus.edu"
                        />
                    </div>

                    <div className="form-group" style={{ marginBottom: '2rem' }}>
                        <label className="form-label" style={{ fontSize: '0.9rem', color: '#1b5e20' }}>Password</label>
                        <input
                            type="password"
                            className="form-input"
                            style={{ 
                                backgroundColor: 'rgba(255,255,255,0.8)', 
                                border: '1px solid rgba(46, 125, 50, 0.2)',
                                padding: '0.9rem'
                            }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ 
                            width: '100%', 
                            padding: '1rem', 
                            fontSize: '1.1rem', 
                            fontWeight: 600,
                            backgroundColor: '#2e7d32', 
                            boxShadow: '0 4px 15px rgba(46, 125, 50, 0.3)',
                            transition: 'all 0.3s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        disabled={loading}
                    >
                        {loading ? 'Authenticating...' : 'Login to Dashboard'}
                    </button>
                </form>

                <div style={{ marginTop: '2rem', textAlign: 'center', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1.5rem' }}>
                    <p style={{ color: '#607d8b', fontSize: '0.9rem' }}>
                        Don't have an account? <Link to="/register" style={{ color: '#2e7d32', fontWeight: 700 }}>Register Now</Link>
                    </p>
                    <Link to="/" style={{ display: 'block', marginTop: '1rem', color: '#78909c', fontSize: '0.85rem' }}>&larr; Back to Home</Link>
                </div>
            </div>
        </div>
    );
};

export default UserLogin;
