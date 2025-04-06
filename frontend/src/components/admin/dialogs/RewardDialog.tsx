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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from '@/types/admin';

interface RewardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  users: User[];
  onReward: (userId: number, amount: number, projectName: string, unlockTime: string, message: string) => Promise<void>;
}

const RewardDialog: React.FC<RewardDialogProps> = ({
  open,
  onOpenChange,
  user: initialUser,
  users,
  onReward,
}) => {
  const [amount, setAmount] = useState<string>('');
  const [projectName, setProjectName] = useState('');
  const [unlockTime, setUnlockTime] = useState('');
  const [message, setMessage] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<string>(initialUser?.id.toString() || '');

  const handleSubmit = async () => {
    if (!selectedUserId || !amount || !projectName || !unlockTime) return;

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) return;

    await onReward(parseInt(selectedUserId), numericAmount, projectName, unlockTime, message);
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setAmount('');
    setProjectName('');
    setUnlockTime('');
    setMessage('');
    setSelectedUserId('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="bg-black/10" />
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reward User</DialogTitle>
            <DialogDescription>
              Award CBK tokens to a user for their contribution.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="user">Select User</Label>
              <Select
                value={selectedUserId}
                onValueChange={setSelectedUserId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a user" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id.toString()}>
                      {user.firstName} {user.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
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

            <div className="grid gap-2">
              <Label htmlFor="unlockTime">Unlock Time</Label>
              <Input
                id="unlockTime"
                type="datetime-local"
                value={unlockTime}
                onChange={(e) => setUnlockTime(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter a message for the user"
                className="resize-none"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                onOpenChange(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!selectedUserId || !amount || !projectName || !unlockTime || isNaN(parseFloat(amount))}
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