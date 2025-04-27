import React, { useState, useEffect } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import styles from './Dashboard.module.css';
import dashboardHome from './dashboardhome.png';
import plant from "./plant.png";
import addPlantIcon from "../Add-plant/Addplanticon.png";
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';
import Logout from '../Logout/Logout';
import axios from 'axios';

export default function Dashboard() {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

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
                <motion.div
                    className={styles.dashboardHome}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        className={styles.welcomeText}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <motion.h1>
                            {Array.from("An Exciting Journey Around The Planet").map((char, index) => (
                                <motion.span
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: index * 0.05
                                    }}
                                    style={{
                                        display: "inline-block",
                                        marginRight: char === " " ? "8px" : "1px"
                                    }}
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </motion.h1>
                    </motion.div>
                </motion.div>
            );
        }
        return <Outlet />;
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.userProfileSection}>
                    <span className={styles.userName}>shreef</span>
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

            <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
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
            </div>

            <div className={styles.mainContent}>
                {renderDashboardContent()}
            </div>
        </div>
    );
} 