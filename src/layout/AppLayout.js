import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AppLayout.css';
import { getOrganizations, logout } from '../services/ApiService';
import {MdiPencil} from '../components/EditIcon'
const AppLayout = ({ children }) => {
    const [organizations, setOrganizations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const orgs = await getOrganizations();
                setOrganizations(orgs);
            } catch (error) {
                console.error('Error loading organizations:', error.message);
                if (error.message === 'Authentication token not found') {
                    navigate('/login', { state: { error: 'Please log in to view organizations.' } });
                } else {
                    setError(error.message || 'Failed to load organizations. Please try again.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    const handleLogout = () => {
        logout();
        navigate('/', { state: { message: 'You have been logged out.' } });
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger m-4" role="alert">
                {error}
                <button
                    className="btn btn-link"
                    onClick={() => window.location.reload()}
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="d-flex flex-column w-100 m-0 min-vh-100">
            <header className="w-100">
                <nav className="navbar navbar-light bg-light shadow px-3">
                    <div className="d-flex align-items-center">
                        <svg
                            className="svg me-2"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="#3a8bbb"
                            width="30"
                            height="30"
                            aria-label="MedicarePro Logo"
                        >
                            <path d="M12 7V3H2v18h20V7zM6 19H4v-2h2zm0-4H4v-2h2zm0-4H4V9h2zm0-4H4V5h2zm4 12H8v-2h2zm0-4H8v-2h2zm0-4H8V9h2zm0-4H8V5h2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8zm-2-8h-2v2h2zm0 4h-2v2h2z" />
                        </svg>
                        <a className="brandName" href="/">
                            MedicarePro
                        </a>
                    </div>
                    <button
                        className="logout"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </nav>
            </header>

            <main className="w-100 px-4 py-3 flex-grow-1">
                <div>
                <p className="text-start mb-3">Layout wrapper is rendering outlet content</p>
                </div>
                <div className='d-flex flex-row justify-content-between'>
                <h4 className="mb-4">Organizations</h4>
                <button className='createButton' onClick={()=> navigate('/organizations/create')}>Add Organizations</button>
                </div>
                {organizations.length === 0 ? (
                    <p className="text-muted">No organizations found.</p>
                ) : (
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {organizations.map(org => (
                            <div className="col" key={org.id}>
                                <div className="card shadow-lg h-100">
                                    <div className="card-body position-relative">
                                       <div className='d-flex flex-row justify-content-between'>
                                       
                                        <h5 className="card-title">{org.name || 'Unnamed Organization'}</h5>
                                        <button
                                            className="btn "
                                            onClick={() => navigate(`/organizations/:id`)}
                                        >
                                            <MdiPencil/>
                                        </button>
                                       </div>
                                        <p className="card-text text-muted">
                                            {org.description || 'No description available'}
                                        </p>
                                        <p className="mb-1">
                                            {org.email || 'N/A'}
                                        </p>
                                        <p className="mb-0">
                                            {org.location || 'N/A'}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                )}

                {children}
            </main>
        </div>
    );
};

export default AppLayout;