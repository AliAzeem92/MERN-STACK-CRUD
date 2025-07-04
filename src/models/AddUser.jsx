import React, { useState } from "react";
import axios from "axios";
import UserModal from "../components/model/UserModal";
import toast from "react-hot-toast";

const AddUser = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const AppLink = process.env.REACT_APP_API_URI;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e, triggerClose) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${AppLink}/api/user`, formData);
      localStorage.setItem("userActionMessage", res.data.message);
      triggerClose(); // Smooth closing animation
      onSuccess();
      toast.success(res.data.message, { position: "top-right" });
    } catch (err) {
      console.error("Add user failed:", err);
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message, { position: "top-right" });
      } else {
        toast.error("Something went wrong", { position: "top-right" });
      }
    }
  };

  // Form JSX receives `triggerClose` from UserModal
  return (
    <UserModal title="Add New User" onClose={onClose}>
      {(triggerClose) => (
        <form
          className="space-y-4"
          onSubmit={(e) => handleSubmit(e, triggerClose)}
        >
          {/* Form fields remain the same */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="johndoe@example.com"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Address</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="City or Country"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <button
              type="button"
              onClick={triggerClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </UserModal>
  );
};

export default AddUser;
