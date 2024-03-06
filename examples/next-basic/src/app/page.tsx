'use client';

/// Import necessary dependencies
import { useEdgeStore } from '@/lib/edgestore';
import * as React from 'react';
import Layout from '../app/components/layout';
import { useApp } from '../app/components/useApp';
import { Credentials } from 'realm-web'; // Import Credentials from realm-web
import clientPromise from '../lib/mongodb';

export default function Home() {
  const [file, setFile] = React.useState<File | null>(null);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLogin, setIsLogin] = React.useState(true);
  const { edgestore } = useEdgeStore();
  const app = useApp();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
  };

  const handleAuthentication = async () => {
    
    try {
      if (!app.currentUser) {
        throw new Error('User not authenticated');
      }

      // Perform authentication or user registration based on isLogin state
      if (isLogin) {
        await app.logIn(Credentials.emailPassword(username, password));
      } else {
        await app.emailPasswordAuth.registerUser(username, password);
      }

      // Continue with your EdgeStore or other actions after authentication
      if (file) {
        const res = await edgestore.publicFiles.upload({
          file,
          onProgressChange: (progress) => {
            console.log(progress);
          },
        });

        // Perform additional actions or API calls here
        console.log('File uploaded:', res);

        // Reset form fields after successful upload
        setFile(null);
        setUsername('');
        setPassword('');
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-4">
            {isLogin ? 'Login' : 'Register'}
          </h2>
          <label className="block mb-4">
            Email:
            <input
              className="border w-full p-2 mt-1"
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label className="block mb-4">
            Password:
            <input
              className="border w-full p-2 mt-1"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={handleAuthentication}
          >
            {isLogin ? 'Login' : 'Register'}
          </button>

          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">File Upload</h2>
            <input
              className="border p-2 mb-4"
              type="file"
              onChange={handleFileChange}
            />
            <button
              className="bg-green-500 text-white py-2 px-4 rounded"
              onClick={() => setIsLogin(false)}
            >
              Switch to Register
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
