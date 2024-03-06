// components/LoginModal.js
import React, { useState } from 'react';
import { Credentials } from 'realm-web';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = () => {
      onLogin(email, password);
    };
  
    return (
      isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded-md">
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <label className="block mb-2">
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 w-full"
              />
            </label>
            <label className="block mb-2">
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 w-full"
              />
            </label>
            <button onClick={handleLogin} className="bg-blue-500 text-white p-2 rounded">
              Log In
            </button>
            <button onClick={onClose} className="bg-gray-500 text-white p-2 rounded ml-2">
              Close
            </button>
          </div>
        </div>
      )
    );
  };

  export default LoginModal;