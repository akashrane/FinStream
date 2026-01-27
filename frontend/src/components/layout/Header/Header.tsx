import React from 'react';
import SearchBar from '../../ui/SearchBar';
import Button from '../../ui/Button';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const navigate = useNavigate();
  // Mock Keycloak for No-Auth deployment
  const keycloak = {
    authenticated: true,
    login: (options?: any) => { },
    logout: (options?: any) => window.location.reload()
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo and Search */}
        <div className="header-left">
          <div
            className="logo"
            onClick={handleLogoClick}
            style={{ cursor: 'pointer' }}
          >
            <span className="logo-text">FinStream</span>
            <span className="logo-subtitle">Finance</span>
          </div>
          <div className="header-search">
            <SearchBar
              placeholder="Search for news, tickers or companies"
              onSearch={(e) => console.log(e)}
              className="header-search-bar"
            />
          </div>
        </div>

        {/* User Actions */}
        <div className="header-actions">


          {/* Demo Button */}
          <a
            href="https://drive.google.com/file/d/1TQyOq37F1EtofhfGkHPbR9Tbuk7wj1A8/view"
            className="demo-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch Full Demo Here
          </a>

          {!keycloak.authenticated && (
            <Button
              variant="outline" size="small"
              onClick={() => keycloak.login({ redirectUri: window.location.origin + '/profile' })}
            >
              Sign in
            </Button>
          )}

          {!!keycloak.authenticated && (
            <Button
              type="button"
              className="text-blue-800"
              onClick={() => keycloak.logout({ redirectUri: window.location.origin })}
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;