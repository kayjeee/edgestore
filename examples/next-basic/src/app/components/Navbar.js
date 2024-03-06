// components/Navbar.tsx
import Link from 'next/link';

const navbarStyle = {
  backgroundColor: '#fff',
  borderBottom: '1px solid #ddd',
};

const containerStyle = {
  maxWidth: '100%',
  margin: '0 auto',
  height: '80px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 1rem',
};

const appNameStyle = {
  color: '#333',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const linkStyle = {
  color: '#333',
  cursor: 'pointer',
};

function Navbar() {
  return (
    <nav style={navbarStyle}>
      <div style={containerStyle}>
        <Link href="/" passHref>
          <span style={appNameStyle}>Your App Name</span>
        </Link>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/home" passHref>
            <span style={linkStyle}>Home</span>
          </Link>
          <Link href="/feeds" passHref>
            <span style={linkStyle}>Feeds</span>
          </Link>
          {/* Add more links as needed */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
