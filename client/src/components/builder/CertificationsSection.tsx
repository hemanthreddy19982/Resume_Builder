import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateCertifications, updateAchievements } from '../../redux/resumeSlice';
import { CertificationItem, AchievementItem } from '@shared/types';
import { Award, Plus, Trash2, Trophy } from 'lucide-react';

export const CertificationsSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const certifications = useAppSelector((state) => state.resume.currentResume.certifications || []);
  const achievements = useAppSelector((state) => state.resume.currentResume.achievements || []);

  const handleAddCert = () => {
    const newCert: CertificationItem = {
      id: 'cert-' + Date.now(),
      name: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      issueDate: '2024',
      expiryDate: '',
      credentialId: '',
      url: '',
    };
    dispatch(updateCertifications([...certifications, newCert]));
  };

  const handleUpdateCert = (id: string, field: keyof CertificationItem, value: any) => {
    const updated = certifications.map((c) => (c.id === id ? { ...c, [field]: value } : c));
    dispatch(updateCertifications(updated));
  };

  const handleDeleteCert = (id: string) => {
    dispatch(updateCertifications(certifications.filter((c) => c.id !== id)));
  };

  const handleAddAch = () => {
    const newAch: AchievementItem = {
      id: 'ach-' + Date.now(),
      title: 'Hackathon Winner',
      description: 'First place out of 50 teams.',
      date: '2024',
    };
    dispatch(updateAchievements([...achievements, newAch]));
  };

  const handleUpdateAch = (id: string, field: keyof AchievementItem, value: any) => {
    const updated = achievements.map((a) => (a.id === id ? { ...a, [field]: value } : a));
    dispatch(updateAchievements(updated));
  };

  const handleDeleteAch = (id: string) => {
    dispatch(updateAchievements(achievements.filter((a) => a.id !== id)));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Certifications */}
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b border-slate-200 pb-3">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" /> Certifications
          </h2>
          <button
            type="button"
            onClick={handleAddCert}
            className="px-3 py-1.5 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Certification
          </button>
        </div>

        <div className="space-y-3">
          {certifications.map((cert) => (
            <div key={cert.id} className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 flex gap-3 items-center">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => handleUpdateCert(cert.id, 'name', e.target.value)}
                  placeholder="Certification Name"
                  className="px-3 py-1.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) => handleUpdateCert(cert.id, 'issuer', e.target.value)}
                  placeholder="Issuing Organization"
                  className="px-3 py-1.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input
                  type="text"
                  value={cert.issueDate}
                  onChange={(e) => handleUpdateCert(cert.id, 'issueDate', e.target.value)}
                  placeholder="Issue Year / Month"
                  className="px-3 py-1.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <button type="button" onClick={() => handleDeleteCert(cert.id)} className="text-slate-400 hover:text-rose-600 p-1">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b border-slate-200 pb-3">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-purple-600" /> Key Honors & Awards
          </h2>
          <button
            type="button"
            onClick={handleAddAch}
            className="px-3 py-1.5 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Honor
          </button>
        </div>

        <div className="space-y-3">
          {achievements.map((ach) => (
            <div key={ach.id} className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 flex gap-3 items-center">
              <div className="flex-1 space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={ach.title}
                    onChange={(e) => handleUpdateAch(ach.id, 'title', e.target.value)}
                    placeholder="Award Title"
                    className="px-3 py-1.5 text-xs border border-slate-300 rounded-xl font-semibold outline-none"
                  />
                  <input
                    type="text"
                    value={ach.date}
                    onChange={(e) => handleUpdateAch(ach.id, 'date', e.target.value)}
                    placeholder="Date / Year"
                    className="px-3 py-1.5 text-xs border border-slate-300 rounded-xl outline-none"
                  />
                </div>
                <input
                  type="text"
                  value={ach.description}
                  onChange={(e) => handleUpdateAch(ach.id, 'description', e.target.value)}
                  placeholder="Brief description"
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-xl outline-none"
                />
              </div>
              <button type="button" onClick={() => handleDeleteAch(ach.id)} className="text-slate-400 hover:text-rose-600 p-1">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
