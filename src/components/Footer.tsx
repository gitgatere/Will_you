import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 px-6 bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Will you? All rights reserved.
            </p>
          </div>
          <div className="flex items-center space-x-1 text-gray-600 text-sm">
            <span>Made with</span>
            <Heart size={14} className="text-pink-500" />
            <span>by Will you? team</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;