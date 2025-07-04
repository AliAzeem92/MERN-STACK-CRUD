import React from "react";
import UserModal from "../components/model/UserModal";

const AboutProject = ({ onClose }) => {
  return (
    <UserModal title="About This CRUD Project" onClose={onClose}>
      {() => (
        <div className="space-y-4 text-sm sm:text-base text-gray-700 max-h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100/30 hover:scrollbar-thumb-blue-500">
          <section>
            <h2 className="text-lg font-semibold text-indigo-600 mb-1">
              🧩 Tech Stack
            </h2>
            <ul className="list-disc list-inside pl-2 text-gray-800">
              <li>React.js + Tailwind CSS</li>
              <li>Node.js + Express.js (Backend)</li>
              <li>MongoDB (Database)</li>
              <li>Axios, React Hot Toast, Font Awesome</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-emerald-600 mb-1">
              ✅ Features
            </h2>
            <ul className="list-disc list-inside pl-2">
              <li>CRUD: Add, View, Update, Delete users</li>
              <li>Responsive design across all devices</li>
              <li>Reusable modal components</li>
              <li>Toast notifications</li>
              <li>Environment-based API config</li>
              <li>Fully deployed frontend (Vercel) + backend (Render)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-yellow-600 mb-1">
              🧠 What I Learned
            </h2>
            <ul className="list-disc list-inside pl-2">
              <li>Using React hooks effectively</li>
              <li>Working with APIs and error handling</li>
              <li>Optimizing build for production</li>
              <li>Basic deployment flow</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-rose-600 mb-1">
              🚧 Not Everything is Here... Yet
            </h2>
            <p className="text-gray-800 leading-relaxed">
              Like every meaningful project — this one has its gaps. But those
              gaps aren’t failures; they are the echoes of ambition. They're the
              spaces that remind us we're still building, still learning, still
              moving forward.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-blue-600 mb-1">
              🔮 A Work in Progress, Just Like Me
            </h2>
            <p className="text-gray-800 leading-relaxed mb-2">
              Here's what’s on the horizon — not to chase perfection, but to
              embrace growth:
            </p>
            <ul className="list-disc list-inside pl-2 text-gray-800">
              <li>Authentication — because identity matters</li>
              <li>Search & Pagination — to navigate complexity</li>
              <li>Form validation — to respect the user's input</li>
              <li>State management — to keep things in harmony</li>
            </ul>
            <p className="mt-3 italic text-sm text-gray-500">
              Life and code — both feel incomplete. And maybe that's okay.
              That’s what makes room for what comes next.
            </p>
          </section>

          <div className="pt-4 text-center">
            <p className="text-xs text-gray-500">
              Built with ❤️ by{" "}
              <span className="font-semibold text-indigo-600">Ali Azeem</span>
            </p>
          </div>
        </div>
      )}
    </UserModal>
  );
};

export default AboutProject;
