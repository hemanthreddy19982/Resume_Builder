import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResumeData, Customizations } from '@shared/types';
import { initialResumeData } from '../constants/initialResumeData';

const LOCAL_STORAGE_KEY = 'resumebuilder_active_resume';
const LOCAL_STORAGE_LIST_KEY = 'resumebuilder_resumes_list';

const loadSavedResume = (): ResumeData => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Failed to parse saved resume from localStorage', e);
  }
  return initialResumeData;
};

const loadResumesList = (): ResumeData[] => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_LIST_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Failed to parse saved resumes list', e);
  }
  return [initialResumeData];
};

interface ResumeState {
  currentResume: ResumeData;
  pastHistory: ResumeData[];
  futureHistory: ResumeData[];
  resumesList: ResumeData[];
  activeStep: number;
  zoomLevel: number;
  devicePreviewMode: 'desktop' | 'tablet' | 'mobile';
  isAutoSaving: boolean;
  lastSavedAt: string | null;
}

const initialState: ResumeState = {
  currentResume: loadSavedResume(),
  pastHistory: [],
  futureHistory: [],
  resumesList: loadResumesList(),
  activeStep: 0,
  zoomLevel: 100,
  devicePreviewMode: 'desktop',
  isAutoSaving: false,
  lastSavedAt: new Date().toLocaleTimeString(),
};

