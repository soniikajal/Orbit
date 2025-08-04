import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

interface UserRoleToggleProps {
  className?: string;
}

const UserRoleToggle: React.FC<UserRoleToggleProps> = ({ className = '' }) => {
  const { data: session, update } = useSession();
  const [isToggling, setIsToggling] = useState(false);

  const toggleRole = async () => {
    if (!session?.user?.id) return;

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
        // Update the session
        await update({
          ...session,
          user: {
            ...session.user,
            role: newRole,
          },
        });
        
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
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm text-gray-600">
        Role: 
      </span>
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        currentRole === 'admin' 
          ? 'bg-red-100 text-red-800' 
          : 'bg-gray-100 text-gray-800'
      }`}>
        {currentRole}
      </span>
      <button
        onClick={toggleRole}
        disabled={isToggling}
        className="px-3 py-1 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isToggling ? 'Switching...' : `Switch to ${currentRole === 'admin' ? 'User' : 'Admin'}`}
      </button>
    </div>
  );
};

export default UserRoleToggle;
