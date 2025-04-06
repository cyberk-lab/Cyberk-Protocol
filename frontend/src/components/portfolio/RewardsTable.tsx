import React, { useMemo } from 'react';
import { format } from 'date-fns';
import { formatNumber } from '@/lib/utils';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { RewardsTableProps, Reward } from '@/types/portfolio';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const TableRowMemo = React.memo(({ 
  reward, 
  showActions, 
  onWithdraw 
}: { 
  reward: Reward; 
  showActions: boolean; 
  onWithdraw?: (asset: { name: string; amountCBK: number }) => void;
}) => (
  <TableRow className="hover:bg-gray-100 dark:hover:bg-gray-800 border-t border-gray-200 dark:border-gray-800">
    <TableCell className="font-medium">{reward.projectName}</TableCell>
    <TableCell className="text-right">
      <div className="font-medium text-lg">
        {formatNumber(reward.amount)} <span className="font-medium">$CBK</span>
      </div>
    </TableCell>
    <TableCell className="text-right">
      {format(new Date(reward.unlockTime), 'dd/MM/yyyy')}
    </TableCell>
    {!showActions ? (
      <TableCell className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[200px]">
        {reward.message}
      </TableCell>
    ) : (
      <TableCell className="text-right">
        <Button 
          variant="outline" 
          size="sm"
          className="border-black dark:border-white hover:bg-black/5 dark:hover:bg-white/10"
          onClick={() => onWithdraw?.({
            name: reward.projectName,
            amountCBK: reward.amount
          })}
        >
          <Download className="h-4 w-4 mr-1" />
          Withdraw
        </Button>
      </TableCell>
    )}
  </TableRow>
));

TableRowMemo.displayName = 'TableRowMemo';

export const RewardsTable: React.FC<RewardsTableProps> = React.memo(({ 
  rewards, 
  loading, 
  showActions = false,
  onWithdraw,
  limit,
  className,
  testId
}) => {
  const displayRewards = useMemo(() => 
    limit ? rewards.slice(0, limit) : rewards,
    [rewards, limit]
  );

  return (
    <ErrorBoundary>
      <div className={cn("rounded-md overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm", className)} data-testid={testId}>
        <Table>
          <TableHeader className="bg-gray-50 dark:bg-gray-900">
            <TableRow className="hover:bg-gray-100 dark:hover:bg-gray-800">
              <TableHead className="text-gray-500 dark:text-gray-400 font-medium">Project</TableHead>
              <TableHead className="text-gray-500 dark:text-gray-400 font-medium text-right">Amount</TableHead>
              <TableHead className="text-gray-500 dark:text-gray-400 font-medium text-right">Unlock Date</TableHead>
              {!showActions ? (
                <TableHead className="text-gray-500 dark:text-gray-400 font-medium">Message</TableHead>
              ) : (
                <TableHead className="text-gray-500 dark:text-gray-400 font-medium text-right w-24">Action</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  Loading...
                </TableCell>
              </TableRow>
            ) : displayRewards.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  No rewards found
                </TableCell>
              </TableRow>
            ) : (
              displayRewards.map((reward) => (
                <TableRowMemo
                  key={reward.id}
                  reward={reward}
                  showActions={showActions}
                  onWithdraw={onWithdraw}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </ErrorBoundary>
  );
});

RewardsTable.displayName = 'RewardsTable'; 