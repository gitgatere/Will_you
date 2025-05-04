import React from 'react';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-6 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-indigo-600">
          <Sparkles size={24} />
          <span>Will you?</span>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/create" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Create Invite
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;