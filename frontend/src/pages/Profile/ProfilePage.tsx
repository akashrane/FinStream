// ProfilePage.tsx
import { useState, useEffect } from 'react';
import { useSubscription } from '../../context/SubscriptionContext';
import { generateReceipt } from '../../services/pdfService';
import './ProfilePage.css';
import {
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CreditCardIcon,
  PencilSquareIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const ProfilePage = () => {
  // Mock Keycloak for No-Auth
  const keycloak = { authenticated: true, token: 'mock-token' };
  const { openModal } = useSubscription();
  const [profile, setProfile] = useState({
    name: 'Demo User',
    email: 'demo@finstream.com',
    phone_number: '+1 (555) 123-4567',
    address: '123 Wall Street, NY',
    subscription: "Free",
    payment_history: []
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    try {
      // @ts-ignore
      if (profile.subscription_history) {
      }
    } catch (e) { }
  }, [profile]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle edit mode
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Save changes (Mock)
  const handleSave = async () => {
    alert('Profile updated successfully! (Demo Mode)');
    setIsEditing(false);
  };

  if (loading) return <div className="profile-loading"><div className="spinner"></div></div>;

  // Generate initials for avatar
  const initials = profile.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="profile-page">
      <div className="profile-header-section">
        <h1 className="gradient-text">Profile Management</h1>
        <p className="subtitle">Manage your personal information and subscription settings</p>
      </div>

      <div className="profile-tabs">
        <button
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          Payment History
        </button>
      </div>

      <div className="profile-container glass-panel">
        <div className="profile-sidebar">
          <div className="avatar-circle">
            {initials || <UserCircleIcon className="w-12 h-12" />}
          </div>
          <h2 className="profile-name">{profile.name || 'User'}</h2>
          <span className={`subscription-badge ${profile.subscription === 'Premium' ? 'premium' : 'free'}`}>
            {profile.subscription || 'Free Plan'}
          </span>
        </div>

        <div className="profile-details">
          {activeTab === 'overview' ? (
            <>
              <div className="section-header">
                <h3>Personal Information</h3>
                {!isEditing && (
                  <button className="icon-btn edit-btn" onClick={handleEdit} title="Edit Profile">
                    <PencilSquareIcon className="btn-icon" />
                  </button>
                )}
              </div>

              <div className="fields-grid">
                <div className="profile-field">
                  <label><UserCircleIcon className="field-icon" /> Full Name</label>
                  {isEditing ? (
                    <input type="text" name="name" value={profile.name} onChange={handleChange} className="glass-input" placeholder="John Doe" />
                  ) : (
                    <span className="field-value">{profile.name}</span>
                  )}
                </div>

                <div className="profile-field">
                  <label><EnvelopeIcon className="field-icon" /> Email Address</label>
                  {isEditing ? (
                    <input type="email" name="email" value={profile.email} onChange={handleChange} className="glass-input" placeholder="john@example.com" disabled />
                  ) : (
                    <span className="field-value">{profile.email}</span>
                  )}
                </div>

                <div className="profile-field">
                  <label><PhoneIcon className="field-icon" /> Phone Number</label>
                  {isEditing ? (
                    <input type="tel" name="phone_number" value={profile.phone_number} onChange={handleChange} className="glass-input" placeholder="+1 (555) 000-0000" />
                  ) : (
                    <span className="field-value">{profile.phone_number || 'Not set'}</span>
                  )}
                </div>

                <div className="profile-field full-width">
                  <label><MapPinIcon className="field-icon" /> Address</label>
                  {isEditing ? (
                    <input type="text" name="address" value={profile.address} onChange={handleChange} className="glass-input" placeholder="123 FinStream Blvd" />
                  ) : (
                    <span className="field-value">{profile.address || 'Not set'}</span>
                  )}
                </div>

                <div className="profile-field full-width">
                  <label><CreditCardIcon className="field-icon" /> Current Plan</label>
                  <div className="plan-display">
                    <span className="plan-name">{profile.subscription || 'Free'}</span>
                    {profile.subscription !== 'Premium' && (
                      <button className="upgrade-link" onClick={openModal}>Upgrade to Premium</button>
                    )}
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="profile-actions-footer">
                  <button className="action-btn cancel-btn" onClick={handleEdit}>
                    <XMarkIcon className="btn-icon-sm" /> Cancel
                  </button>
                  <button className="action-btn save-btn" onClick={handleSave}>
                    <CheckIcon className="btn-icon-sm" /> Save Changes
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="section-header">
                <h3>Payment History</h3>
              </div>
              <div className="history-table-container">
                {/* @ts-ignore */}
                {profile.payment_history && profile.payment_history.length > 0 ? (
                  <table className="history-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Transaction ID</th>
                        <th>Plan</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Receipt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* @ts-ignore */}
                      {profile.payment_history.map((txn: any, idx: number) => (
                        <tr key={idx}>
                          <td>{txn.date}</td>
                          <td>{txn.id}</td>
                          <td>{txn.planName}</td>
                          <td>{txn.amount}</td>
                          <td><span className="status-badge success">{txn.status}</span></td>
                          <td>
                            <button className="download-btn" onClick={() => generateReceipt({
                              ...txn,
                              userEmail: profile.email,
                              userName: profile.name
                            })}>
                              Download
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="no-history">No payment history available.</div>
                )}
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
