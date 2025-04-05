
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SwapForm from '@/components/SwapForm';

const Swap: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-white">
      <Header />
      
      <div className="pt-20 max-w-md mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-xl font-medium text-gray-800">Swap $CBK to USDT</h1>
              <p className="text-gray-600 mt-1">
                Exchange your $CBK tokens for USDT
              </p>
            </div>
          </div>
          
          <Card className="mb-6 border border-[#E0E0E0] shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-gray-800">Swap Tokens</CardTitle>
            </CardHeader>
            <CardContent>
              <SwapForm />
            </CardContent>
          </Card>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button 
              variant="outline"
              className="w-full border-gray-300 hover:bg-gray-100"
              asChild
            >
              <Link to="/portfolio">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Portfolio
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Swap;
