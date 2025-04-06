import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import BackgroundEffects from '@/components/BackgroundEffects';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Download } from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import Header from '@/components/Header';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

const Portfolio: React.FC = () => {
  const { rewards, loading, fetchRewards, totalAmount } = usePortfolio();
  const { user } = useAuth();

  useEffect(() => {
    const userId = user?.id;
    if (userId && !loading && rewards.length === 0) {
      fetchRewards(Number(userId));
    }
  }, [user?.id, fetchRewards, loading, rewards.length]);

  return (
    <div className="min-h-screen w-full bg-white dark:bg-black">
      <Header />
      
      <div className="pt-20 max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-medium text-gray-800 dark:text-gray-200">
              Portfolio Overview
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
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <div className="rounded-md overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm">
              <Table>
                <TableHeader className="bg-gray-50 dark:bg-gray-900">
                  <TableRow className="hover:bg-gray-100 dark:hover:bg-gray-800">
                    <TableHead className="text-gray-500 dark:text-gray-400 font-medium">Project</TableHead>
                    <TableHead className="text-gray-500 dark:text-gray-400 font-medium text-right">Amount</TableHead>
                    <TableHead className="text-gray-500 dark:text-gray-400 font-medium text-right">Unlock Date</TableHead>
                    <TableHead className="text-gray-500 dark:text-gray-400 font-medium">Message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : rewards.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8">
                        No rewards found
                      </TableCell>
                    </TableRow>
                  ) : (
                    rewards.slice(0, 4).map((reward) => (
                      <TableRow key={reward.id} className="hover:bg-gray-100 dark:hover:bg-gray-800 border-t border-gray-200 dark:border-gray-800">
                        <TableCell className="font-medium">{reward.projectName}</TableCell>
                        <TableCell className="text-right">
                          <div className="font-medium">
                            {formatNumber(reward.amount)} <span>$CBK</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          {format(new Date(reward.unlockTime), 'dd/MM/yyyy')}
                        </TableCell>
                        <TableCell className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[200px]">
                          {reward.message}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex gap-4"
          >
            <Button 
              className="flex-1 bg-black hover:bg-gray-800 text-white"
              asChild
            >
              <Link to="/portfolio/details">
                View All Assets
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Portfolio;
