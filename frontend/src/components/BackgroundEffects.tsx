
import React from 'react';
import { motion } from 'framer-motion';

const BackgroundEffects: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      {/* Darker black background */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Pattern overlay */}
      <div 
        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNmMWYxZjEiIGQ9Ik0zNiAzNGgyLTJ6TTM4IDM0aDJ2MmgtMnoiLz48cGF0aCBkPSJNNDAgMzRoMnYyaC0yem0yIDBoMnYyaC0yem0yIDBoMnYyaC0yem0yIDBoMnYyaC0yem0yIDBoMnYyaC0yem0yIDBoMnYyaC0yem0yIDBoMnYyaC0yeiIgZmlsbD0iI2YxZjFmMSIvPjwvZz48L3N2Zz4=')]" 
        style={{ opacity: 0.01 }} 
      />
      
      {/* Glassmorphism floating elements */}
      <div className="absolute w-full h-full">
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            opacity: [0.1, 0.07, 0.1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 15,
            ease: "easeInOut" 
          }}
          className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-white/5 backdrop-blur-md border border-white/10"
        />
        
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            opacity: [0.08, 0.12, 0.08]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 20, 
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-white/5 backdrop-blur-md border border-white/10"
        />
        
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.03, 0.07, 0.03]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 25, 
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-white/5 backdrop-blur-md border border-white/10"
        />
      </div>
    </div>
  );
};

export default BackgroundEffects;
