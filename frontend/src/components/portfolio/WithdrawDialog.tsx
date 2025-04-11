import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Asset } from '@/types/portfolio';
import { formatNumber } from '@/lib/utils';

interface WithdrawDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  asset: Asset | null;
}

export const WithdrawDialog: React.FC<WithdrawDialogProps> = ({ open, onOpenChange, asset }) => {
  if (!asset) return null;

  const handleWithdraw = async () => {
    try {
      // TODO: Implement withdrawal logic here
      onOpenChange(false);
    } catch (error) {
      console.error('Error withdrawing asset:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Withdraw {asset.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Amount to withdraw:</p>
            <p className="text-2xl font-semibold">
              {formatNumber(asset.amountCBK)} <span className="text-lg">$CBK</span>
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleWithdraw}>Confirm Withdrawal</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

WithdrawDialog.displayName = 'WithdrawDialog'; 