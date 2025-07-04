import React, { useState, useEffect } from "react";
import axios from "axios";
import UserModal from "../components/model/UserModal";
import toast from "react-hot-toast";

const UpdateUser = ({ onClose, user, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const AppLink = process.env.REACT_APP_API_URI;

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e, triggerClose) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${AppLink}/api/user/update/${user._id}`,
        formData
      );
      localStorage.setItem(
        "userActionMessage",
        res.data.message || "User updated"
      );
      triggerClose();
      onSuccess();
      toast.success(res.data.message, { position: "top-right" });
    } catch (err) {
      console.error("Update user failed:", err);
    }
  };

  // const FormWithClose = ({ triggerClose }) => (
  //   <form className="space-y-4" onSubmit={(e) => handleSubmit(e, triggerClose)}>
  //     <div>
  //       <label className="block text-sm text-gray-600 mb-1">Name</label>
  //       <input
  //         name="name"
  //         value={formData.name}
  //         onChange={handleChange}
  //         placeholder="John Doe"
  //         className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
  //         required
  //       />
  //     </div>
  //     <div>
  //       <label className="block text-sm text-gray-600 mb-1">Email</label>
  //       <input
  //         name="email"
  //         type="email"
  //         value={formData.email}
  //         onChange={handleChange}
  //         placeholder="johndoe@example.com"
  //         className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
  //         required
  //       />
  //     </div>
  //     <div>
  //       <label className="block text-sm text-gray-600 mb-1">Address</label>
  //       <input
  //         name="address"
  //         value={formData.address}
  //         onChange={handleChange}
  //         placeholder="City or Country"
  //         className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
  //         required
  //       />
  //     </div>

  //     <div className="flex flex-col gap-2 pt-2">
  //       <button
  //         type="button"
  //         onClick={triggerClose}
  //         className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition"
  //       >
  //         Cancel
  //       </button>
  //       <button
  //         type="submit"
  //         className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"
  //       >
  //         Update
  //       </button>
  //     </div>
  //   </form>
  // );

  // return (
  //   <UserModal title="Update User" onClose={onClose}>
  //     {<FormWithClose />}
  //   </UserModal>
  // );
  return (
    <UserModal title="Update User" onClose={onClose}>
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
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"
            >
              Update
            </button>
          </div>
        </form>
      )}
    </UserModal>
  );
};

export default UpdateUser;
