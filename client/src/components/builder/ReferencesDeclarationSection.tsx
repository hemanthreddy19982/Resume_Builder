import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateReferences, updateDeclaration } from '../../redux/resumeSlice';
import { ReferenceItem } from '@shared/types';
import { FileCheck, Users, Plus, Trash2, FileSignature } from 'lucide-react';
import { SignatureModal } from '../common/SignatureModal';

export const ReferencesDeclarationSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const references = useAppSelector((state) => state.resume.currentResume.references || []);
  const declaration = useAppSelector((state) => state.resume.currentResume.declaration || {
    text: 'I hereby declare that all details provided in this resume are true and complete to the best of my knowledge.',
    place: 'New York, NY',
    date: new Date().toISOString().split('T')[0],
    signatureUrl: '',
    showSignature: true,
  });

  const [isSigModalOpen, setIsSigModalOpen] = useState<boolean>(false);

  const handleAddRef = () => {
    const newRef: ReferenceItem = {
      id: 'ref-' + Date.now(),
      name: 'Dr. John Professor',
      position: 'Department Head',
      company: 'State University',
      email: 'john@university.edu',
      phone: '+1 555-1234',
    };
    dispatch(updateReferences([...references, newRef]));
  };

  const handleUpdateRef = (id: string, field: keyof ReferenceItem, value: any) => {
    const updated = references.map((r) => (r.id === id ? { ...r, [field]: value } : r));
    dispatch(updateReferences(updated));
  };

  const handleDeleteRef = (id: string) => {
    dispatch(updateReferences(references.filter((r) => r.id !== id)));
  };

  const handleDeclarationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    dispatch(updateDeclaration({ [name]: type === 'checkbox' ? checked : value }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* References */}
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b border-slate-200 pb-3">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" /> References (Optional)
          </h2>
          <button
            type="button"
            onClick={handleAddRef}
            className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Reference
          </button>
        </div>

        <div className="space-y-3">
          {references.map((ref) => (
            <div key={ref.id} className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 flex gap-3 items-center">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <input
                  type="text"
                  value={ref.name}
                  onChange={(e) => handleUpdateRef(ref.id, 'name', e.target.value)}
                  placeholder="Full Name"
                  className="px-3 py-1.5 border border-slate-300 rounded-xl font-semibold outline-none"
                />
                <input
                  type="text"
                  value={ref.position}
                  onChange={(e) => handleUpdateRef(ref.id, 'position', e.target.value)}
                  placeholder="Designation / Position"
                  className="px-3 py-1.5 border border-slate-300 rounded-xl outline-none"
                />
                <input
                  type="text"
                  value={ref.company}
                  onChange={(e) => handleUpdateRef(ref.id, 'company', e.target.value)}
                  placeholder="Company / University"
                  className="px-3 py-1.5 border border-slate-300 rounded-xl outline-none"
                />
                <input
                  type="text"
                  value={ref.email}
                  onChange={(e) => handleUpdateRef(ref.id, 'email', e.target.value)}
                  placeholder="Email"
                  className="px-3 py-1.5 border border-slate-300 rounded-xl outline-none"
                />
              </div>
              <button type="button" onClick={() => handleDeleteRef(ref.id)} className="text-slate-400 hover:text-rose-600 p-1">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Declaration & Signature */}
      <div className="space-y-4">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-purple-600" /> Formal Declaration & Digital Signature
          </h2>
          <p className="text-xs text-slate-500 mt-1">Official declaration block required for traditional hiring drives.</p>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Declaration Statement</label>
            <textarea
              rows={2}
              name="text"
              value={declaration.text || ''}
              onChange={handleDeclarationChange}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Place</label>
              <input
                type="text"
                name="place"
                value={declaration.place || ''}
                onChange={handleDeclarationChange}
                placeholder="New York, NY"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={declaration.date || ''}
                onChange={handleDeclarationChange}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl outline-none"
              />
            </div>
          </div>

          {/* Signature Upload / Pad */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-200">
            <div className="flex items-center gap-3">
              {declaration.signatureUrl ? (
                <img src={declaration.signatureUrl} alt="Signature" className="h-10 border border-slate-200 rounded p-1 bg-white" />
              ) : (
                <span className="text-xs text-slate-400 italic">No signature attached</span>
              )}
              <button
                type="button"
                onClick={() => setIsSigModalOpen(true)}
                className="px-3 py-1.5 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <FileSignature className="w-4 h-4" /> {declaration.signatureUrl ? 'Change Signature' : 'Sign / Upload Signature'}
              </button>
            </div>

            <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                name="showSignature"
                checked={declaration.showSignature}
                onChange={handleDeclarationChange}
                className="rounded text-purple-600 focus:ring-purple-500"
              />
              Show Signature Footer
            </label>
          </div>
        </div>
      </div>

      <SignatureModal
        isOpen={isSigModalOpen}
        onClose={() => setIsSigModalOpen(false)}
        onSignatureSaved={(url) => dispatch(updateDeclaration({ signatureUrl: url, showSignature: true }))}
      />
    </div>
  );
};
