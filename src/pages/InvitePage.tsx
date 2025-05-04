import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import InvitationCard from '../components/InvitationCard';
import { Invitation } from '../types';

const InvitePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, we would fetch this from an API
    // For this demo, we'll get it from localStorage
    const fetchInvitation = () => {
      setLoading(true);
      try {
        const invitations = JSON.parse(localStorage.getItem('invitations') || '[]');
        const found = invitations.find((inv: Invitation) => inv.id === id);
        
        if (found) {
          setInvitation(found);
        }
      } catch (error) {
        console.error('Error fetching invitation:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInvitation();
  }, [id]);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow py-10 px-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : invitation ? (
          <InvitationCard invitation={invitation} />
        ) : (
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Invitation not found</h2>
            <p className="text-gray-600">
              The invitation you're looking for doesn't exist or has been removed.
            </p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default InvitePage;