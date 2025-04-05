import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AdminProvider, useAdmin } from '@/contexts/AdminContext';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserPlus } from 'lucide-react';
import UserTable from '@/components/admin/UserTable';
import AddUserDialog from '@/components/admin/dialogs/AddUserDialog';
import EditUserDialog from '@/components/admin/dialogs/EditUserDialog';
import DeleteUserDialog from '@/components/admin/dialogs/DeleteUserDialog';
import { User } from '@/types/admin';

const AdminDashboard: React.FC = () => {
  const { users, loading, handleAddUser, handleUpdateUser, handleToggleUserStatus, handleDeleteUser, handleReward } = useAdmin();
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const onAddUser = async (name: string, email: string, password: string) => {
    try {
      await handleAddUser(name, email, password);
      setAddUserDialogOpen(false);
    } catch (error) {
      // Error is already handled in context
    }
  };

  const onEditUser = (user: User) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  const onUpdateUser = async (userId: number, firstName: string, lastName: string) => {
    try {
      await handleUpdateUser(userId, firstName, lastName);
      setEditDialogOpen(false);
      setSelectedUser(null);
    } catch (error) {
      // Error is already handled in context
    }
  };

  const onDeleteUser = (user: User) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const onConfirmDelete = async (userId: number) => {
    try {
      await handleDeleteUser(userId);
      setDeleteDialogOpen(false);
      setSelectedUser(null);
    } catch (error) {
      // Error is already handled in context
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
        
        <div className="bg-white dark:bg-gray-900 rounded-md shadow-sm mb-6">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-medium font-fauna">User Management</h2>
            <Button className="flex items-center" onClick={() => setAddUserDialogOpen(true)}>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <UserTable
              users={users}
              onEdit={onEditUser}
              onToggleStatus={handleToggleUserStatus}
              onDelete={onDeleteUser}
              onReward={handleReward}
            />
          </div>
        </div>
      </div>

      <AddUserDialog
        open={addUserDialogOpen}
        onOpenChange={setAddUserDialogOpen}
        onAdd={onAddUser}
      />

      <EditUserDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        user={selectedUser}
        onUpdate={onUpdateUser}
      />

      <DeleteUserDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        user={selectedUser}
        onConfirm={onConfirmDelete}
      />
    </div>
  );
};

const AdminPage: React.FC = () => {
  const { user: authUser } = useAuth();

  if (!authUser?.role || authUser.role.id !== 1) {
    return <Navigate to="/" replace />;
  }

  return (
    <AdminProvider>
      <AdminDashboard />
    </AdminProvider>
  );
};

export default AdminPage;
