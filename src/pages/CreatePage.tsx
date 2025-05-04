import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import InvitationForm from '../components/InvitationForm';

const CreatePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Create Your Invitation</h1>
          <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto text-center">
            Fill out the form below to create your personalized invitation. Your invitation link will be valid for 3 days.
          </p>
          
          <InvitationForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreatePage;