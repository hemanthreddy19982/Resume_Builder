import React from 'react';
import { ResumeData } from '@shared/types';
import { ModernTemplate } from './ModernTemplate';
import { ClassicTemplate } from './ClassicTemplate';
import { ATSTemplate } from './ATSTemplate';
import { GoogleTemplate } from './GoogleTemplate';
import { StartupTemplate } from './StartupTemplate';
import { CreativeTemplate } from './CreativeTemplate';

interface TemplateRendererProps {
  data: ResumeData;
  templateId?: string;
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({ data, templateId }) => {
  const currentId = templateId || data.templateId || 'modern-clean';

  switch (currentId) {
    case 'classic-prof':
    case 'academic-research':
      return <ClassicTemplate data={data} />;
    case 'ats-master':
    case 'simple-one-pager':
      return <ATSTemplate data={data} />;
    case 'google-tech':
    case 'microsoft-azure':
    case 'amazon-leadership':
    case 'developer-stack':
    case 'engineer-core':
      return <GoogleTemplate data={data} />;
    case 'startup-dynamo':
    case 'ocean-blue':
    case 'emerald-green':
    case 'analyst-insights':
      return <StartupTemplate data={data} />;
    case 'creative-portfolio':
    case 'elegant-serenity':
    case 'designer-visual':
    case 'royal-purple':
    case 'dark-premium':
    case 'luxury-gold':
      return <CreativeTemplate data={data} />;
    case 'modern-clean':
    case 'executive-min':
    case 'corporate-elite':
    case 'minimal-fresh':
    case 'business-associate':
    case 'medical-health':
    default:
      return <ModernTemplate data={data} />;
  }
};
