import React, { useEffect, useState } from "react";

const UserModal = ({ title, children, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const triggerClose = () => {
    setIsClosing(true);
  };

  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        onClose();
      }, 300); // matches animation
      return () => clearTimeout(timer);
    }
  }, [isClosing, onClose]);

  return (
    <div className="fixed inset-0 z-50 px-4 sm:px-0 flex items-center justify-center bg-gradient-to-br from-blue-500 via-blue-200 to-blue-500 backdrop-blur-sm">
      <div
        className={`bg-white/5 p-6 rounded-2xl shadow-xl w-full max-w-md transform transition-all duration-300 ${
          isClosing ? "animate-fadeOut" : "animate-fadeIn"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <button
            onClick={triggerClose}
            className="text-gray-400 hover:text-gray-700 bg-gray-200 hover:bg-gray-300 px-1.5 pb-1 rounded-full text-2xl font-bold leading-none"
          >
            &times;
          </button>
        </div>

        {/* Inject child form and pass triggerClose */}
        {children(triggerClose)}
      </div>
    </div>
  );
};

export default UserModal;
