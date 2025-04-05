
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { formatNumber } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Wallet, Check, AlertCircle } from 'lucide-react';

interface WithdrawDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  asset: {
    name: string;
    amountCBK: number;
  };
}

const WithdrawDialog: React.FC<WithdrawDialogProps> = ({ 
  open, 
  onOpenChange,
  asset
}) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [amount, setAmount] = useState(asset.amountCBK.toString());
  const [confirmed, setConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!walletAddress || !amount || !confirmed) {
      toast({
        title: "Error",
        description: "Please fill all fields and confirm the wallet address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Withdrawal Initiated",
        description: `${formatNumber(parseFloat(amount))} $CBK tokens will be sent to your wallet shortly.`,
      });
      setIsSubmitting(false);
      onOpenChange(false);
      
      // Reset form
      setWalletAddress('');
      setAmount(asset.amountCBK.toString());
      setConfirmed(false);
    }, 1500);
  };

  const isValidEthereumAddress = (address: string) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  const isAddressValid = walletAddress ? isValidEthereumAddress(walletAddress) : true;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Withdraw $CBK Tokens
          </DialogTitle>
          <DialogDescription>
            Transfer {asset.name} tokens to your Ethereum wallet.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="wallet-address">Ethereum Wallet Address</Label>
            <Input
              id="wallet-address"
              placeholder="0x..."
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className={!isAddressValid ? "border-red-500" : ""}
            />
            {walletAddress && !isAddressValid && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                Please enter a valid Ethereum address (0x followed by 40 hex characters)
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Amount ($CBK)</Label>
            <Input
              id="amount"
              type="number"
              min="0"
              max={asset.amountCBK}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Maximum available: {formatNumber(asset.amountCBK)} $CBK
            </p>
          </div>
          
          <div className="flex items-center space-x-2 py-2">
            <Checkbox 
              id="confirm" 
              checked={confirmed}
              onCheckedChange={(checked) => setConfirmed(checked === true)}
            />
            <Label htmlFor="confirm" className="text-sm">
              I confirm that I have entered the correct wallet address
            </Label>
          </div>
          
          <DialogFooter className="flex-col sm:flex-col gap-2 sm:gap-2">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={!walletAddress || !amount || !confirmed || !isAddressValid || isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Withdraw Tokens"}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              className="w-full"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WithdrawDialog;
