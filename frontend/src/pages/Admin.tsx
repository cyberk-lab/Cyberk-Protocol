import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogTrigger,
  DialogDescription 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatNumber } from '@/lib/utils';
import { Edit, UserPlus, UserX, Award, Users, Wallet, Eye, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: {
    id: number;
  };
  status: {
    id: number;
  };
};

type RewardDialogData = {
  userId: number;
  userName: string;
};

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [rewardAmount, setRewardAmount] = useState<number | ''>('');
  const [rewardData, setRewardData] = useState<RewardDialogData | null>(null);
  const [rewardProjectName, setRewardProjectName] = useState('');
  const [rewardDialogOpen, setRewardDialogOpen] = useState(false);
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editUserName, setEditUserName] = useState('');
  const [editUserEmail, setEditUserEmail] = useState('');
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  // Check if user has admin role
  if (!authUser?.role || authUser.role.id !== 1) {
    return <Navigate to="/" replace />;
  }

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/users', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch users. Please try again.",
      });
      setLoading(false);
    }
  };

  const handleAddUser = async () => {
    if (!newUserName || !newUserEmail || !newUserPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields.",
      });
      return;
    }

    try {
      // Split the full name into first and last name
      const nameParts = newUserName.trim().split(/\s+/);
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ') || firstName; // Use first name as last name if no last name provided

      const response = await fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email: newUserEmail,
          password: newUserPassword,
          role: { id: 2 }, // User role
          status: { id: 1 }, // Active status
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create user');
      }

      const newUser = await response.json();
      setUsers([...users, newUser]);
      setNewUserName('');
      setNewUserEmail('');
      setNewUserPassword('');
      setAddUserDialogOpen(false);
      toast({
        title: "Success",
        description: "User created successfully",
      });
    } catch (error) {
      console.error('Error creating user:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create user. Please try again.",
      });
    }
  };

  const handleReward = () => {
    if (rewardData && rewardAmount && rewardProjectName) {
      // TODO: Implement reward functionality with backend API
      console.log(`Awarded ${rewardAmount} $CBK to ${rewardData.userName} for project ${rewardProjectName}`);
      
      setRewardAmount('');
      setRewardProjectName('');
      setRewardData(null);
      setRewardDialogOpen(false);
      
      toast({
        title: "Success",
        description: "Reward distributed successfully",
      });
    }
  };

  const handleToggleUserStatus = async (userId: number, currentStatus: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          status: { id: currentStatus === 1 ? 2 : 1 }, // Toggle between active (1) and inactive (2)
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user status');
      }

      await fetchUsers(); // Refresh user list
      toast({
        title: "Success",
        description: "User status updated successfully",
      });
    } catch (error) {
      console.error('Error updating user status:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update user status. Please try again.",
      });
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setEditUserName(`${user.firstName} ${user.lastName}`);
    setEditUserEmail(user.email);
    setEditDialogOpen(true);
  };

  const handleUpdateUser = async () => {
    if (!editingUser || !editUserName) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields.",
      });
      return;
    }

    try {
      // Split the full name into first and last name
      const nameParts = editUserName.trim().split(/\s+/);
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ') || firstName;

      const response = await fetch(`http://localhost:3000/api/v1/users/${editingUser.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          firstName,
          lastName
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update user');
      }

      // Update the user in the local state
      setUsers(users.map(u => {
        if (u.id === editingUser.id) {
          return {
            ...u,
            firstName,
            lastName
          };
        }
        return u;
      }));
      
      setEditDialogOpen(false);
      setEditingUser(null);
      setEditUserName('');
      setEditUserEmail('');
      
      toast({
        title: "Success",
        description: "User name updated successfully",
      });
    } catch (error) {
      console.error('Error updating user:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update user. Please try again.",
      });
    }
  };

  const openRewardDialog = (userId: number, userName: string) => {
    setRewardData({ userId, userName });
    setRewardDialogOpen(true);
  };

  const viewUserPortfolio = (userId: number, userName: string) => {
    sessionStorage.setItem('viewedUserId', userId.toString());
    sessionStorage.setItem('viewedUserName', userName);
    navigate('/portfolio-details');
  };

  const handleDeleteUser = async (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/api/v1/users/${userToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      setUsers(users.filter(u => u.id !== userToDelete.id));
      setDeleteDialogOpen(false);
      setUserToDelete(null);
      
      toast({
        title: "Success",
        description: "User deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete user. Please try again.",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-white dark:bg-black">
        <Header />
        <div className="pt-20 container mx-auto px-4">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white dark:bg-black">
      <Header />
      
      <div className="pt-20 container mx-auto px-4">
        <h1 className="text-2xl font-medium font-fauna mb-6">Admin Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Total Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{users.length}</p>
            </CardContent>
          </Card>
        </div>
        
        {/* User Management */}
        <div className="bg-white dark:bg-gray-900 rounded-md shadow-sm mb-6">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-medium font-fauna">User Management</h2>
            <Dialog open={addUserDialogOpen} onOpenChange={setAddUserDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Member
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Member</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={newUserName} 
                      onChange={(e) => setNewUserName(e.target.value)} 
                      placeholder="Enter full name" 
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={newUserEmail} 
                      onChange={(e) => setNewUserEmail(e.target.value)} 
                      placeholder="Enter email address" 
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      value={newUserPassword} 
                      onChange={(e) => setNewUserPassword(e.target.value)} 
                      placeholder="Enter password" 
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddUser}>Add Member</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
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
                      <span className={`px-2 py-1 rounded-full text-xs ${user.status.id === 1 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                        {user.status.id === 1 ? "Active" : "Disabled"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <TooltipProvider>
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
                                onClick={() => handleEditUser(user)}
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
                                onClick={() => handleToggleUserStatus(user.id, user.status.id)}
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
                                onClick={() => handleDeleteUser(user)}
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
                                onClick={() => openRewardDialog(user.id, `${user.firstName} ${user.lastName}`)}
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
                        </TooltipProvider>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {userToDelete?.firstName} {userToDelete?.lastName}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDeleteDialogOpen(false);
                setUserToDelete(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input 
                id="edit-name" 
                value={editUserName} 
                onChange={(e) => setEditUserName(e.target.value)} 
                placeholder="Enter full name" 
              />
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <div className="p-2 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">{editUserEmail}</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setEditDialogOpen(false);
                setEditingUser(null);
                setEditUserName('');
                setEditUserEmail('');
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateUser}>Update User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPage;
