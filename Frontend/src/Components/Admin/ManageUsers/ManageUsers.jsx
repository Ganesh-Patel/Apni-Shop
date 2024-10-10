import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { UserContext } from '../../../Contexts/UserContext.jsx';
import { fetchUsers, deleteUser, updateUser } from '../../../Utils/api.js';
import AddUser from './AddUser.jsx';
import ConfirmationBox from '../../SubComponents/ConfirmationBox.jsx'; 
import UpdateUserModal from './UpdareUserModal.jsx';

function ManageUsers() {
  const { isLoggedIn } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // Store selected user object
  const [actionMessage, setActionMessage] = useState('');
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Fetch all users when the component loads
  useEffect(() => {
    if (isLoggedIn) {
      loadUsers();
    }
  }, [isLoggedIn]);

  const loadUsers = async () => {
    try {
      const response = await fetchUsers();
      console.log(response)
      setUsers(response.data.allUsers);
      setFilteredUsers(response.data.allUsers);
    } catch (error) {
      toast.error('Failed to fetch users');
      console.error('Error fetching users:', error);
    }
  };

  // Handle search filtering
  const handleSearch =async (e) => {
    const term = e.target.value;
    console.log('here is your search',term)
    setSearchTerm(term);
    if (term) {
      const response = await fetchUsers(term);
      console.log(response);
      setFilteredUsers(response.data.allUsers);
    } else {
      setFilteredUsers(users);
    }
  };

  // Handle action selection
  const handleAction = (action, user) => {
    setSelectedUser(user); // Store the entire user object
    setSelectedAction(action);
    if (action === 'delete') {
      setActionMessage('Are you sure you want to delete this user?');
    } else if (action === 'edit') {
      setActionMessage('Are you sure you want to edit this user?');
    } else if (action === 'change_role') {
      setActionMessage('Are you sure you want to change the role of this user?');
    }
    setConfirmOpen(true); // Open confirmation modal
  };

  const handleConfirmAction = async () => {
    setConfirmOpen(false); // Close confirmation box before proceeding

    if (selectedAction === 'delete') {
      console.log(`Deleting user with ID: ${selectedUser._id}`);
      try {
        const response = await deleteUser(selectedUser._id);
        if (response.status === 200) {
          toast.success('User deleted successfully');
          loadUsers();
        } else {
          toast.error('Failed to delete user');
        }
      } catch (error) {
        toast.error('Error while deleting user');
        console.error(error);
      }
    } else if (selectedAction === 'edit') {
      console.log(`Editing user with ID: ${selectedUser._id}`);
      setEditModalOpen(true); 
    } else if (selectedAction === 'change_role') {
      console.log(`Changing role of user with ID: ${selectedUser._id}`);
      // Implement role change logic here
    }
  };

  return (
    <div className="container mx-auto p-6 mt-12">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
      
      {/* Add User Button */}
      <div className="mb-4">
        <button
          onClick={openModal}
          className="bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-900"
        >
          Add User
        </button>
      </div>

      {/* Search Filter */}
      <input
        type="text"
        placeholder="Search by user ID or email"
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 border border-gray-300 rounded-md w-full"
      />

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">User ID</th>
              <th className="border border-gray-300 p-2">Profile Pic</th>
              <th className="border border-gray-300 p-2">First Name</th>
              <th className="border border-gray-300 p-2">Last Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Role</th>
              <th className="border border-gray-300 p-2">Last Updated</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td className="border border-gray-300 p-2">{user._id}</td>
                <td className="border border-gray-300 p-2">
                  <img
                    src={user.profilePic}
                    alt={user.firstname}
                    className="h-16 w-16 object-cover"
                  />
                </td>
                <td className="border border-gray-300 p-2">{user.firstname}</td>
                <td className="border border-gray-300 p-2">{user.lastname}</td>
                <td className="border border-gray-300 p-2">{user.email}</td>
                <td className="border border-gray-300 p-2">{user.is_active ? 'Active' : 'Disabled'}</td>
                <td className="border border-gray-300 p-2">{user.role}</td>
                <td className="border border-gray-300 p-2">{new Date(user.updatedAt).toLocaleDateString()}</td>
                <td className="border border-gray-300 p-2">
                  {/* Action Dropdown */}
                  <select
                    className="border rounded px-2 py-1"
                    onChange={(e) => handleAction(e.target.value, user)}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select Action
                    </option>
                    <option value={user.is_active ? 'disable' : 'enable'}>
                      {user.is_active ? 'Disable' : 'Enable'}
                    </option>
                    <option value="edit">Edit</option>
                    <option value="delete">Delete</option>
                    <option value="change_role">Change Role</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit User Modal */}
      {isEditModalOpen && (
        <UpdateUserModal
          isOpen={isEditModalOpen}
          user={selectedUser}
          onClose={() => setEditModalOpen(false)}
          onUpdate={loadUsers} 
        />
      )}

      {/* Confirmation Box Modal */}
      <ConfirmationBox
        isOpen={isConfirmOpen}
        message={actionMessage}
        onConfirm={handleConfirmAction}
        onCancel={() => setConfirmOpen(false)}
      />

      {/* Add User Modal */}
      <AddUser isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default ManageUsers;
