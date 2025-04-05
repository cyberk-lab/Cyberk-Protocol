
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { formatNumber } from '@/lib/utils';

const SwapForm: React.FC = () => {
  const [cbkAmount, setCbkAmount] = useState<string>('');
  const [usdtAmount, setUsdtAmount] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [maxCbkAmount] = useState<number>(480000); // Total CBK amount the user has
  const exchangeRate = 0.001; // 1 CBK = 0.001 USDT

  // Update USDT amount when CBK amount changes
  const handleCbkChange = (value: string) => {
    setError('');
    setCbkAmount(value);
    if (value === '') {
      setUsdtAmount('');
      return;
    }
    
    const cbk = parseFloat(value.replace(/,/g, ''));
    if (!isNaN(cbk)) {
      if (cbk > maxCbkAmount) {
        setError(`Maximum amount is ${formatNumber(maxCbkAmount)} $CBK`);
      }
      const usdt = cbk * exchangeRate;
      setUsdtAmount(usdt.toString());
    }
  };

  // Update CBK amount when USDT amount changes
  const handleUsdtChange = (value: string) => {
    setError('');
    setUsdtAmount(value);
    if (value === '') {
      setCbkAmount('');
      return;
    }
    
    const usdt = parseFloat(value.replace(/,/g, ''));
    if (!isNaN(usdt)) {
      const cbk = usdt / exchangeRate;
      if (cbk > maxCbkAmount) {
        setError(`Maximum amount is ${formatNumber(maxCbkAmount)} $CBK`);
      }
      setCbkAmount(cbk.toString());
    }
  };

  // Set max CBK amount
  const handleSetMax = () => {
    setCbkAmount(maxCbkAmount.toString());
    const usdt = maxCbkAmount * exchangeRate;
    setUsdtAmount(usdt.toString());
    setError('');
  };

  // Handle swap
  const handleSwap = () => {
    if (!cbkAmount || parseFloat(cbkAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to swap",
        variant: "destructive",
      });
      return;
    }

    if (parseFloat(cbkAmount) > maxCbkAmount) {
      toast({
        title: "Insufficient Balance",
        description: `You can only swap up to ${formatNumber(maxCbkAmount)} $CBK`,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Swap Successful",
      description: `You've swapped ${formatNumber(parseFloat(cbkAmount))} $CBK for ${formatNumber(parseFloat(usdtAmount))} USDT`,
    });

    // Reset form
    setCbkAmount('');
    setUsdtAmount('');
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="cbk-amount" className="form-label">$CBK Amount</Label>
        <div className="relative mt-1.5">
          <Input
            id="cbk-amount"
            type="text"
            placeholder="0"
            value={cbkAmount}
            onChange={(e) => handleCbkChange(e.target.value)}
            className={`pr-16 ${error ? 'border-[#E53935] focus-visible:ring-[#E53935]' : ''}`}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 font-medium">$CBK</span>
          </div>
        </div>
        {error && <div className="text-[#E53935] text-sm mt-1">{error}</div>}
        <div className="flex justify-end mt-1">
          <Button 
            variant="link" 
            className="h-auto p-0 text-sm text-[#3D88CF]"
            onClick={handleSetMax}
          >
            max
          </Button>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Available: {formatNumber(maxCbkAmount)} $CBK
        </div>
      </div>

      <div>
        <Label htmlFor="usdt-amount" className="form-label">USDT Amount</Label>
        <div className="relative mt-1.5">
          <Input
            id="usdt-amount"
            type="text"
            placeholder="0"
            value={usdtAmount}
            onChange={(e) => handleUsdtChange(e.target.value)}
            className="pr-16"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 font-medium">$USDT</span>
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Exchange Rate: 1 $CBK = {exchangeRate} $USDT
        </div>
      </div>

      <Button 
        className="w-full bg-[#3D88CF] hover:bg-[#3678B5] text-white mt-6"
        onClick={handleSwap}
      >
        Swap
      </Button>
    </div>
  );
};

export default SwapForm;