export const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setResumeData: (state, action: PayloadAction<ResumeData>) => {
      state.pastHistory.push(JSON.parse(JSON.stringify(state.currentResume)));
      if (state.pastHistory.length > 20) state.pastHistory.shift();
      state.futureHistory = [];
      state.currentResume = action.payload;
      state.lastSavedAt = new Date().toLocaleTimeString();
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(action.payload));
    },
    updatePersonal: (state, action: PayloadAction<Partial<ResumeData['personal']>>) => {
      state.pastHistory.push(JSON.parse(JSON.stringify(state.currentResume)));
      state.currentResume.personal = { ...state.currentResume.personal, ...action.payload };
      state.currentResume.updatedAt = new Date().toISOString();
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.currentResume));
    },
    updateObjectiveSummary: (state, action: PayloadAction<{ objective?: string; summary?: string }>) => {
      state.pastHistory.push(JSON.parse(JSON.stringify(state.currentResume)));
      if (action.payload.objective !== undefined) state.currentResume.objective = action.payload.objective;
      if (action.payload.summary !== undefined) state.currentResume.summary = action.payload.summary;
      state.currentResume.updatedAt = new Date().toISOString();
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.currentResume));
    },
    updateEducation: (state, action: PayloadAction<ResumeData['education']>) => {
      state.pastHistory.push(JSON.parse(JSON.stringify(state.currentResume)));
      state.currentResume.education = action.payload;
      state.currentResume.updatedAt = new Date().toISOString();
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.currentResume));
    },
    updateExperience: (state, action: PayloadAction<ResumeData['experience']>) => {
      state.pastHistory.push(JSON.parse(JSON.stringify(state.currentResume)));
      state.currentResume.experience = action.payload;
      state.currentResume.updatedAt = new Date().toISOString();
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.currentResume));
    },
    updateProjects: (state, action: PayloadAction<ResumeData['projects']>) => {
      state.pastHistory.push(JSON.parse(JSON.stringify(state.currentResume)));
      state.currentResume.projects = action.payload;
      state.currentResume.updatedAt = new Date().toISOString();
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.currentResume));
    },
    updateSkills: (state, action: PayloadAction<ResumeData['skills']>) => {
      state.pastHistory.push(JSON.parse(JSON.stringify(state.currentResume)));
      state.currentResume.skills = action.payload;
      state.currentResume.updatedAt = new Date().toISOString();
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.currentResume));
    },
    updateSoftSkills: (state, action: PayloadAction<string[]>) => {
      state.pastHistory.push(JSON.parse(JSON.stringify(state.currentResume)));
      state.currentResume.softSkills = action.payload;
      state.currentResume.updatedAt = new Date().toISOString();
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.currentResume));
    },
    updateCertifications: (state, action: PayloadAction<ResumeData['certifications']>) => {
      state.pastHistory.push(JSON.parse(JSON.stringify(state.currentResume)));
      state.currentResume.certifications = action.payload;
      state.currentResume.updatedAt = new Date().toISOString();
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.currentResume));
    },
    updateAchievements: (state, action: PayloadAction<ResumeData['achievements']>) => {
      state.pastHistory.push(JSON.parse(JSON.stringify(state.currentResume)));
      state.currentResume.achievements = action.payload;
      state.currentResume.updatedAt = new Date().toISOString();
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.currentResume));
    },
    updateLanguages: (state, action: PayloadAction<ResumeData['languages']>) => {
      state.pastHistory.push(JSON.parse(JSON.stringify(state.currentResume)));
      state.currentResume.languages = action.payload;
      state.currentResume.updatedAt = new Date().toISOString();
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.currentResume));
    },
    updateHobbies: (state, action: PayloadAction<string[]>) => {
      state.pastHistory.push(JSON.parse(JSON.stringify(state.currentResume)));
      state.currentResume.hobbies = action.payload;
      state.currentResume.updatedAt = new Date().toISOString();
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.currentResume));
    },
    updateStrengths: (state, action: PayloadAction<string[]>) => {
      state.pastHistory.push(JSON.parse(JSON.stringify(state.currentResume)));
      state.currentResume.strengths = action.payload;
      state.currentResume.updatedAt = new Date().toISOString();
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.currentResume));
    },
    updateReferences: (state, action: PayloadAction<ResumeData['references']>) => {
      state.pastHistory.push(JSON.parse(JSON.stringify(state.currentResume)));
      state.currentResume.references = action.payload;
      state.currentResume.updatedAt = new Date().toISOString();
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.currentResume));
    },
    updateDeclaration: (state, action: PayloadAction<Partial<ResumeData['declaration']>>) => {
      state.pastHistory.push(JSON.parse(JSON.stringify(state.currentResume)));
      state.currentResume.declaration = { ...state.currentResume.declaration, ...action.payload };
      state.currentResume.updatedAt = new Date().toISOString();
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.currentResume));
    },
    updateCustomizations: (state, action: PayloadAction<Partial<Customizations>>) => {
      state.pastHistory.push(JSON.parse(JSON.stringify(state.currentResume)));
      state.currentResume.customizations = { ...state.currentResume.customizations, ...action.payload };
      state.currentResume.updatedAt = new Date().toISOString();
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.currentResume));
    },
    setTemplateId: (state, action: PayloadAction<string>) => {
      state.pastHistory.push(JSON.parse(JSON.stringify(state.currentResume)));
      state.currentResume.templateId = action.payload;
      state.currentResume.updatedAt = new Date().toISOString();
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.currentResume));
    },
    undo: (state) => {
      if (state.pastHistory.length > 0) {
        const previous = state.pastHistory.pop()!;
        state.futureHistory.unshift(JSON.parse(JSON.stringify(state.currentResume)));
        state.currentResume = previous;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(previous));
      }
    },
    redo: (state) => {
      if (state.futureHistory.length > 0) {
        const next = state.futureHistory.shift()!;
        state.pastHistory.push(JSON.parse(JSON.stringify(state.currentResume)));
        state.currentResume = next;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(next));
      }
    },
    setActiveStep: (state, action: PayloadAction<number>) => {
      state.activeStep = action.payload;
    },
    setZoomLevel: (state, action: PayloadAction<number>) => {
      state.zoomLevel = Math.max(50, Math.min(150, action.payload));
    },
    setDevicePreviewMode: (state, action: PayloadAction<'desktop' | 'tablet' | 'mobile'>) => {
      state.devicePreviewMode = action.payload;
    },
    saveCurrentResumeToList: (state) => {
      const idx = state.resumesList.findIndex((r) => r.id === state.currentResume.id);
      if (idx >= 0) {
        state.resumesList[idx] = state.currentResume;
      } else {
        state.resumesList.unshift(state.currentResume);
      }
      localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(state.resumesList));
    },
    createNewResume: (state, action: PayloadAction<{ title: string; templateId?: string }>) => {
      const newResume: ResumeData = {
        ...initialResumeData,
        id: 'resume-' + Date.now(),
        title: action.payload.title,
        templateId: action.payload.templateId || 'modern-clean',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.currentResume = newResume;
      state.resumesList.unshift(newResume);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newResume));
      localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(state.resumesList));
    },
    deleteResumeFromList: (state, action: PayloadAction<string>) => {
      state.resumesList = state.resumesList.filter((r) => r.id !== action.payload);
      localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(state.resumesList));
    },
    duplicateResume: (state, action: PayloadAction<string>) => {
      const target = state.resumesList.find((r) => r.id === action.payload) || state.currentResume;
      const dup: ResumeData = {
        ...JSON.parse(JSON.stringify(target)),
        id: 'resume-' + Date.now(),
        title: `${target.title} (Copy)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.resumesList.unshift(dup);
      localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(state.resumesList));
    },
    renameResumeInList: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const r = state.resumesList.find((x) => x.id === action.payload.id);
      if (r) {
        r.title = action.payload.title;
        r.updatedAt = new Date().toISOString();
        if (state.currentResume.id === action.payload.id) {
          state.currentResume.title = action.payload.title;
        }
        localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(state.resumesList));
      }
    },
  },
});

export const {
  setResumeData,
  updatePersonal,
  updateObjectiveSummary,
  updateEducation,
  updateExperience,
  updateProjects,
  updateSkills,
  updateSoftSkills,
  updateCertifications,
  updateAchievements,
  updateLanguages,
  updateHobbies,
  updateStrengths,
  updateReferences,
  updateDeclaration,
  updateCustomizations,
  setTemplateId,
  undo,
  redo,
  setActiveStep,
  setZoomLevel,
  setDevicePreviewMode,
  saveCurrentResumeToList,
  createNewResume,
  deleteResumeFromList,
  duplicateResume,
  renameResumeInList,
} = resumeSlice.actions;

export default resumeSlice.reducer;
