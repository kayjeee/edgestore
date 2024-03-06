import React from 'react';

const ResourceTab = ({ resources, selectedSchool }) => (
  <div className="flex-grow overflow-y-auto">
    <h2 className="py-3 text-2xl font-bold">Resources View</h2>
    <p>
      Selected School:
      {' '}
      {selectedSchool}
    </p>

    {/* Display resources in a list with Tailwind CSS styles */}
    <ul className="list-disc list-inside">
      {resources.map((resource) => (
        <li key={resource.id} className="border border-gray-300 rounded p-4 my-2">
          {/* Display resource details */}
          <h3 className="text-lg font-bold mb-2">{resource.title}</h3>
          <p className="text-gray-600">{resource.resourcename}</p>
          <button
            type="button"
            onClick={() => window.open(resource.link, '_blank')}
            className="text-blue-500 underline cursor-pointer mt-2"
          >
            Download
          </button>
          {/* Add more details as needed */}
        </li>
      ))}
    </ul>

    {/* Show a message if there are no resources */}
    {resources.length === 0 && <p className="text-gray-600">No resources available for the selected school.</p>}
  </div>
);

export default ResourceTab;
