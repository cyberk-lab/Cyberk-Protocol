import React from 'react';
import { motion } from 'framer-motion';
import { formatNumber } from '@/lib/utils';

interface PortfolioHeaderProps {
  totalAmount: number;
  title: string;
}

export const PortfolioHeader: React.FC<PortfolioHeaderProps> = React.memo(({ totalAmount, title }) => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-medium text-gray-800 dark:text-gray-200">
          {title}
        </h1>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 bg-gray-50 dark:bg-gray-900 rounded-md p-6 shadow-sm"
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">Total $CBK</p>
            <h2 className="text-3xl font-bold fauna-title mb-1">
              {formatNumber(totalAmount)} <span className="text-3xl">$CBK</span>
            </h2>
          </div>
        </div>
      </motion.div>
    </>
  );
}); 