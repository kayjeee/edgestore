// components/SideNav.js
import Link from 'next/link';

const SideNav = ({ school, selectedTab, onTabClick, isLoggedIn }) => {
    return (
      <div className="bg-gray-800 text-white p-4">
      <div className="mb-4">
        <h1>{school.schoolName}</h1>
        <img src={school.logo} alt="School Image" style={{ maxWidth: '200px', maxHeight: '100px' }} />
      </div>
        <h2 className="text-lg font-semibold mb-2">ChatGPT</h2>
        <ul className="space-y-2">
          <li>
            <Link href={`/schools/${encodeURIComponent(school.schoolName)}`}>
              <span onClick={() => onTabClick('details')}>
                <h2 className={`cursor-pointer ${selectedTab === 'details' ? 'text-blue-500' : ''}`}>
                  School Details
                </h2>
              </span>
            </Link>
          </li>
          <li>
            <span onClick={() => onTabClick('calendar')} className="cursor-pointer">
              <h2 className={`cursor-pointer ${selectedTab === 'calendar' ? 'text-blue-500' : ''}`}>
                Calendar
              </h2>
            </span>
          </li>
          <li>
            <span onClick={() => onTabClick('newsletter')} className="cursor-pointer">
              <h2 className={`cursor-pointer ${selectedTab === 'newsletter' ? 'text-blue-500' : ''}`}>
                Newsletter
              </h2>
            </span>
          </li>
          <li>
            <span onClick={() => onTabClick('resources')} className="cursor-pointer">
              <h2 className={`cursor-pointer ${selectedTab === 'resources' ? 'text-blue-500' : ''}`}>
                Resources
              </h2>
            </span>
          </li>
          <li>
            <span onClick={() => onTabClick('homework')} className="cursor-pointer">
              <h2 className={`cursor-pointer ${selectedTab === 'homework' ? 'text-blue-500' : ''}`}>
                Homework
              </h2>
            </span>
          </li>
          <li>
            <span onClick={() => onTabClick('contacts')} className="cursor-pointer">
              <h2 className={`cursor-pointer ${selectedTab === 'contacts' ? 'text-blue-500' : ''}`}>
                Contacts
              </h2>
            </span>
          </li>
          {/* Add more tabs as needed */}
        </ul>
      </div>
    );
  };

export default SideNav;