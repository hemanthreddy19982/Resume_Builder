export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  gpa: string;
  coursework: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
  bullets: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  technologies: string[];
  link: string;
  githubLink: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  level: number;
}

export interface SkillCategory {
  id: string;
  category: string;
  items: SkillItem[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  credentialId: string;
  url: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  date: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: string;
}

export interface ReferenceItem {
  id: string;
  name: string;
  position: string;
  company: string;
  email: string;
  phone: string;
}

export interface DeclarationData {
  text: string;
  place: string;
  date: string;
  signatureUrl: string;
  showSignature: boolean;
}

export interface PersonalDetails {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  twitter: string;
  portfolio: string;
  photoUrl: string;
  showPhoto: boolean;
  qrCodeUrl: string;
  showQrCode: boolean;
}

export interface Customizations {
  themeColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  fontSize: 'sm' | 'md' | 'lg';
  lineHeight: 'tight' | 'normal' | 'relaxed';
  margin: 'compact' | 'normal' | 'spacious';
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full';
  headerStyle: 'standard' | 'centered' | 'modern' | 'minimal' | 'banner' | 'sidebar';
  sectionOrder: string[];
  sectionVisibility: Record<string, boolean>;
  showIcons: boolean;
  backgroundStyle: 'white' | 'subtle' | 'card';
}

export interface ResumeData {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
  templateId: string;
  personal: PersonalDetails;
  objective: string;
  summary: string;
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skills: SkillCategory[];
  softSkills: string[];
  certifications: CertificationItem[];
  achievements: AchievementItem[];
  languages: LanguageItem[];
  hobbies: string[];
  strengths: string[];
  references: ReferenceItem[];
  declaration: DeclarationData;
  customizations: Customizations;
}
