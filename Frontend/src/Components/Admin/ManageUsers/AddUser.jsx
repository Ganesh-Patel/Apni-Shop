import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './Modal';
import { registerUser } from '../../../Utils/api.js'; 

function AddUser({ isOpen, onClose }) {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default to 'user'
  const [profilePic, setProfilePic] = useState(null);
  const [profilefordb, setProfilefordb] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilefordb(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role); // Admin selects the role
    formData.append('profilePic', profilefordb);

    try {
      const response = await registerUser(formData); // Assume this is the API call to add the user
      toast.success('User added successfully!');
      onClose(); // Close the modal after successful addition
    } catch (error) {
      toast.error('Failed to add user. Please try again.');
    }

    setLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ToastContainer />
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Add New User</h2>
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <div className="flex flex-col items-center">
            <div
              className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4 cursor-pointer relative"
              onClick={() => document.getElementById('profilePicInput').click()}
            >
              {profilePic ? (
                <img src={profilePic} alt="Profile" className="w-full h-full rounded-full object-cover" />
              ) : (
                <span className="text-gray-500">Browse</span>
              )}
            </div>
            <input
              id="profilePicInput"
              type="file"
              name="profilePic"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          <div>
            <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              id="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className={`w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Adding user...' : 'Add User'}
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default AddUser;
