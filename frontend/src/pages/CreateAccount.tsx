import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BackgroundEffects from '@/components/BackgroundEffects';
import CreateAccountForm from '@/components/CreateAccountForm';
import { useAuth } from '@/contexts/AuthContext';

const CreateAccount: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/portfolio');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-6 bg-white">
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
          className="bg-white border border-[#E0E0E0] shadow-md rounded-lg p-8 md:p-10"
        >
          <CreateAccountForm />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CreateAccount;
