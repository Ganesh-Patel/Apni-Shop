import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { UserContext } from '../../../Contexts/UserContext.jsx';
 import { fetchUsers} from '../../../Utils/api.js'; 
 import AddUser from './AddUser.jsx';
function ManageUsers() {
  const { isLoggedIn } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        console.log("calling fetch api");
        const response = await fetchUsers();
        console.log(response.data);
        
        // Set the users and filteredUsers from the response
        setUsers(response.data.allUsers);
        setFilteredUsers(response.data.allUsers); // Change this line to match the users array
    } catch (error) {
        toast.error('Failed to fetch users');
        console.error('Error fetching users:', error);
    }

  };
  // Handle search filtering
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term) {
      const filtered = users.filter(user =>
        user.email.toLowerCase().includes(term.toLowerCase()) ||
        user.user_id.toString().includes(term)
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  };
  // Add a new user (simplified)

  // Toggle enable/disable user
  const handleToggleStatus = async (user) => {
    try {
      await toggleUserStatus(user.user_id);
      toast.success(`User ${user.is_active ? 'disabled' : 'enabled'} successfully`);
      loadUsers(); // Refresh users list
    } catch (error) {
      toast.error('Failed to update user status');
    }
  };

  // Delete user
  const handleDeleteUser = async (user_id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(user_id);
        toast.success('User deleted successfully');
        loadUsers(); // Refresh users list
      } catch (error) {
        toast.error('Failed to delete user');
      }
    }
  };

  // Change user role
  const handleChangeRole = async (user) => {
    const newRole = prompt("Enter new role for the user:", user.role); // Simplified for demo purposes
    if (newRole && newRole !== user.role) {
      try {
        await changeUserRole(user.user_id, newRole);
        toast.success('User role updated successfully');
        loadUsers(); // Refresh users list
      } catch (error) {
        toast.error('Failed to change user role');
      }
    }
  };

  return (
    <div className="container mx-auto p-6 mt-12">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
      <AddUser isOpen={isModalOpen} onClose={closeModal} />
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
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">User ID</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Role</th>
            <th className="border border-gray-300 p-2">Last Login</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.user_id}>
              <td className="border border-gray-300 p-2">{user.user_id}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">
                {user.is_active ? 'Active' : 'Disabled'}
              </td>
              <td className="border border-gray-300 p-2">{user.role}</td>
              <td className="border border-gray-300 p-2">{user.last_login}</td>
              <td className="border border-gray-300 p-2 space-x-2">
                {/* Toggle Enable/Disable */}
                <button
                  onClick={() => handleToggleStatus(user)}
                  className={`px-2 py-1 text-sm rounded-md ${user.is_active ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
                >
                  {user.is_active ? 'Disable' : 'Enable'}
                </button>
                {/* Edit User */}
                <button
                  onClick={() => updateUser(user)}
                  className="px-2 py-1 text-sm bg-yellow-500 text-white rounded-md"
                >
                  Edit
                </button>
                {/* Change Role */}
                <button
                  onClick={() => handleChangeRole(user)}
                  className="px-2 py-1 text-sm bg-blue-500 text-white rounded-md"
                >
                  Change Role
                </button>
                {/* Delete User */}
                <button
                  onClick={() => handleDeleteUser(user.user_id)}
                  className="px-2 py-1 text-sm bg-red-500 text-white rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageUsers;
