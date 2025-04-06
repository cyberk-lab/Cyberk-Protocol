import React, { createContext, useContext, useState, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';

export type Reward = {
  id: number;
  amount: number;
  projectName: string;
  unlockTime: Date;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

type PortfolioContextType = {
  rewards: Reward[];
  loading: boolean;
  fetchRewards: (userId: number) => Promise<void>;
  totalAmount: number;
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRewards = useCallback(async (userId: number) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`http://localhost:3000/api/v1/rewards/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch rewards');
      }

      const data = await response.json();
      setRewards(data);
    } catch (error) {
      console.error('Error fetching rewards:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch rewards. Please try again.",
      });
      // Clear rewards on error
      setRewards([]);
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array since we don't use any external values

  // Calculate total amount from rewards, ensuring numeric values
  const totalAmount = rewards.reduce((sum, reward) => {
    const amount = typeof reward.amount === 'string' ? parseFloat(reward.amount) : reward.amount;
    return !isNaN(amount) ? sum + amount : sum;
  }, 0);

  const value = {
    rewards,
    loading,
    fetchRewards,
    totalAmount,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}; 