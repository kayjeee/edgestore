
'use client';

// Import necessary dependencies
// Import necessary dependencies
import { useEdgeStore } from '@/lib/edgestore';
import * as React from 'react';
import Layout from '../../app/components/layout';
import { useApp } from '../../app/components/useApp';
import clientPromise from '../../lib/mongodb';
// ... (existing imports)

export default function Page() {
  const [file, setFile] = React.useState<File | null>(null);
  const [school, setSchool] = React.useState('');
  const [schoolName, setSchoolName] = React.useState('');
  const [schoolemail, setSchoolEmail] = React.useState('');
  const { edgestore } = useEdgeStore();
  const app = useApp();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
  };

  const handleAuthenticationAndFormSubmission = async () => {
    try {
      if (!app.currentUser) {
        throw new Error('User not authenticated');
      }

    
      

      // Handle file upload to EdgeStore
      if (file) {
        const fileUploadResponse = await edgestore.publicFiles.upload({
          file,
          onProgressChange: (progress) => {
            console.log(progress);
          },
        });

        // Perform additional actions or API calls here using fetch or other methods
        const formDataObject = {
          school,
          schoolName,
          schoolemail,
          filename: file.name, // Include the filename in the form data
          logo: fileUploadResponse.url,
          user_id: app.currentUser?.profile.email,
        };

        const response = await fetch('https://data.mongodb-api.com/app/tasktracker-uuloe/endpoint/createschool', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${app.currentUser.accessToken}`,
          },
          body: JSON.stringify(formDataObject),
        });

        if (!response.ok) {
          throw new Error('Error submitting form data');
        }

        // Reset form fields after successful authentication and form submission
        setFile(null);
        setSchool('');
        setSchoolName('');
        setSchoolEmail('');
      }
    } catch (error) {
      console.error('Authentication and form submission error:', error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto mt-8 p-4 bg-gray-100 border rounded-md">
        <h1 className="text-2xl font-bold mb-4">Create a School</h1>
        <label className="block mb-4">
          School:
          <input
            className="border w-full p-2 mt-1"
            type="text"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
          />
        </label>
        <label className="block mb-4">
          School Name:
          <input
            className="border w-full p-2 mt-1"
            type="text"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
          />
        </label>
        <label className="block mb-4">
          School Email:
          <input
            className="border w-full p-2 mt-1"
            type="email"
            value={schoolemail}
            onChange={(e) => setSchoolEmail(e.target.value)}
          />
        </label>
        <label className="block mb-4">
          File:
          <input
            className="border p-2 mt-1"
            type="file"
            onChange={handleFileChange}
          />
        </label>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handleAuthenticationAndFormSubmission}
        >
          Submit
        </button>
      </div>
    </Layout>
  );
}
