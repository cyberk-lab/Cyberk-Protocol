export interface Asset {
  name: string;
  amountCBK: number;
}

export interface WithdrawDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  asset: Asset;
}

export interface PortfolioHeaderProps {
  totalAmount: number;
  title: string;
  className?: string;
  testId?: string;
}

export interface RewardsTableProps {
  rewards: Reward[];
  loading: boolean;
  showActions?: boolean;
  onWithdraw?: (asset: Asset) => void;
  limit?: number;
  className?: string;
  testId?: string;
}

// Reward type từ context
export interface Reward {
  id: number;
  amount: number;
  projectName: string;
  unlockTime: Date;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
} 