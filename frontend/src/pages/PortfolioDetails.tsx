import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import WithdrawDialog from '@/components/WithdrawDialog';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { PortfolioHeader } from '@/components/portfolio/PortfolioHeader';
import { RewardsTable } from '@/components/portfolio/RewardsTable';

const PortfolioDetails: React.FC = () => {
  const [userName, setUserName] = useState<string>('');
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<{ name: string; amountCBK: number } | null>(null);
  const { rewards, loading, fetchRewards, totalAmount } = usePortfolio();

  useEffect(() => {
    const storedUserName = sessionStorage.getItem('viewedUserName');
    const storedUserId = sessionStorage.getItem('viewedUserId');
    if (storedUserName) {
      setUserName(storedUserName);
    }
    if (storedUserId && !loading && rewards.length === 0) {
      fetchRewards(parseInt(storedUserId));
    }
  }, [fetchRewards, loading, rewards.length]);

  const handleWithdraw = useCallback((asset: { name: string; amountCBK: number }) => {
    setSelectedAsset(asset);
    setWithdrawDialogOpen(true);
  }, []);

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
          <PortfolioHeader 
            totalAmount={totalAmount} 
            title={`${userName}'s Portfolio`}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <RewardsTable 
              rewards={rewards}
              loading={loading}
              showActions
              onWithdraw={handleWithdraw}
            />
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
