import { ResumeData, ATSAnalysisResult } from '@shared/types';

export function evaluateATS(resume: ResumeData): ATSAnalysisResult {
  let score = 0;
  let completeness = 0;
  const feedback: ATSAnalysisResult['feedback'] = [];
  const missingKeywords: string[] = [];
  const formattingIssues: string[] = [];
  const sectionScores: Record<string, number> = {};

  // 1. Personal Info Check (Weight: 15)
  let personalScore = 0;
  if (resume.personal?.fullName?.trim()) personalScore += 3;
  if (resume.personal?.email?.trim() && resume.personal.email.includes('@')) personalScore += 4;
  if (resume.personal?.phone?.trim()) personalScore += 3;
  if (resume.personal?.location?.trim()) personalScore += 2;
  if (resume.personal?.linkedin?.trim()) personalScore += 3;
  sectionScores['personal'] = Math.min(100, Math.round((personalScore / 15) * 100));
  score += personalScore;

  if (!resume.personal?.linkedin) {
    feedback.push({
      type: 'warning',
      category: 'Contact Info',
      message: 'Adding your LinkedIn profile link increases recruiter response rate by 40%.',
      action: 'Add LinkedIn Link',
    });
  }

  // 2. Summary / Objective Check (Weight: 15)
  let summaryScore = 0;
  const text = (resume.summary || '') + ' ' + (resume.objective || '');
  const wordCountSummary = text.trim().split(/\s+/).filter(Boolean).length;

  if (wordCountSummary >= 25) {
    summaryScore = 15;
  } else if (wordCountSummary > 0) {
    summaryScore = 8;
    feedback.push({
      type: 'warning',
      category: 'Summary',
      message: 'Your summary is brief. Aim for 30-50 impactful words detailing your key strengths.',
    });
  } else {
    feedback.push({
      type: 'error',
      category: 'Summary',
      message: 'Missing Professional Summary or Career Objective. This is critical for ATS screening.',
    });
  }
  sectionScores['summary'] = Math.round((summaryScore / 15) * 100);
  score += summaryScore;

  // 3. Education Check (Weight: 20)
  let eduScore = 0;
  if (resume.education && resume.education.length > 0) {
    eduScore += 10;
    const hasDegree = resume.education.some((e) => e.degree && e.institution);
    if (hasDegree) eduScore += 10;
  } else {
    feedback.push({
      type: 'error',
      category: 'Education',
      message: 'Education section is empty. Freshers must list degree details.',
    });
  }
  sectionScores['education'] = Math.round((eduScore / 20) * 100);
  score += eduScore;

  // 4. Experience / Internships Check (Weight: 20)
  let expScore = 0;
  if (resume.experience && resume.experience.length > 0) {
    expScore += 10;
    const bulletCount = resume.experience.reduce((acc, curr) => acc + (curr.bullets?.length || 0), 0);
    if (bulletCount >= 3) expScore += 10;
    else {
      expScore += 5;
      feedback.push({
        type: 'info',
        category: 'Experience',
        message: 'Add action-oriented bullet points with quantifiable results to experience items.',
      });
    }
  } else {
    feedback.push({
      type: 'info',
      category: 'Experience',
      message: 'No experience listed. Consider adding academic internships or capstone projects.',
    });
  }
  sectionScores['experience'] = Math.round((expScore / 20) * 100);
  score += expScore;

  // 5. Projects Check (Weight: 15)
  let projScore = 0;
  if (resume.projects && resume.projects.length > 0) {
    projScore += 8;
    const hasTech = resume.projects.some((p) => p.technologies && p.technologies.length > 0);
    if (hasTech) projScore += 7;
  } else {
    feedback.push({
      type: 'warning',
      category: 'Projects',
      message: 'Key Projects are crucial for freshers to prove hands-on technical competencies.',
    });
  }
  sectionScores['projects'] = Math.round((projScore / 15) * 100);
  score += projScore;

  // 6. Skills Check (Weight: 15)
  let skillScore = 0;
  const totalSkillsCount = resume.skills?.reduce((acc, cat) => acc + (cat.items?.length || 0), 0) || 0;
  if (totalSkillsCount >= 6) {
    skillScore = 15;
  } else if (totalSkillsCount > 0) {
    skillScore = 8;
    feedback.push({
      type: 'warning',
      category: 'Skills',
      message: 'Listing 8+ relevant technical skills improves your keyword match rate.',
    });
  } else {
    feedback.push({
      type: 'error',
      category: 'Skills',
      message: 'Skills section is empty. Add core technical & soft skills.',
    });
  }
  sectionScores['skills'] = Math.round((skillScore / 15) * 100);
  score += skillScore;

  // Total Word Count
  const fullText = JSON.stringify(resume);
  const words = fullText.replace(/[^a-zA-Z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  if (wordCount < 200) {
    formattingIssues.push('Resume word count is low (< 200 words). Expand your bullet points.');
  }

  // Action Verbs Check
  const actionVerbs = ['developed', 'engineered', 'built', 'created', 'implemented', 'designed', 'optimized', 'managed', 'analyzed'];
  const lowerText = fullText.toLowerCase();
  const foundVerbs = actionVerbs.filter((verb) => lowerText.includes(verb));
  if (foundVerbs.length >= 3) {
    feedback.push({
      type: 'success',
      category: 'Keywords',
      message: `Great job using strong action verbs (${foundVerbs.join(', ')}).`,
    });
  } else {
    missingKeywords.push('Developed', 'Engineered', 'Optimized', 'Implemented');
  }

  // Completeness Calculation
  let filledSections = 0;
  const totalSections = 7;
  if (resume.personal?.fullName && resume.personal?.email) filledSections++;
  if (resume.summary || resume.objective) filledSections++;
  if (resume.education && resume.education.length > 0) filledSections++;
  if (resume.experience && resume.experience.length > 0) filledSections++;
  if (resume.projects && resume.projects.length > 0) filledSections++;
  if (resume.skills && resume.skills.length > 0) filledSections++;
  if (resume.certifications && resume.certifications.length > 0) filledSections++;

  completeness = Math.round((filledSections / totalSections) * 100);

  return {
    score: Math.min(100, Math.max(0, score)),
    completeness,
    wordCount,
    sectionScores,
    feedback,
    missingKeywords,
    formattingIssues,
  };
}
