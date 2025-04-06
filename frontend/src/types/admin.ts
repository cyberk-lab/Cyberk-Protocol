export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  walletAddress?: string;
  role: {
    id: number;
  };
  status: {
    id: number;
  };
}

export type RewardDialogData = {
  userId: number;
  userName: string;
};

export type AdminContextType = {
  users: User[];
  loading: boolean;
  fetchUsers: () => Promise<void>;
  handleAddUser: (name: string, email: string, password: string, walletAddress: string) => Promise<void>;
  handleUpdateUser: (userId: number, firstName: string, lastName: string) => Promise<void>;
  handleToggleUserStatus: (userId: number, currentStatus: number) => Promise<void>;
  handleDeleteUser: (userId: number) => Promise<void>;
  handleReward: (userId: number, amount: number, projectName: string, unlockTime: string, message: string) => Promise<void>;
}; 