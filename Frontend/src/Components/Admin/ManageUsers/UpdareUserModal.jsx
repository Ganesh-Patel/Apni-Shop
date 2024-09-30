import React, { useState } from 'react';

function UpdateUserModal({ isOpen, user, onClose, onUpdate }) {
  const [firstName, setFirstName] = useState(user.firstname || '');
  const [lastName, setLastName] = useState(user.lastname || '');
  const [email, setEmail] = useState(user.email || '');
  const [role, setRole] = useState(user.role || '');
  const [profilePic, setProfilePic] = useState(user.profilePic || null);  // Initialize with user profilePic
  const [isActive, setIsActive] = useState(user.is_active);
  const [hover, setHover] = useState(false);  // Track hover state

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    setProfilePic(URL.createObjectURL(e.target.files[0]));  // Display selected image immediately
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('firstname', firstName);
    formData.append('lastname', lastName);
    formData.append('email', email);
    formData.append('role', role);
    formData.append('is_active', isActive);
    if (profilePic) {
      formData.append('profilePic', profilePic);
    }

    await onUpdate(user._id, formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          
          {/* Profile Picture Display */}
          <div
            className="relative w-24 h-24 mb-6 mx-auto cursor-pointer"
            onClick={() => document.getElementById('profilePicInput').click()}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-full text-gray-500">
                No Image
              </div>
            )}

            {/* Hover overlay */}
            {hover && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full text-white text-sm">
                Change Profile Pic
              </div>
            )}

            {/* Hidden file input */}
            <input
              type="file"
              id="profilePicInput"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* First Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 p-2 block w-full border rounded-md"
              required
            />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 p-2 block w-full border rounded-md"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 block w-full border rounded-md"
              required
            />
          </div>

          {/* Role Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-md"
              required
            >
              <option value="" disabled>Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          {/* Active Status */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Active Status</label>
            <select
              value={isActive}
              onChange={(e) => setIsActive(e.target.value === 'true')}
              className="mt-1 block w-full p-2 border rounded-md"
              required
            >
              <option value="true">Active</option>
              <option value="false">Disabled</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-teal-600 text-white px-4 py-2 rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUserModal;
