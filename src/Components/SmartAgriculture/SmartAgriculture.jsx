import React from 'react';
import { motion } from 'framer-motion';
import './SmartAgriculture.css';

const SmartAgriculture = () => {
  return (
    <div className="smart-agriculture-container">
      <motion.div
        className="smart-agriculture-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="title">Smart agriculture is in your hands</h1>
        <p className="description">
          We provide you with a smart application that helps you choose the right plant for your geographical
          location by automatically determining the local weather.
        </p>
        <p className="description">
          You can also upload a picture of any plant to get its name, or find out the diseases that afflict it and
          suggest the appropriate treatment using artificial intelligence.
        </p>
      </motion.div>
    </div>
  );
};

export default SmartAgriculture;