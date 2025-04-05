
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import BackgroundEffects from '@/components/BackgroundEffects';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle, Sparkles, ArrowRight, Wallet } from 'lucide-react';

const Welcome: React.FC = () => {
  useEffect(() => {
    // Simulate pre-loading app data or configs
    const timer = setTimeout(() => {
      console.log('App data loaded');
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-6">
      <BackgroundEffects />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="backdrop-blur-lg bg-black/50 border border-white/15 shadow-[0_4px_30px_rgba(0,0,0,0.3)] rounded-2xl p-8 md:p-10 text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 50,
              delay: 0.3,
              duration: 0.8 
            }}
            className="mb-6 inline-flex items-center justify-center"
          >
            <div className="relative">
              <CheckCircle size={80} className="text-green-500" />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ 
                  repeat: Infinity,
                  duration: 2,
                  repeatType: "loop"
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Sparkles size={100} className="text-green-400/30" />
              </motion.div>
            </div>
          </motion.div>

          <motion.img 
            src="/logo-1.png" 
            alt="Company Logo" 
            className="mx-auto mb-4 w-16 h-16"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onError={(e) => {
              console.error("Logo failed to load");
              e.currentTarget.style.display = 'none';
            }}
          />
          
          <motion.h1 
            className="text-3xl font-fauna font-light mb-2 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Welcome!
          </motion.h1>
          
          <motion.p 
            className="text-white/70 text-base mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            You have successfully logged in to your account.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-4"
          >
            <Button 
              className="w-full h-12 text-base font-medium bg-red-600 hover:bg-red-500 backdrop-blur-sm text-white transition-all duration-500"
              asChild
            >
              <Link to="/dashboard">
                Continue to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button 
              className="w-full h-12 text-base font-medium bg-black/40 hover:bg-black/60 border border-white/10 backdrop-blur-sm text-white transition-all duration-500"
              asChild
            >
              <Link to="/portfolio">
                <Wallet className="mr-2 h-5 w-5" />
                View Portfolio
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Welcome;
