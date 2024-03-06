const ResourcesTab = ({ resources }) => (
    <div className="flex-grow overflow-y-auto">
      <h2 className="text-xl font-bold mb-2">Resources</h2>
      <ul>
        {resources.map((resource) => (
          <li key={resource.id}>
            <h3>{resource.link}</h3>
            {/* Render other resource details */}
          </li>
        ))}
      </ul>
    </div>
  );