export interface AIJobDomain {
  role: string;
  category: string;
  summaries: string[];
  objectives: string[];
  recommendedSkills: { category: string; skills: string[] }[];
  actionVerbs: string[];
  keywords: string[];
}

export const AI_SUGGESTIONS: AIJobDomain[] = [
  {
    role: 'Full Stack Software Developer',
    category: 'Engineering',
    summaries: [
      'Detail-oriented Full Stack Developer with hands-on experience in React, Node.js, Express, and modern TypeScript. Proven ability to build responsive frontends, optimize RESTful APIs, and deliver end-to-end web applications with clean code architecture.',
      'Enthusiastic Software Engineering graduate skilled in modern JavaScript/TypeScript ecosystems, database design, and cloud deployment. Adept at collaborative team environments, problem-solving, and writing scalable, maintainable code.',
      'Results-driven Junior Developer with strong technical foundation in full stack development, git workflows, and unit testing. Eager to leverage problem-solving skills to build high-performance web products.',
    ],
    objectives: [
      'Seeking an entry-level Full Stack Developer role to apply technical expertise in React, Node.js, and TypeScript toward building scalable customer-facing software products.',
      'Motivated Computer Science graduate aspiring to join an innovative technology team as a Junior Software Engineer, contributing to robust web applications and backend API infrastructure.',
    ],
    recommendedSkills: [
      { category: 'Frontend', skills: ['React 19', 'TypeScript', 'TailwindCSS', 'Next.js', 'Redux Toolkit', 'HTML5/CSS3'] },
      { category: 'Backend', skills: ['Node.js', 'Express.js', 'REST APIs', 'GraphQL', 'MongoDB', 'PostgreSQL'] },
      { category: 'DevOps & Tools', skills: ['Git / GitHub', 'Docker', 'Vite', 'Postman', 'CI/CD Pipelines', 'AWS Basics'] },
    ],
    actionVerbs: ['Architected', 'Developed', 'Engineered', 'Optimized', 'Integrated', 'Implemented', 'Refactored', 'Deployed'],
    keywords: ['React', 'TypeScript', 'Node.js', 'REST API', 'Agile', 'Git', 'Unit Testing', 'CI/CD', 'Scalability'],
  },
  {
    role: 'Data Analyst / BI Engineer',
    category: 'Analytics',
    summaries: [
      'Analytical Data Analyst graduate proficient in Python, SQL, Tableau, and Excel. Skilled in transforming raw datasets into actionable insights through statistical analysis, data visualization dashboards, and predictive modeling.',
      'Detail-driven Data Analyst with experience in SQL query optimization, data cleaning, and automated reporting. Eager to solve complex business problems through data-driven decisions.',
    ],
    objectives: [
      'Ambitious Data Analyst graduate seeking a Junior BI Analyst position to utilize advanced SQL, Python, and data visualization skills to drive strategic business growth.',
    ],
    recommendedSkills: [
      { category: 'Languages & Tools', skills: ['Python', 'SQL', 'R', 'Excel (VBA / Pivot)', 'Pandas', 'NumPy'] },
      { category: 'Visualization', skills: ['Tableau', 'Power BI', 'Matplotlib', 'Seaborn', 'Looker Studio'] },
      { category: 'Databases', skills: ['PostgreSQL', 'MySQL', 'Snowflake', 'BigQuery'] },
    ],
    actionVerbs: ['Analyzed', 'Modeled', 'Extracted', 'Visualized', 'Automated', 'Calculated', 'Forecasted', 'Queried'],
    keywords: ['SQL', 'Python', 'Tableau', 'Power BI', 'Data Cleaning', 'ETL', 'Statistical Analysis', 'A/B Testing'],
  },
  {
    role: 'UI/UX & Product Designer',
    category: 'Design',
    summaries: [
      'User-centric UI/UX Designer with expertise in wireframing, high-fidelity prototyping, design systems, and usability testing. Passionate about crafting intuitive digital experiences in Figma.',
      'Creative Product Designer graduate adept at translating user research into clean visual design systems and interactive prototypes for desktop and mobile applications.',
    ],
    objectives: [
      'Seeking a Junior UI/UX Designer role to apply user research, Figma prototyping, and modern design systems to elevate product usability and customer engagement.',
    ],
    recommendedSkills: [
      { category: 'Design Tools', skills: ['Figma', 'Adobe XD', 'Illustrator', 'Photoshop', 'Protopie'] },
      { category: 'UX Disciplines', skills: ['Wireframing', 'Prototyping', 'User Research', 'Usability Testing', 'Design Systems', 'Information Architecture'] },
    ],
    actionVerbs: ['Designed', 'Prototyped', 'Researched', 'Iterated', 'Standardized', 'Crafted', 'Tested', 'Mapped'],
    keywords: ['Figma', 'Wireframing', 'Prototyping', 'User Journey', 'Design System', 'Accessibility', 'Micro-interactions'],
  },
  {
    role: 'Product / Business Analyst',
    category: 'Business',
    summaries: [
      'Goal-oriented Business Associate graduate skilled in requirements gathering, process mapping, competitive analysis, and stakeholder communication. Proven ability to bridge technical and business teams.',
    ],
    objectives: [
      'Seeking an entry-level Product Analyst or Associate PM role to drive feature definitions, user story creation, and business impact analysis.',
    ],
    recommendedSkills: [
      { category: 'Core Skills', skills: ['Requirements Gathering', 'User Stories', 'Process Mapping', 'Jira / Confluence', 'Agile / Scrum', 'Market Research'] },
    ],
    actionVerbs: ['Gathered', 'Formulated', 'Streamlined', 'Evaluated', 'Documented', 'Coordinated', 'Facilitated'],
    keywords: ['Requirements', 'User Stories', 'Agile', 'Jira', 'Stakeholders', 'KPIs', 'Market Research'],
  },
];
