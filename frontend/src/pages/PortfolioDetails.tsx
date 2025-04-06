import React, { useEffect, useCallback } from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { useAuth } from '@/contexts/AuthContext';
import { PortfolioHeader } from '@/components/portfolio/PortfolioHeader';
import { RewardsTable } from '@/components/portfolio/RewardsTable';
import { WithdrawDialog } from '@/components/portfolio/WithdrawDialog';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Asset } from '@/types/portfolio';

export const PortfolioDetails = () => {
  const { user } = useAuth();
  const { rewards, loading, fetchRewards, totalAmount } = usePortfolio();
  const [withdrawAsset, setWithdrawAsset] = React.useState<Asset | null>(null);

  useEffect(() => {
    if (user?.id) {
      fetchRewards(Number(user.id));
    }
  }, [user?.id, fetchRewards]);

  const handleWithdraw = useCallback((asset: Asset) => {
    setWithdrawAsset(asset);
  }, []);

  return (
    <ErrorBoundary>
      <div className="container mx-auto px-4 py-8">
        <PortfolioHeader 
          title="Portfolio Details" 
          totalAmount={totalAmount}
          testId="portfolio-details-header"
        />
        
        <div className="mt-8">
          <RewardsTable 
            rewards={rewards} 
            loading={loading} 
            showActions 
            onWithdraw={handleWithdraw}
            testId="portfolio-details-rewards-table"
          />
        </div>

        <WithdrawDialog
          open={!!withdrawAsset}
          onOpenChange={() => setWithdrawAsset(null)}
          asset={withdrawAsset}
        />
      </div>
    </ErrorBoundary>
  );
};

PortfolioDetails.displayName = 'PortfolioDetails';
