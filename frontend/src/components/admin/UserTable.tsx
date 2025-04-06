import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@/types/admin';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Edit, UserX, Award, Eye, Trash2 } from 'lucide-react';
import RewardDialog from './dialogs/RewardDialog';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onToggleStatus: (userId: number, currentStatus: number) => Promise<void>;
  onDelete: (user: User) => void;
  onReward: (userId: number, amount: number, projectName: string) => Promise<void>;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onToggleStatus, onDelete, onReward }) => {
  const navigate = useNavigate();
  const [rewardDialogOpen, setRewardDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const viewUserPortfolio = (userId: number, userName: string) => {
    sessionStorage.setItem('viewedUserId', userId.toString());
    sessionStorage.setItem('viewedUserName', userName);
    navigate('/portfolio-details');
  };

  const handleRewardClick = (user: User) => {
    setSelectedUser(user);
    setRewardDialogOpen(true);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Wallet Address</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className={user.status.id !== 1 ? "opacity-60" : ""}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <span className="font-mono text-sm">
                  {user.walletAddress ? (
                    `${user.walletAddress.slice(0, 6)}...${user.walletAddress.slice(-4)}`
                  ) : (
                    <span className="text-gray-400 dark:text-gray-500">Not set</span>
                  )}
                </span>
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  user.status.id === 1 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}>
                  {user.status.id === 1 ? "Active" : "Disabled"}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <TooltipProvider delayDuration={0}>
                  <div className="flex justify-end items-center gap-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => viewUserPortfolio(user.id, `${user.firstName} ${user.lastName}`)}
                          className="hover:bg-secondary"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View Portfolio</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => onEdit(user)}
                          className="hover:bg-secondary"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit User</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant={user.status.id === 1 ? "ghost" : "secondary"}
                          size="icon"
                          onClick={() => onToggleStatus(user.id, user.status.id)}
                          className={user.status.id === 1 ? "hover:bg-secondary" : "hover:bg-primary"}
                        >
                          <UserX className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{user.status.id === 1 ? "Disable User" : "Enable User"}</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => onDelete(user)}
                          className="hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete User</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleRewardClick(user)}
                          disabled={user.status.id !== 1}
                          className="hover:bg-secondary disabled:opacity-50"
                        >
                          <Award className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Reward User</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <RewardDialog
        open={rewardDialogOpen}
        onOpenChange={setRewardDialogOpen}
        user={selectedUser}
        users={users}
        onReward={onReward}
      />
    </>
  );
};

export default UserTable; 