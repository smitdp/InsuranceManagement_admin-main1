import './AdminAnalytics.css';
import React, { useState } from 'react';
import AgentAnalytics from './AgentAnalytics/AgentAnalytics';
import ClaimAnalytics from './ClaimAnalytics/ClaimAnalytics';
import PolicyAnalytics from './PolicyAnalytics/PolicyAnalytics';
import UserAnalytics from './UserAnalytics/UserAnalytics';
import AuditLogAnalytics from './AuditLogAnalytics/AuditLogAnalytics';

export default function AdminAnalytics() {
const [selectedComponent, setSelectedComponent] = useState(null);

  const handleClick = (componentName) => {
    setSelectedComponent(componentName);
  };
  const renderComponent = () => {
    switch (selectedComponent) {
      case 'User Analytics':
        return <UserAnalytics />;
      case 'Policy Analytics':
        return <PolicyAnalytics />;
      case 'Claim Analytics':
        return <ClaimAnalytics />;
      case 'Agent Analytics':
        return <AgentAnalytics />;
      case 'AuditLog Analytics':
        return <AuditLogAnalytics />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div onClick={() => handleClick('User Analytics')}>User Analytics</div>
      <div onClick={() => handleClick('Policy Analytics')}>Policy Analytics</div>
      <div onClick={() => handleClick('Claim Analytics')}>Claim Analytics</div>
      <div onClick={() => handleClick('Agent Analytics')}>Agent Analytics</div>
      <div onClick={() => handleClick('AuditLog Analytics')}>Audit Log</div>

      {renderComponent()}
    </div>
  );
}