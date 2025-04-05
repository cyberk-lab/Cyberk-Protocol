
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

const assetData = [
  { 
    name: 'Lương tháng 13', 
    amountVND: 3000000, 
    amountCBK: 120000 
  },
  { 
    name: '$CBK', 
    amountVND: 12000000, 
    amountCBK: 480000 
  },
  { 
    name: 'Thưởng dự án', 
    amountVND: 20000000, 
    amountCBK: 800000 
  },
  { 
    name: 'Lương trách nhiệm', 
    amountVND: 10000000, 
    amountCBK: 400000 
  }
];

const totalVND = assetData.reduce((sum, asset) => sum + asset.amountVND, 0);
const totalCBK = assetData.reduce((sum, asset) => sum + asset.amountCBK, 0);

const PortfolioDetails: React.FC = () => {
  const [isCbkMode, setIsCbkMode] = useState(false);
  const [userName, setUserName] = useState<string>('');
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<{ name: string; amountCBK: number } | null>(null);

  useEffect(() => {
    // Get user name from sessionStorage if exists (set in Admin page)
    const storedUserName = sessionStorage.getItem('viewedUserName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

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
      
      <div className="pt-20 max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-xl font-medium font-fauna">Portfolio Details</h1>
              {userName && (
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  User: <span className="font-medium">{userName}</span>
                </p>
              )}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleCurrency}
              className="border-black dark:border-white hover:bg-black/5 dark:hover:bg-white/10"
            >
              {isCbkMode ? 'Show VND' : 'Show $CBK'}
            </Button>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 bg-gray-50 dark:bg-gray-900 rounded-md p-6 shadow-sm"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">Total Assets</p>
                <h2 className="text-3xl font-bold fauna-title mb-1">
                  {isCbkMode 
                    ? <>{formatNumber(totalCBK)} <span className="text-3xl">$CBK</span></>
                    : <>{formatNumber(totalCBK)} <span className="text-3xl">$CBK</span></>
                  }
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-xs">
                  {isCbkMode 
                    ? `${formatNumber(totalVND)}đ` 
                    : `${formatNumber(totalVND)}đ`
                  }
                </p>
              </div>
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded p-3 shadow-sm">
                <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Unlock date</p>
                  <p className="text-gray-900 dark:text-white text-sm">31/12/2025</p>
                </div>
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
                    <TableHead className="text-gray-500 dark:text-gray-400 font-medium text-right">
                      Amount
                    </TableHead>
                    <TableHead className="text-gray-500 dark:text-gray-400 font-medium text-right w-24">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assetData.map((asset, index) => (
                    <TableRow key={index} className="hover:bg-gray-100 dark:hover:bg-gray-800 border-t border-gray-200 dark:border-gray-800">
                      <TableCell className="font-medium">{asset.name}</TableCell>
                      <TableCell className="text-right">
                        <div className="font-medium text-lg">
                          {formatNumber(asset.amountCBK)} <span className="font-medium">$CBK</span>
                        </div>
                        <div className="text-gray-500 dark:text-gray-400 text-xs">
                          {formatNumber(asset.amountVND)}đ
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-black dark:border-white hover:bg-black/5 dark:hover:bg-white/10"
                          onClick={() => handleWithdraw(asset)}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Withdraw
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
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
