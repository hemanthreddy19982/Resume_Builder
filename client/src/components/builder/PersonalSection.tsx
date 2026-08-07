import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updatePersonal } from '../../redux/resumeSlice';
import { User, Mail, Phone, MapPin, Globe, Linkedin, Github, Camera, QrCode, Trash2 } from 'lucide-react';
import { PhotoCropperModal } from '../common/PhotoCropperModal';

export const PersonalSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const personal = useAppSelector((state) => state.resume.currentResume.personal);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    dispatch(updatePersonal({ [name]: type === 'checkbox' ? checked : value }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" /> Personal Details
        </h2>
        <p className="text-xs text-slate-500 mt-1">Enter your contact details, photo, and social links.</p>
      </div>

      {/* Photo & QR Code Toggle Panel */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
        {/* Photo Box */}
        <div className="flex items-center gap-4 flex-1">
          {personal.photoUrl ? (
            <div className="relative group">
              <img src={personal.photoUrl} alt="Avatar" className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-sm" />
              <button
                type="button"
                onClick={() => dispatch(updatePersonal({ photoUrl: '' }))}
                className="absolute -top-2 -right-2 bg-rose-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div
              onClick={() => setIsPhotoModalOpen(true)}
              className="w-16 h-16 rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-500 flex flex-col items-center justify-center text-slate-400 hover:text-blue-600 cursor-pointer transition-colors bg-white"
            >
              <Camera className="w-6 h-6" />
            </div>
          )}
          <div>
            <h4 className="text-xs font-bold text-slate-700">Profile Photo</h4>
            <p className="text-[11px] text-slate-400">Recommended size: 400x400</p>
            <div className="flex items-center gap-3 mt-1.5">
              <button
                type="button"
                onClick={() => setIsPhotoModalOpen(true)}
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                {personal.photoUrl ? 'Change Photo' : 'Upload Photo'}
              </button>
              <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  name="showPhoto"
                  checked={personal.showPhoto}
                  onChange={handleChange}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                Show on Resume
              </label>
            </div>
          </div>
        </div>

        {/* QR Code Settings */}
        <div className="flex items-center gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 sm:border-l border-slate-200 sm:pl-4">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <QrCode className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-700">QR Code Link</h4>
            <input
              type="text"
              name="qrCodeUrl"
              value={personal.qrCodeUrl || ''}
              onChange={handleChange}
              placeholder="e.g. portfolio URL"
              className="mt-1 px-2.5 py-1 text-xs border border-slate-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <label className="flex items-center gap-1.5 text-[11px] text-slate-600 mt-1 cursor-pointer">
              <input
                type="checkbox"
                name="showQrCode"
                checked={personal.showQrCode}
                onChange={handleChange}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              Show QR Code on Header
            </label>
          </div>
        </div>
      </div>

      {/* Main Personal Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
          <input
            type="text"
            name="fullName"
            value={personal.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Job Title / Target Role *</label>
          <input
            type="text"
            name="jobTitle"
            value={personal.jobTitle}
            onChange={handleChange}
            placeholder="Software Engineering Graduate"
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <Mail className="w-3.5 h-3.5 text-slate-400" /> Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={personal.email}
            onChange={handleChange}
            placeholder="john.doe@example.com"
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 text-slate-400" /> Phone Number *
          </label>
          <input
            type="text"
            name="phone"
            value={personal.phone}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" /> City, Country
          </label>
          <input
            type="text"
            name="location"
            value={personal.location}
            onChange={handleChange}
            placeholder="New York, NY"
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-slate-400" /> Website / Portfolio
          </label>
          <input
            type="text"
            name="website"
            value={personal.website}
            onChange={handleChange}
            placeholder="https://johndoe.dev"
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <Linkedin className="w-3.5 h-3.5 text-slate-400" /> LinkedIn Profile URL
          </label>
          <input
            type="text"
            name="linkedin"
            value={personal.linkedin}
            onChange={handleChange}
            placeholder="linkedin.com/in/johndoe"
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <Github className="w-3.5 h-3.5 text-slate-400" /> GitHub Profile URL
          </label>
          <input
            type="text"
            name="github"
            value={personal.github}
            onChange={handleChange}
            placeholder="github.com/johndoe"
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
      </div>

      <PhotoCropperModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        onPhotoSelected={(url) => dispatch(updatePersonal({ photoUrl: url, showPhoto: true }))}
      />
    </div>
  );
};
