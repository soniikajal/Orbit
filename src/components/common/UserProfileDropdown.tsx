import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

interface UserProfileDropdownProps {
  className?: string;
}

const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({ className = '' }) => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const toggleRole = async () => {
    if (!session?.user) return;

    const currentRole = session.user.role || 'user';
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    
    if (!confirm(`Switch from ${currentRole} to ${newRole}?`)) {
      return;
    }

    setIsToggling(true);
    
    try {
      const response = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userId: session.user.id, 
          newRole 
        }),
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        // Refresh the page to apply new permissions
        window.location.reload();
      } else {
        alert(data.message || 'Failed to update role');
      }
    } catch (error) {
      console.error('Error toggling role:', error);
      alert('Error updating role');
    } finally {
      setIsToggling(false);
    }
  };

  if (!session?.user) return null;

  const currentRole = session.user.role || 'user';

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <div className="flex flex-col items-start">
          <span className="text-sm">{session.user.name || session.user.email}</span>
          <span className={`text-xs ${currentRole === 'admin' ? 'text-red-600' : 'text-gray-500'}`}>
            {currentRole}
          </span>
        </div>
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="py-2">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">{session.user.name}</p>
              <p className="text-xs text-gray-500">{session.user.email}</p>
            </div>
            
            <div className="px-4 py-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Current Role:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  currentRole === 'admin' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {currentRole}
                </span>
              </div>
              
              <button
                onClick={toggleRole}
                disabled={isToggling}
                className="w-full mt-2 px-3 py-1 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isToggling ? 'Switching...' : `Switch to ${currentRole === 'admin' ? 'User' : 'Admin'}`}
              </button>
            </div>

            <div className="border-t border-gray-100 mt-2">
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;
