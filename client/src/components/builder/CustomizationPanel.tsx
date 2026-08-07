import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateCustomizations } from '../../redux/resumeSlice';
import { Palette, Type, Sliders, Eye, EyeOff, Layers } from 'lucide-react';

const PRESET_COLORS = [
  '#2563EB', // Primary Blue
  '#7C3AED', // Secondary Violet
  '#06B6D4', // Cyan Accent
  '#10B981', // Emerald Green
  '#0F172A', // Dark Slate
  '#EC4899', // Creative Pink
  '#F59E0B', // Warm Amber
  '#FF9900', // Amazon Orange
  '#0078D4', // Microsoft Blue
];

const FONTS = ['Inter', 'Outfit', 'Merriweather', 'Space Grotesk', 'Poppins'];

export const CustomizationPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const customizations = useAppSelector((state) => state.resume.currentResume.customizations || {
    themeColor: '#2563EB',
    fontFamily: 'Inter',
    fontSize: 'md',
    lineHeight: 'normal',
    margin: 'normal',
    borderRadius: 'md',
    headerStyle: 'standard',
    sectionOrder: ['objective', 'summary', 'education', 'experience', 'projects', 'skills'],
    sectionVisibility: {},
    showIcons: true,
    backgroundStyle: 'white',
  });

  const handleColorSelect = (color: string) => {
    dispatch(updateCustomizations({ themeColor: color }));
  };

  const handleToggleVisibility = (sectionKey: string) => {
    const currentVis = customizations.sectionVisibility || {};
    dispatch(
      updateCustomizations({
        sectionVisibility: {
          ...currentVis,
          [sectionKey]: currentVis[sectionKey] === undefined ? false : !currentVis[sectionKey],
        },
      })
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Palette className="w-5 h-5 text-blue-600" /> Template Styling & Customization
        </h2>
        <p className="text-xs text-slate-500 mt-1">Adjust colors, font styles, spacing, and section visibility.</p>
      </div>

      {/* Theme Color Picker */}
      <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Theme Primary Color</label>
        <div className="flex flex-wrap items-center gap-2.5">
          {PRESET_COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => handleColorSelect(c)}
              className={`w-7 h-7 rounded-full transition-transform shadow-sm ${
                customizations.themeColor === c ? 'scale-125 ring-2 ring-blue-500 ring-offset-2' : 'hover:scale-110'
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-300">
            <span className="text-xs text-slate-500 font-semibold">Custom HEX:</span>
            <input
              type="color"
              value={customizations.themeColor || '#2563EB'}
              onChange={(e) => handleColorSelect(e.target.value)}
              className="w-8 h-8 rounded border border-slate-300 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Typography & Spacing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
            <Type className="w-4 h-4 text-blue-600" /> Font Family
          </label>
          <select
            value={customizations.fontFamily || 'Inter'}
            onChange={(e) => dispatch(updateCustomizations({ fontFamily: e.target.value }))}
            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white outline-none font-medium"
          >
            {FONTS.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-blue-600" /> Font Size
          </label>
          <div className="flex gap-2">
            {(['sm', 'md', 'lg'] as const).map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => dispatch(updateCustomizations({ fontSize: size }))}
                className={`flex-1 py-1.5 text-xs font-bold rounded-xl border transition-all uppercase ${
                  customizations.fontSize === size
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Section Visibility Controls */}
      <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-blue-600" /> Section Visibility Toggle
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            { key: 'summary', label: 'Summary' },
            { key: 'education', label: 'Education' },
            { key: 'experience', label: 'Experience' },
            { key: 'projects', label: 'Projects' },
            { key: 'skills', label: 'Skills' },
            { key: 'certifications', label: 'Certifications' },
            { key: 'languages', label: 'Languages' },
            { key: 'references', label: 'References' },
            { key: 'declaration', label: 'Declaration' },
          ].map((sec) => {
            const isVisible = customizations.sectionVisibility?.[sec.key] !== false;
            return (
              <button
                key={sec.key}
                type="button"
                onClick={() => handleToggleVisibility(sec.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between border transition-all ${
                  isVisible ? 'bg-white border-slate-300 text-slate-800' : 'bg-slate-200/50 border-slate-200 text-slate-400 line-through'
                }`}
              >
                <span>{sec.label}</span>
                {isVisible ? <Eye className="w-3.5 h-3.5 text-blue-600" /> : <EyeOff className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
