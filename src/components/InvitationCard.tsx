import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Invitation, THEMES } from '../types';
import { formatDate, isExpired } from '../utils/helpers';

interface InvitationCardProps {
  invitation: Invitation;
}

const InvitationCard: React.FC<InvitationCardProps> = ({ invitation }) => {
  const [accepted, setAccepted] = useState(false);
  const theme = THEMES.find(t => t.id === invitation.theme) || THEMES[0];
  const expired = isExpired(invitation.expiresAt);
  
  const handleAccept = () => {
    if (!accepted) {
      setAccepted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };
  
  if (expired) {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">This invitation has expired</h2>
        <p className="text-gray-600">
          Invitations are only valid for 3 days after creation.
        </p>
      </div>
    );
  }

  return (
    <div 
      className="max-w-4xl mx-auto rounded-lg shadow-lg overflow-hidden"
      style={{ borderColor: invitation.color, borderWidth: '1px' }}
    >
      <div className={`${theme.backgroundClass} p-8 text-white text-center`}>
        <h1 className={`text-3xl md:text-4xl ${theme.fontClass} mb-2`}>
          {invitation.what}
        </h1>
        <p className="text-lg opacity-90">You're invited!</p>
      </div>
      
      {invitation.imageUrl && (
        <div className="w-full h-64 md:h-80 overflow-hidden">
          <img 
            src={invitation.imageUrl} 
            alt={invitation.what} 
            className="w-full h-full object-cover"
            style={{ maxHeight: '400px' }}
          />
        </div>
      )}
      
      <div className="bg-white p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-3">
            <Clock className="flex-shrink-0 h-6 w-6 text-gray-400" />
            <div>
              <h3 className="text-sm font-medium text-gray-500">When</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {formatDate(invitation.when)}
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Users className="flex-shrink-0 h-6 w-6 text-gray-400" />
            <div>
              <h3 className="text-sm font-medium text-gray-500">Who</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {invitation.who}
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 col-span-1 md:col-span-2">
            <MapPin className="flex-shrink-0 h-6 w-6 text-gray-400" />
            <div>
              <h3 className="text-sm font-medium text-gray-500">Where</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {invitation.where}
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <button
            onClick={handleAccept}
            className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${
              accepted ? 'bg-green-600 hover:bg-green-700' : 'hover:opacity-90'
            }`}
            style={{ backgroundColor: accepted ? undefined : invitation.color }}
            disabled={accepted}
          >
            {accepted ? 'See you there! 🎉' : "I'll be there!"}
          </button>
        </div>
      </div>
      
      <div className="bg-gray-50 px-6 py-4 text-center text-sm text-gray-500">
        Powered by Will you? • This invitation expires on {formatDate(invitation.expiresAt)}
      </div>
    </div>
  );
};

export default InvitationCard;