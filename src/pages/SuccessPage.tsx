import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, Copy, Share2 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Invitation } from '../types';

const SuccessPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    // In a real app, we would fetch this from an API
    // For this demo, we'll get it from localStorage
    const invitations = JSON.parse(localStorage.getItem('invitations') || '[]');
    const found = invitations.find((inv: Invitation) => inv.id === id);
    
    if (found) {
      setInvitation(found);
    }
  }, [id]);
  
  const inviteUrl = `${window.location.origin}/invite/${id}`;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  const shareInvitation = () => {
    if (navigator.share) {
      navigator.share({
        title: invitation?.what || 'Invitation',
        text: `You're invited to ${invitation?.what}!`,
        url: inviteUrl,
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      copyToClipboard();
    }
  };
  
  if (!invitation) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow py-10 px-6 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Invitation not found</h1>
            <p className="text-gray-600 mb-6">
              The invitation you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/create"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create a New Invitation
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow py-10 px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your invitation is ready!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Share the link below with your guests. The invitation will be available for 3 days.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-md flex items-center mb-8">
            <input
              type="text"
              value={inviteUrl}
              readOnly
              className="flex-grow bg-transparent border-none focus:outline-none text-gray-700"
            />
            <button
              onClick={copyToClipboard}
              className="ml-2 p-2 text-gray-500 hover:text-indigo-600 focus:outline-none"
              title="Copy to clipboard"
            >
              {copied ? (
                <Check className="h-5 w-5 text-green-500" />
              ) : (
                <Copy className="h-5 w-5" />
              )}
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to={`/invite/${id}`}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              View Invitation
            </Link>
            
            <button
              onClick={shareInvitation}
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Share2 className="mr-2 h-5 w-5" />
              Share
            </button>
          </div>
          
          <div className="mt-10 pt-6 border-t border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">What's next?</h2>
            <p className="text-gray-600 mb-4">
              Your guests can view the invitation by clicking the link. The invitation will automatically expire after 3 days.
            </p>
            <Link
              to="/create"
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Create another invitation
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SuccessPage;