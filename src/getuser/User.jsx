import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import AddUser from "../models/AddUser";
import UpdateUser from "../models/UpdateUser";
import logo from "../assets/logo3.png";
import AboutProject from "../models/About";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(null);
  const [showAboutModal, setShowAboutModal] = useState(false);

  const AppLink = process.env.REACT_APP_API_URI;

  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get(`${AppLink}/api/users`);
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  }, [AppLink]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `${AppLink}/api/user/delete/${userId}`
      );
      setUsers(users.filter((user) => user._id !== userId));
      toast.success(response.data.message, { position: "top-right" });
    } catch (error) {
      toast.error("Failed to delete user");
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-500 via-blue-200 to-blue-500">
      <div className="flex-grow flex items-center justify-center p-4">
        <Toaster />
        <div className="w-full max-w-6xl bg-white/5 rounded-2xl shadow-2xl p-4 sm:p-6 overflow-x-auto">
          {/* Header */}
          <div className="flex flex-row justify-between items-center mb-6 gap-4">
            <h1 className="flex items-center text-2xl sm:text-3xl font-semibold text-white">
              <img src={logo} alt="Logo" className="w-14 h-14" />
              User List
              <button
                onClick={() => setShowAboutModal(true)}
                className="text-blue-100 hover:text-[#B197FC] transition duration-700 px-2 sm:px-3 "
              >
                {/* About This Project */}
                <i class="fa-solid fa-circle-info"></i>
              </button>
              {showAboutModal && (
                <AboutProject onClose={() => setShowAboutModal(false)} />
              )}
            </h1>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow flex items-center gap-2"
            >
              <i className="fa-solid fa-user-plus"></i>
              <span>Add User</span>
            </button>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="text-center text-white text-lg">
              <div className="flex justify-center items-center h-40">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center text-gray-400 text-lg">
              No users found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-indigo-600 text-white text-xs sm:text-sm uppercase tracking-wide">
                    <th className="p-2 sm:p-3 text-center rounded-tl-lg">
                      S.No
                    </th>
                    <th className="p-2 sm:p-3 text-center border-l">Name</th>
                    <th className="p-2 sm:p-3 text-center border-l">Email</th>
                    <th className="p-2 sm:p-3 text-center border-l">Address</th>
                    <th className="p-2 sm:p-3 text-center border-l rounded-tr-lg">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={user._id}
                      className="hover:bg-indigo-200 text-center border-b border-x border-gray-200 transition duration-200 text-xs sm:text-sm"
                    >
                      <td className="p-2 sm:p-3">{index + 1}</td>
                      <td className="p-3 border-l">{user.name}</td>
                      <td className="p-2 sm:p-3 border-l">{user.email}</td>
                      <td className="p-2 sm:p-3 border-l">{user.address}</td>
                      <td className="p-2 sm:p-3 border-l sm:space-x-2">
                        <button
                          onClick={() => setShowUpdateModal(user)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 sm:px-3 py-1 mb-1 sm:mb-0 rounded-md transition"
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button
                          onClick={() => deleteUser(user._id)}
                          className="bg-rose-500 hover:bg-rose-600 text-white px-2 sm:px-3 py-1 rounded-md transition"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modals */}
        {showAddModal && (
          <AddUser
            onClose={() => setShowAddModal(false)}
            onSuccess={fetchUsers}
          />
        )}
        {showUpdateModal && (
          <UpdateUser
            onClose={() => setShowUpdateModal(null)}
            user={showUpdateModal}
            onSuccess={fetchUsers}
          />
        )}
        {showAboutModal && (
          <AboutProject onClose={() => setShowAboutModal(false)} />
        )}
      </div>

      <footer className="text-center py-4 bg-white/10 text-white/80 transition-colors duration-700 hover:text-blue-500 text-sm sm:text-base backdrop-blur-md shadow-inner underline-offset-8 underline">
        <p className="tracking-wide">
          © {new Date().getFullYear()}{" "}
          <a
            href="https://github.com/AliAzeem92"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-white font-medium transition-colors duration-700 "
          >
            Ali Azeem
          </a>{" "}
          • All rights reserved
        </p>
      </footer>
    </div>
  );
};

export default User;
