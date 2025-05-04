import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Sparkles } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Create and send beautiful invites in seconds
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
              No account required. Just create, customize, and share your invitation with a unique link.
            </p>
            <Link
              to="/create"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white shadow-lg"
            >
              Create an Invite
              <Sparkles className="ml-2 -mr-1 h-5 w-5" />
            </Link>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">What</h3>
                <p className="text-gray-600">
                  Specify the occasion or event you're inviting people to.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">When</h3>
                <p className="text-gray-600">
                  Set the date and time for your event.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Who</h3>
                <p className="text-gray-600">
                  Add the name of the person or group you're inviting.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Where</h3>
                <p className="text-gray-600">
                  Specify the location or provide a virtual meeting link.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Themes Section */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Beautiful Themes</h2>
            <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Choose from a variety of themes to match your event's style and mood.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg shadow-md overflow-hidden">
                <div className="p-6 text-white text-center">
                  <h3 className="text-xl font-bold mb-2">Birthday</h3>
                  <p>Perfect for birthday celebrations</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg shadow-md overflow-hidden">
                <div className="p-6 text-white text-center">
                  <h3 className="text-xl font-bold mb-2">Corporate</h3>
                  <p>Professional look for business events</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-amber-700 to-red-900 rounded-lg shadow-md overflow-hidden">
                <div className="p-6 text-white text-center">
                  <h3 className="text-xl font-bold mb-2">Harry Potter</h3>
                  <p>Magical theme for Potter fans</p>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-10">
              <Link
                to="/create"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Your Invitation
              </Link>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 px-6 bg-indigo-50">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to create your invitation?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              It only takes a minute to create a beautiful, personalized invitation that your guests will love.
            </p>
            <Link
              to="/create"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg"
            >
              Get Started Now
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;