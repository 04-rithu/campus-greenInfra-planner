import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaLeaf } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }
        setLoading(true);

        try {
            await register(name, email, password);
            toast.success('Registration successful! Please login.');
            navigate('/user/login');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed.');
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
            background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2560")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '2rem'
        }}>
            <div className="glass-card animate-fade-in" style={{ 
                width: '100%', 
                maxWidth: '500px', 
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
                        <FaLeaf size={30} color="#1b5e20" />
                    </div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#1b5e20', marginBottom: '0.5rem' }}>Join the Movement</h2>
                    <p style={{ color: '#455a64', fontSize: '1rem' }}>Create your eco-account today</p>
                </div>

                <form onSubmit={handleSubmit} className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <div className="form-group" style={{ marginBottom: '1.2rem' }}>
                        <label className="form-label" style={{ fontSize: '0.85rem', color: '#1b5e20' }}>Full Name</label>
                        <input
                            type="text"
                            className="form-input"
                            style={{ backgroundColor: 'rgba(255,255,255,0.8)', border: '1px solid rgba(46, 125, 50, 0.2)' }}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="form-group" style={{ marginBottom: '1.2rem' }}>
                        <label className="form-label" style={{ fontSize: '0.85rem', color: '#1b5e20' }}>Email Address</label>
                        <input
                            type="email"
                            className="form-input"
                            style={{ backgroundColor: 'rgba(255,255,255,0.8)', border: '1px solid rgba(46, 125, 50, 0.2)' }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="user@campus.edu"
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                        <div className="form-group">
                            <label className="form-label" style={{ fontSize: '0.85rem', color: '#1b5e20' }}>Password</label>
                            <input
                                type="password"
                                className="form-input"
                                style={{ backgroundColor: 'rgba(255,255,255,0.8)', border: '1px solid rgba(46, 125, 50, 0.2)' }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" style={{ fontSize: '0.85rem', color: '#1b5e20' }}>Confirm</label>
                            <input
                                type="password"
                                className="form-input"
                                style={{ backgroundColor: 'rgba(255,255,255,0.8)', border: '1px solid rgba(46, 125, 50, 0.2)' }}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                            />
                        </div>
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
                        {loading ? 'Creating Account...' : 'Register as Member'}
                    </button>
                </form>

                <div style={{ marginTop: '2rem', textAlign: 'center', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1.5rem' }}>
                    <p style={{ color: '#607d8b', fontSize: '0.9rem' }}>
                        Already have an account? <Link to="/user/login" style={{ color: '#2e7d32', fontWeight: 700 }}>Login here</Link>
                    </p>
                    <Link to="/" style={{ display: 'block', marginTop: '1rem', color: '#78909c', fontSize: '0.85rem' }}>&larr; Back to Home</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
