import React, { useState, useEffect } from 'react';
import { Link, useLocation, Outlet, Navigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import dashboardHome from './dashboardhome.png';
import plant from "./plant.png";
import addPlantIcon from "../Add-plant/Addplanticon.png";
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';
import Logout from '../Logout/Logout';
import axios from 'axios';
import Profile from '../Profile/Profile';

export default function Dashboard() {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [plants, setPlants] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };
                const response = await axios.get('https://green-world-vert.vercel.app/auth/profile', config);
                setUserData(response.data.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching user data:', err);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchPlants = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('https://green-world-vert.vercel.app/plant/userPlants', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setPlants(response.data.plants);
            } catch (error) {
                console.error('Error fetching plants:', error);
            }
        };

        fetchPlants();
    }, []);

    const menuItemVariants = {
        hidden: { x: -50, opacity: 0 },
        visible: (i) => ({
            x: 0,
            opacity: 1,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: "easeOut"
            }
        })
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const renderDashboardContent = () => {
        if (location.pathname === '/dashboard') {
            return (
                <div className={styles.dashboardHome}>
                    <h2>Welcome to Your Dashboard</h2>
                    <div className={styles.statsContainer}>
                        <div className={styles.statCard}>
                            <h3>Total Plants</h3>
                            <p>{plants.length}</p>
                        </div>
                        <div className={styles.statCard}>
                            <h3>Healthy Plants</h3>
                            <p>{plants.filter(plant => plant.health === 'good').length}</p>
                        </div>
                        <div className={styles.statCard}>
                            <h3>Needs Attention</h3>
                            <p>{plants.filter(plant => plant.health !== 'good').length}</p>
                        </div>
                    </div>
                    <div className={styles.quickActions}>
                        <Link to="/dashboard/add-plant" className={styles.actionButton}>
                            Add New Plant
                        </Link>
                        <Link to="/dashboard/plant" className={styles.actionButton}>
                            View All Plants
                        </Link>
                    </div>
                </div>
            );
        }
        return <Outlet />;
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.userProfileSection}>
                    {!loading && userData && (
                        <span className={styles.userName}>{userData.userName}</span>
                    )}
                    <Link to="/dashboard/profile" className={styles.profileLink}>
                        <FaUser className={styles.profileIcon} />
                    </Link>
                </div>
            </div>

            <button
                className={styles.menuButton}
                onClick={toggleSidebar}
                aria-label="Toggle menu"
            >
                {isSidebarOpen ? <FaTimes /> : <FaBars />}
            </button>

            {isSidebarOpen && (
                <div
                    className={`${styles.sidebarOverlay} ${isSidebarOpen ? styles.show : ''}`}
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <motion.div
                className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}
                initial={{ x: -250 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className={styles.sidebarContent}>
                    <motion.div
                        custom={0}
                        variants={menuItemVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <Link
                            to="/dashboard"
                            className={`${styles.menuItem} ${isActive('/dashboard') ? styles.active : ''}`}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <img src={dashboardHome} alt="Dashboard" className={styles.icon} />
                            <span>Dashboard</span>
                        </Link>
                    </motion.div>

                    <motion.div
                        custom={1}
                        variants={menuItemVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <Link
                            to="/dashboard/add-plant"
                            className={`${styles.menuItem} ${isActive('/dashboard/add-plant') ? styles.active : ''}`}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <img src={addPlantIcon} alt="Add Plant" className={styles.icon} />
                            <span>Add plant</span>
                        </Link>
                    </motion.div>

                    <motion.div
                        custom={2}
                        variants={menuItemVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <Link
                            to="/dashboard/plant"
                            className={`${styles.menuItem} ${isActive('/dashboard/plant') ? styles.active : ''}`}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <img src={plant} alt="Plant" className={styles.icon} />
                            <span>Plant</span>
                        </Link>
                    </motion.div>

                    <div className={styles.bottomMenu}>
                        <motion.div
                            custom={4}
                            variants={menuItemVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <Logout />
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            <div className={styles.mainContent}>
                <div className={styles.content}>
                    {renderDashboardContent()}
                </div>
            </div>
        </div>
    );
} 