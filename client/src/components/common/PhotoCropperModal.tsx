import React, { useState, useRef } from 'react';
import { Camera, Upload, X, Check, RotateCw } from 'lucide-react';
import { api } from '../../services/api';

interface PhotoCropperModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPhotoSelected: (url: string) => void;
}

export const PhotoCropperModal: React.FC<PhotoCropperModalProps> = ({ isOpen, onClose, onPhotoSelected }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [rotation, setRotation] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleSave = async () => {
    if (!selectedFile && !previewUrl) return;

    if (selectedFile) {
      try {
        setUploading(true);
        const res = await api.uploadPhoto(selectedFile);
        if (res.success && res.url) {
          onPhotoSelected(res.url);
          onClose();
          return;
        }
      } catch (err) {
        console.warn('Backend photo upload offline, using local data URL fallback', err);
      }
    }

    if (previewUrl) {
      onPhotoSelected(previewUrl);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-slate-800">Upload & Edit Profile Photo</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex flex-col items-center gap-6">
          {previewUrl ? (
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-blue-100 shadow-inner flex items-center justify-center bg-slate-100">
              <img
                src={previewUrl}
                alt="Profile Preview"
                style={{ transform: `rotate(${rotation}deg)` }}
                className="w-full h-full object-cover transition-transform duration-300"
              />
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-48 border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all bg-slate-50/50 hover:bg-blue-50/30 group"
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-slate-600">Click to upload photo (PNG, JPG)</p>
              <p className="text-xs text-slate-400">Max size: 5MB</p>
            </div>
          )}

          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

          {previewUrl && (
            <div className="flex gap-3 w-full">
              <button
                type="button"
                onClick={handleRotate}
                className="flex-1 py-2 px-3 border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2 text-sm font-medium transition-colors"
              >
                <RotateCw className="w-4 h-4" /> Rotate
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 py-2 px-3 border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2 text-sm font-medium transition-colors"
              >
                <Upload className="w-4 h-4" /> Change
              </button>
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-slate-600 hover:bg-slate-200/60 rounded-xl text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!previewUrl || uploading}
            onClick={handleSave}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold flex items-center gap-2 shadow-lg shadow-blue-600/20 disabled:opacity-50 transition-all"
          >
            {uploading ? 'Saving...' : <><Check className="w-4 h-4" /> Apply Photo</>}
          </button>
        </div>
      </div>
    </div>
  );
};
