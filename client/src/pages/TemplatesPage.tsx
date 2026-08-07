import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/redux';
import { setTemplateId } from '../redux/resumeSlice';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { ALL_TEMPLATES } from '../constants/templatePresets';
import { FileText, Check, Sparkles } from 'lucide-react';

const CATEGORIES = ['All', 'Modern', 'Classic', 'Executive', 'Tech', 'Creative', 'Minimal', 'Special'];

export const TemplatesPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredTemplates =
    selectedCategory === 'All'
      ? ALL_TEMPLATES
      : ALL_TEMPLATES.filter((t) => t.category === selectedCategory);

  const handleSelectTemplate = (id: string) => {
    dispatch(setTemplateId(id));
    navigate('/builder');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> 25+ Handcrafted Resume Templates
          </div>
          <h1 className="text-4xl font-extrabold font-outfit text-slate-900">
            Choose A Proven Template For Your Career Path
          </h1>
          <p className="text-sm text-slate-600">
            Every template is tested against ATS software and tailored for maximum readability.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredTemplates.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div
                  className="w-full h-48 rounded-2xl mb-4 flex items-center justify-center text-white font-bold p-4 text-center shadow-inner relative overflow-hidden"
                  style={{ backgroundColor: t.previewColor }}
                >
                  <FileText className="w-12 h-12 opacity-30 group-hover:scale-110 transition-transform" />
                  {t.popular && (
                    <span className="absolute top-3 right-3 bg-amber-400 text-amber-950 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold shadow-sm">
                      POPULAR
                    </span>
                  )}
                  <span className="absolute bottom-3 left-3 bg-black/30 backdrop-blur px-2.5 py-0.5 rounded-lg text-[10px] font-semibold text-white">
                    {t.category}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base">{t.name}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{t.description}</p>
              </div>

              <button
                onClick={() => handleSelectTemplate(t.id)}
                className="mt-4 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-1"
              >
                <Check className="w-4 h-4" /> Use Template
              </button>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};
