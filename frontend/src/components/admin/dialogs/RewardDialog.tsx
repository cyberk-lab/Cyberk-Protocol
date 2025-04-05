import React, { useState } from 'react';
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from '@/types/admin';

interface RewardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  onReward: (userId: number, amount: number, projectName: string) => Promise<void>;
}

const RewardDialog: React.FC<RewardDialogProps> = ({
  open,
  onOpenChange,
  user,
  onReward,
}) => {
  const [amount, setAmount] = useState<string>('');
  const [projectName, setProjectName] = useState('');

  const handleSubmit = async () => {
    if (!user || !amount || !projectName) return;

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) return;

    await onReward(user.id, numericAmount, projectName);
    onOpenChange(false);
    setAmount('');
    setProjectName('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="bg-black/10" />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reward User</DialogTitle>
            <DialogDescription>
              Award CBK tokens to {user?.firstName} {user?.lastName} for their contribution.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount (CBK)</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter reward amount"
                min="0"
                step="0.01"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="project">Project Name</Label>
              <Input
                id="project"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                onOpenChange(false);
                setAmount('');
                setProjectName('');
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!amount || !projectName || isNaN(parseFloat(amount))}
            >
              Award Tokens
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default RewardDialog; 