// components/School.js
import React, { useState, useEffect } from 'react';
import Layout from './layout';
import SideNav from './SideNav';
import LoginModal from './LoginModal';
import { useApp } from './useApp';


export default function School({ school, resources }) {
    console.log('School Data:', school);
    console.log('Resources Data:', resources);
    const app = useApp();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedTab, setSelectedTab] = useState('details');
  
    useEffect(() => {
      setIsLoggedIn(app?.currentUser !== null);
    }, [app?.currentUser]);
  
    const openModal = () => {
      setShowModal(true);
    };
  
    const closeAndLogin = (email, password) => {
      handleLogin(email, password);
      setShowModal(false);
    };
  
    const handleLogin = async (email, password) => {
      try {
        const credentials = Credentials.emailPassword(email, password);
        await app.logIn(credentials);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Login failed:', error.message);
      }
    };
  
    const handleTabClick = (tab) => {
      if (tab === 'resources' && !isLoggedIn) {
        openModal();
      } else {
        setSelectedTab(tab);
      }
    };
  
    return (
      <Layout>
        <div className="flex">
          <SideNav school={school} selectedTab={selectedTab} onTabClick={handleTabClick} isLoggedIn={isLoggedIn} />
          <div className="flex-1 p-4">
            <h1 className="text-2xl font-bold mb-4">{school.schoolName}</h1>
            <p className="text-md font-medium">{school.schoolemail}</p>
            <p className="text-sm text-gray-600">{school.user_id}</p>
            {!isLoggedIn && (
              <button onClick={openModal} className="bg-blue-500 text-white p-2 rounded">
                View School Details
              </button>
            )}
          </div>
        </div>
        <div className="p-4">
          {selectedTab === 'details' && (
            <>
              <h1 className="text-2xl font-bold mb-4">School Details</h1>
              {/* Render school details here */}
            </>
          )}
          {selectedTab === 'resources' && isLoggedIn && (
            <>
              <h1 className="text-2xl font-bold mb-4">School Resources</h1>
              <ul>
                {resources.map((resource) => (
                  <li key={resource.id}>
                    <h2>{resource.link}</h2>
                    {/* Render other resource details */}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <LoginModal isOpen={showModal} onClose={() => setShowModal(false)} onLogin={closeAndLogin} />
      </Layout>
    );

export default School;