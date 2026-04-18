import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaTree, FaRecycle, FaWater, FaLeaf, FaUser, FaUserShield, FaArrowRight } from 'react-icons/fa';

const LandingPage = () => {
    const navigate = useNavigate();

    const quotes = [
        { text: "Go Green, Breathe Clean", author: "Earth First" },
        { text: "Sustainability Starts with Us", author: "Eco Vision" },
        { text: "Small Steps Today, Greener Tomorrow", author: "Future Roots" },
        { text: "The earth does not belong to us: we belong to the earth.", author: "Marlee Matlin" },
        { text: "Nature is not a place to visit. It is home.", author: "Gary Snyder" }
    ];

    const features = [
        { 
            icon: <FaRecycle size={40} />, 
            title: "Waste Management", 
            description: "Efficiently track and manage campus waste collection and recycling initiatives." 
        },
        { 
            icon: <FaTree size={40} />, 
            title: "Green Tracking", 
            description: "Monitor campus tree health, trimming schedules, and green cover growth." 
        },
        { 
            icon: <FaWater size={40} />, 
            title: "Smart Watering", 
            description: "Automated and manual watering schedules optimized for campus zones." 
        },
        { 
            icon: <FaLeaf size={40} />, 
            title: "Eco Initiatives", 
            description: "Submit and vote on community suggestions for a greener campus environment." 
        }
    ];

    return (
        <div style={{ backgroundColor: '#f1f8e9', minHeight: '100vh', overflowX: 'hidden' }}>
            {/* Navigation */}
            <nav style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1.5rem 10%',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                position: 'fixed',
                top: 0,
                width: '100%',
                zIndex: 1000,
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <FaTree size={30} color="#2e7d32" />
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1b5e20' }}>EcoPlan</span>
                </div>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <a href="#home" style={{ color: '#1b5e20', fontWeight: 500 }}>Home</a>
                    <a href="#about" style={{ color: '#1b5e20', fontWeight: 500 }}>About</a>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Link to="/user/login" className="btn btn-outline" style={{ color: '#2e7d32', borderColor: '#2e7d32' }}>User Login</Link>
                        <Link to="/admin/login" className="btn btn-primary" style={{ backgroundColor: '#2e7d32' }}>Admin Portal</Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="home" style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                background: 'linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.4)), url("https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2560")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                paddingTop: '70px'
            }}>
                <div className="animate-fade-in" style={{ maxWidth: '800px', padding: '2rem' }}>
                    <h1 style={{ fontSize: '4rem', fontWeight: 800, color: '#1b5e20', marginBottom: '1rem', textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
                        Campus Green Infrastructure
                    </h1>
                    <p style={{ fontSize: '1.5rem', color: '#2e7d32', marginBottom: '2.5rem', fontWeight: 500 }}>
                        Building a Sustainable Future Together
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                        <button onClick={() => navigate('/user/login')} className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', backgroundColor: '#2e7d32', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            Get Started <FaArrowRight />
                        </button>
                        <button onClick={() => navigate('/register')} className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.1rem', borderColor: '#2e7d32', color: '#2e7d32', backgroundColor: 'white' }}>
                            Join Community
                        </button>
                    </div>
                </div>
            </section>

            {/* Quotes Section */}
            <section style={{ padding: '5rem 10%', backgroundColor: 'white' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: '#1b5e20', marginBottom: '1rem' }}>Our Philosophy</h2>
                    <div style={{ width: '80px', height: '4px', backgroundColor: '#81c784', margin: '0 auto' }}></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    {quotes.map((q, i) => (
                        <div key={i} className="card" style={{ 
                            padding: '2.5rem', 
                            textAlign: 'center', 
                            borderBottom: '5px solid #2e7d32',
                            transition: 'transform 0.3s ease',
                            cursor: 'default'
                        }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} 
                           onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                            <FaLeaf color="#2e7d32" size={30} style={{ marginBottom: '1.5rem' }} />
                            <p style={{ fontSize: '1.25rem', fontWeight: 600, color: '#37474f', marginBottom: '1rem', fontStyle: 'italic' }}>
                                "{q.text}"
                            </p>
                            <span style={{ color: '#78909c', fontSize: '0.9rem' }}>— {q.author}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* About / Features Section */}
            <section id="about" style={{ padding: '5rem 10%', backgroundColor: '#f9fbe7' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: '#1b5e20', marginBottom: '1rem' }}>Platform Features</h2>
                    <p style={{ color: '#546e7a', maxWidth: '600px', margin: '0 auto' }}>A comprehensive management system designed to coordinate and track all campus environmental initiatives.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
                    {features.map((f, i) => (
                        <div key={i} style={{ textAlign: 'center' }}>
                            <div style={{ 
                                width: '80px', 
                                height: '80px', 
                                backgroundColor: 'white', 
                                borderRadius: '50%', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                margin: '0 auto 1.5rem',
                                color: '#2e7d32',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                            }}>
                                {f.icon}
                            </div>
                            <h3 style={{ fontSize: '1.5rem', color: '#1b5e20', marginBottom: '1rem' }}>{f.title}</h3>
                            <p style={{ color: '#607d8b', lineHeight: 1.6 }}>{f.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section style={{ 
                padding: '5rem 10%', 
                textAlign: 'center', 
                background: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)',
                color: 'white'
            }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Ready to Make a Difference?</h2>
                <p style={{ fontSize: '1.2rem', marginBottom: '3rem', opacity: 0.9 }}>Join hundreds of students and staff in building a greener campus today.</p>
                <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
                    <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '1rem', width: '300px', backdropFilter: 'blur(5px)' }}>
                        <FaUser size={40} style={{ marginBottom: '1rem' }} />
                        <h3>Student Portal</h3>
                        <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem', opacity: 0.8 }}>View maps, submit suggestions, and see real-time updates.</p>
                        <button onClick={() => navigate('/user/login')} className="btn" style={{ backgroundColor: 'white', color: '#1b5e20', width: '100%' }}>Login as User</button>
                    </div>
                    <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '1rem', width: '300px', backdropFilter: 'blur(5px)' }}>
                        <FaUserShield size={40} style={{ marginBottom: '1rem' }} />
                        <h3>Admin Portal</h3>
                        <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem', opacity: 0.8 }}>Manage zones, schedule maintenance, and respond to suggestions.</p>
                        <button onClick={() => navigate('/admin/login')} className="btn" style={{ backgroundColor: 'white', color: '#1b5e20', width: '100%' }}>Login as Admin</button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ padding: '3rem 10%', backgroundColor: '#1b5e20', color: 'white', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <FaTree size={24} />
                    <span style={{ fontWeight: 'bold' }}>EcoPlan Campus Infrastructure</span>
                </div>
                <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>&copy; 2026 Campus Green Infrastructure Planner. All rights reserved.</p>
                <p style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '0.5rem' }}>v1.2.0-overhaul</p>
            </footer>
        </div>
    );
};

export default LandingPage;
