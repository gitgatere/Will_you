import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Image as ImageIcon } from 'lucide-react';
import { Invitation, THEMES } from '../types';
import { generateRandomId, getExpirationDate } from '../utils/helpers';

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const InvitationForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    what: '',
    when: '',
    who: '',
    where: '',
    theme: 'birthday',
    color: '#6366f1',
    image: null as File | null
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageError(null);
    
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file type
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        setImageError('Please upload a JPEG or PNG image');
        return;
      }
      
      // Validate file size
      if (file.size > MAX_IMAGE_SIZE) {
        setImageError('Image must be smaller than 10MB');
        return;
      }
      
      // Create a new image object to check dimensions
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      
      img.onload = () => {
        // If image is larger than 2000px in either dimension, resize it
        if (img.width > 2000 || img.height > 2000) {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Calculate new dimensions while maintaining aspect ratio
          let newWidth = img.width;
          let newHeight = img.height;
          
          if (img.width > img.height) {
            newWidth = 2000;
            newHeight = (img.height / img.width) * 2000;
          } else {
            newHeight = 2000;
            newWidth = (img.width / img.height) * 2000;
          }
          
          canvas.width = newWidth;
          canvas.height = newHeight;
          
          // Draw resized image to canvas
          ctx?.drawImage(img, 0, 0, newWidth, newHeight);
          
          // Convert canvas to blob
          canvas.toBlob((blob) => {
            if (blob) {
              const resizedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
              
              setFormData(prev => ({ ...prev, image: resizedFile }));
              setImagePreview(canvas.toDataURL(file.type));
            }
          }, file.type);
        } else {
          setFormData(prev => ({ ...prev, image: file }));
          setImagePreview(objectUrl);
        }
      };
      
      img.src = objectUrl;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, we would upload the image to a storage service
      // and get back a URL. For this demo, we'll use the data URL.
      let imageUrl = imagePreview;
      
      // Create invitation object
      const invitation: Invitation = {
        id: generateRandomId(10),
        what: formData.what,
        when: formData.when,
        who: formData.who,
        where: formData.where,
        theme: formData.theme,
        color: formData.color,
        imageUrl,
        expiresAt: getExpirationDate(),
        createdAt: new Date().toISOString()
      };
      
      // In a real app, we would save this to a database
      // For this demo, we'll save it to localStorage
      const invitations = JSON.parse(localStorage.getItem('invitations') || '[]');
      invitations.push(invitation);
      localStorage.setItem('invitations', JSON.stringify(invitations));
      
      // Navigate to success page
      navigate(`/success/${invitation.id}`);
    } catch (error) {
      console.error('Error creating invitation:', error);
      alert('Failed to create invitation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Your Invitation</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* What */}
          <div className="col-span-2">
            <label htmlFor="what" className="block text-sm font-medium text-gray-700 mb-1">
              What's the occasion?
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                id="what"
                name="what"
                value={formData.what}
                onChange={handleInputChange}
                placeholder="Birthday Party, Team Meeting, etc."
                required
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 border px-3"
              />
            </div>
          </div>
          
          {/* When */}
          <div>
            <label htmlFor="when" className="block text-sm font-medium text-gray-700 mb-1">
              When is it happening?
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Clock size={18} className="text-gray-400" />
              </div>
              <input
                type="datetime-local"
                id="when"
                name="when"
                value={formData.when}
                onChange={handleInputChange}
                required
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 border px-3"
              />
            </div>
          </div>
          
          {/* Who */}
          <div>
            <label htmlFor="who" className="block text-sm font-medium text-gray-700 mb-1">
              Who is it for?
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Users size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                id="who"
                name="who"
                value={formData.who}
                onChange={handleInputChange}
                placeholder="John Doe, Marketing Team, etc."
                required
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 border px-3"
              />
            </div>
          </div>
          
          {/* Where */}
          <div className="col-span-2">
            <label htmlFor="where" className="block text-sm font-medium text-gray-700 mb-1">
              Where is it happening?
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                id="where"
                name="where"
                value={formData.where}
                onChange={handleInputChange}
                placeholder="123 Main St, Zoom Meeting URL, etc."
                required
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 border px-3"
              />
            </div>
          </div>
          
          {/* Theme */}
          <div>
            <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-1">
              Choose a Theme
            </label>
            <select
              id="theme"
              name="theme"
              value={formData.theme}
              onChange={handleInputChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 border px-3"
            >
              {THEMES.map(theme => (
                <option key={theme.id} value={theme.id}>
                  {theme.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Color */}
          <div>
            <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
              Choose a Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                id="color"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                className="h-10 w-10 rounded border-gray-300 cursor-pointer"
              />
              <span className="text-sm text-gray-500">{formData.color}</span>
            </div>
          </div>
          
          {/* Image Upload */}
          <div className="col-span-2">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Upload an Image (Optional)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {imagePreview ? (
                  <div className="mb-3">
                    <img src={imagePreview} alt="Preview" className="mx-auto h-32 object-cover rounded" />
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <ImageIcon size={48} className="text-gray-300" />
                  </div>
                )}
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="image-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                  >
                    <span>Upload a file</span>
                    <input
                      id="image-upload"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                {imageError && (
                  <p className="text-sm text-red-600 mt-2">{imageError}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating...' : 'Create Invitation'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InvitationForm;