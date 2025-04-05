
import React from 'react';
import { formatNumber } from '@/lib/utils';
import { Calendar } from 'lucide-react';

export type Transaction = {
  id: number;
  amount: number;
  amountCBK: number;
  description: string;
  date: string;
  fullDate?: string; // Added for displaying full date information
  isPositive: boolean;
};

interface TransactionHistoryProps {
  transactions: Transaction[];
  isCbkMode: boolean;
}

// Function to generate a random date in February 2025
const getRandomFebruaryDate = (): { shortDate: string, fullDate: string } => {
  // February 2025 has 28 days
  const day = Math.floor(Math.random() * 28) + 1;
  // Format as DD/02/2025
  const shortDate = `${day.toString().padStart(2, '0')}/02/2025`;
  // Full date format
  const fullDate = `${day.toString().padStart(2, '0')} February 2025`;
  
  return { shortDate, fullDate };
};

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions, isCbkMode }) => {
  // Add random February 2025 dates to transactions if they don't have fullDate
  const transactionsWithFullDates = transactions.map(transaction => {
    if (!transaction.fullDate) {
      const dates = getRandomFebruaryDate();
      return {
        ...transaction,
        date: dates.shortDate,
        fullDate: dates.fullDate
      };
    }
    return transaction;
  });

  return (
    <div className="rounded-md overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
        <h3 className="font-medium fauna-title">Transaction History</h3>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {transactionsWithFullDates.length > 0 ? (
          transactionsWithFullDates.map((transaction) => (
            <div key={transaction.id} className="p-4 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs mt-1">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span title={transaction.fullDate}>{transaction.date}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-semibold ${transaction.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {transaction.isPositive ? '+' : '-'}
                    {formatNumber(transaction.amountCBK)} <span className="font-medium">$CBK</span>
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 text-xs">
                    {formatNumber(transaction.amount)}đ
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-gray-500">
            No transactions to display
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
