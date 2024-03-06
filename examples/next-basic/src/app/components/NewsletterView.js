import React, { useState } from 'react';

const NewsletterView = ({ school, newsletters, selectedSchool }) => {
  const [selectedNewsletter, setSelectedNewsletter] = useState(null);

  const openNewsletterModal = (newsletter) => {
    setSelectedNewsletter(newsletter);
  };

  const closeNewsletterModal = () => {
    setSelectedNewsletter(null);
  };

  return (
    <div className="h-screen">
      <div className="mx-auto px-4">
        <div className="flex-grow flex flex-col justify-center items-center text-center">
          <h2 className="text-xl font-bold mb-2">Newsletters</h2>
          <ul>
            {newsletters.map((newsletter) => (
              <div className="bg-blue-200 p-4 rounded mb-4" key={newsletter._id}>
                <div className="flex items-center relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 absolute top-0 right-0 mt-1 ml-1"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                  </svg>
                  {school && school.logo && (
                    <img
                      src={school.logo}
                      alt="School Logo"
                      className="w-1/8 rounded-l-md mr-2"
                      style={{ maxWidth: '200px', maxHeight: '100px' }}
                    />
                  )}
                  <div>
                    <p className="text-sm font-bold text-gray-700 mb-2">
                      Date:
                      {' '}
                      {new Date(newsletter.date).toLocaleString()}
                    </p>
                    <h3
                      className="text-lg font-bold mb-2 text-gray-700 cursor-pointer"
                      onClick={() => openNewsletterModal(newsletter)}
                    >
                      {newsletter.title}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  News:
                  {' '}
                  {newsletter.news}
                </p>
                {/* Add more content as needed */}
              </div>
            ))}
          </ul>
        </div>
      </div>
      {selectedNewsletter && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded-md">
            <span className="close text-3xl cursor-pointer" onClick={closeNewsletterModal}>
              &times;
            </span>
            <h2 className="text-2xl font-semibold mb-4">{selectedNewsletter.title}</h2>
            <p>{selectedNewsletter.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsletterView;
