
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BackgroundEffects from '@/components/BackgroundEffects';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Wallet, ChevronRight } from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import Header from '@/components/Header';
import TransactionHistory from '@/components/TransactionHistory';
import { Switch } from '@/components/ui/switch';

const transactions = [
  {
    id: 1,
    amount: 3000000,
    amountCBK: 12000,
    description: 'Thưởng dự án LYNK',
    date: '15/06/2023',
    isPositive: true
  },
  {
    id: 2,
    amount: 500000,
    amountCBK: 2000,
    description: 'Thưởng dự án Oracler',
    date: '22/05/2023',
    isPositive: true
  }
];

const Portfolio: React.FC = () => {
  const [totalAssets, setTotalAssets] = useState(10200000);
  const [isCbkMode, setIsCbkMode] = useState(false);
  const CBK_RATE = 25; // 1 CBK = 25 VND

  // Increase totalAssets by 25 every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalAssets(prevTotal => prevTotal + 25);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const toggleCurrency = () => {
    setIsCbkMode(!isCbkMode);
  };

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
            <h1 className="text-xl font-medium text-gray-800">Portfolio Overview</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">VND</span>
              <Switch 
                checked={isCbkMode} 
                onCheckedChange={toggleCurrency}
              />
              <span className="text-sm text-gray-500">$CBK</span>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 bg-white rounded-lg border border-[#E0E0E0] p-6 shadow-sm"
          >
            <p className="text-gray-500 text-sm mb-2">Total Assets</p>
            <h2 className="text-4xl font-bold text-gray-800 mb-1">
              {isCbkMode 
                ? <>{formatNumber(totalAssets / CBK_RATE)} <span className="text-3xl">$CBK</span></>
                : <>{formatNumber(totalAssets / CBK_RATE)} <span className="text-3xl">$CBK</span></>
              }
            </h2>
            <p className="text-gray-500 text-xs">
              {isCbkMode 
                ? `${formatNumber(totalAssets)}đ` 
                : `${formatNumber(totalAssets)}đ`
              }
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <Button 
              className="w-full py-6 text-base font-medium bg-[#3D88CF] hover:bg-[#3678B5] text-white"
              asChild
            >
              <Link to="/portfolio-details" className="flex justify-between items-center">
                <div className="flex items-center">
                  <Wallet className="mr-2 h-5 w-5" />
                  View Asset Details
                </div>
                <ChevronRight className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-4"
          >
            <TransactionHistory 
              transactions={transactions} 
              isCbkMode={isCbkMode} 
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Portfolio;
