import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BackgroundEffects from '@/components/BackgroundEffects';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Download } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { formatNumber } from '@/lib/utils';
import Header from '@/components/Header';
import WithdrawDialog from '@/components/WithdrawDialog';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { format } from 'date-fns';

const PortfolioDetails: React.FC = () => {
  const [isCbkMode, setIsCbkMode] = useState(false);
  const [userName, setUserName] = useState<string>('');
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<{ name: string; amountCBK: number } | null>(null);
  const { rewards, loading, fetchRewards, totalAmount } = usePortfolio();

  useEffect(() => {
    // Get user name and id from sessionStorage if exists (set in Admin page)
    const storedUserName = sessionStorage.getItem('viewedUserName');
    const storedUserId = sessionStorage.getItem('viewedUserId');
    if (storedUserName) {
      setUserName(storedUserName);
    }
    if (storedUserId && !loading && rewards.length === 0) {
      fetchRewards(parseInt(storedUserId));
    }
  }, [fetchRewards, loading, rewards.length]);

  const toggleCurrency = () => {
    setIsCbkMode(!isCbkMode);
  };

  const handleWithdraw = (asset: { name: string; amountCBK: number }) => {
    setSelectedAsset(asset);
    setWithdrawDialogOpen(true);
  };

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
              {userName}'s Portfolio
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
                    <TableHead className="text-gray-500 dark:text-gray-400 font-medium">Asset Type</TableHead>
                    <TableHead className="text-gray-500 dark:text-gray-400 font-medium text-right">Amount</TableHead>
                    <TableHead className="text-gray-500 dark:text-gray-400 font-medium text-right">Unlock Time</TableHead>
                    <TableHead className="text-gray-500 dark:text-gray-400 font-medium text-right w-24">Action</TableHead>
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
                    rewards.map((reward) => (
                      <TableRow key={reward.id} className="hover:bg-gray-100 dark:hover:bg-gray-800 border-t border-gray-200 dark:border-gray-800">
                        <TableCell className="font-medium">{reward.projectName}</TableCell>
                        <TableCell className="text-right">
                          <div className="font-medium text-lg">
                            {formatNumber(reward.amount)} <span className="font-medium">$CBK</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          {format(new Date(reward.unlockTime), 'dd/MM/yyyy')}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-black dark:border-white hover:bg-black/5 dark:hover:bg-white/10"
                            onClick={() => handleWithdraw({
                              name: reward.projectName,
                              amountCBK: reward.amount
                            })}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Withdraw
                          </Button>
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
              variant="outline"
              className="flex-1 border-black dark:border-white hover:bg-black/5 dark:hover:bg-white/10"
              asChild
            >
              <Link to="/portfolio">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Overview
              </Link>
            </Button>
            
            <Button 
              className="flex-1 bg-black hover:bg-gray-800 text-white"
            >
              Export Report
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Withdraw Dialog */}
      {selectedAsset && (
        <WithdrawDialog 
          open={withdrawDialogOpen} 
          onOpenChange={setWithdrawDialogOpen}
          asset={selectedAsset}
        />
      )}
    </div>
  );
};

export default PortfolioDetails;
