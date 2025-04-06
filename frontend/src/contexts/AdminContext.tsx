import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';
import { User } from '@/types/admin';

interface AdminContextType {
  users: User[];
  loading: boolean;
  handleAddUser: (name: string, email: string, password: string) => Promise<void>;
  handleUpdateUser: (userId: number, firstName: string, lastName: string) => Promise<void>;
  handleToggleUserStatus: (userId: number, currentStatus: number) => Promise<void>;
  handleDeleteUser: (userId: number) => Promise<void>;
  handleReward: (userId: number, amount: number, projectName: string, unlockTime: string, message: string) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
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
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch users. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleAddUser = async (name: string, email: string, password: string) => {
    try {
      const nameParts = name.trim().split(/\s+/);
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ') || firstName;

      const response = await fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
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
      throw error;
    }
  };

  const handleUpdateUser = async (userId: number, firstName: string, lastName: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/users/${userId}`, {
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

      setUsers(users.map(u => {
        if (u.id === userId) {
          return {
            ...u,
            firstName,
            lastName
          };
        }
        return u;
      }));
      
      toast({
        title: "Success",
        description: "User updated successfully",
      });
    } catch (error) {
      console.error('Error updating user:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update user. Please try again.",
      });
      throw error;
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

      setUsers(users.map(u => {
        if (u.id === userId) {
          return {
            ...u,
            status: { id: currentStatus === 1 ? 2 : 1 }
          };
        }
        return u;
      }));

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
      throw error;
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      setUsers(users.filter(u => u.id !== userId));
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
      throw error;
    }
  };

  const handleReward = async (userId: number, amount: number, projectName: string, unlockTime: string, message: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/rewards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          user: { id: userId },
          amount,
          projectName,
          unlockTime,
          message
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to reward user');
      }

      toast({
        title: "Success",
        description: "Reward distributed successfully",
      });
    } catch (error) {
      console.error('Error rewarding user:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to reward user. Please try again.",
      });
      throw error;
    }
  };

  const value = {
    users,
    loading,
    handleAddUser,
    handleUpdateUser,
    handleToggleUserStatus,
    handleDeleteUser,
    handleReward,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}; 