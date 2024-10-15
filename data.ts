export const HeadingItem = [
  {
    page: "Project Section",
    items: [
      {
        title: "resume checkup",
      },
      {
        main_heading: "Let's check out your resume",
      },
      {
        sub_heading: "Create a new project and add the details to your resume",
      },
    ],
  },
  {
    page: "Add Projects",
    items: [
      {
        title: "resume checkup",
      },
      {
        main_heading: "A new job awaits",
      },
      {
        sub_heading:
          "Add your project name and copy paste your resume. Simple as that.",
      },
    ],
  },
  {
    page: "Project Section",
    items: [
      {
        title: "resume checkup",
      },
      {
        main_heading: "Business Analyst",
      },
      {
        sub_heading: "Created September 19, 2024",
      },
    ],
  },
  {
    page: "Add Jobs",
    items: [
      {
        title: "resume checkup",
      },
      {
        main_heading: "This might be your next job",
      },
      {
        sub_heading: "Copy the entire job description and give it a name",
      },
    ],
  },
  {
    page: "Job Results",
    items: [
      {
        title: "resume checkup",
      },
      {
        main_heading: "Results for this job",
      },
      {
        sub_heading: "We're analyzing your resume with this job description",
      },
    ],
  },
];

interface Card {
  id: number;
  job_title: string;
  no_of_jobs: number;
}

export const CardComponent: Card[] = [
  {
    id: 1,
    job_title: "Business Analyst",
    no_of_jobs: 84,
  },
  {
    id: 2,
    job_title: "Business Analyst",
    no_of_jobs: 84,
  },
  {
    id: 3,
    job_title: "Business Analyst",
    no_of_jobs: 84,
  },
  {
    id: 4,
    job_title: "Business Analyst",
    no_of_jobs: 84,
  },
  {
    id: 5,
    job_title: "Business Analyst",
    no_of_jobs: 84,
  },
  {
    id: 6,
    job_title: "Business Analyst",
    no_of_jobs: 84,
  },
  {
    id: 7,
    job_title: "Business Analyst",
    no_of_jobs: 84,
  },
  {
    id: 8,
    job_title: "Business Analyst",
    no_of_jobs: 84,
  },
  {
    id: 9,
    job_title: "Business Analyst",
    no_of_jobs: 84,
  },
  {
    id: 10,
    job_title: "Software Engineer",
    no_of_jobs: 120,
  },
  {
    id: 11,
    job_title: "Data Scientist",
    no_of_jobs: 95,
  },
  {
    id: 12,
    job_title: "Project Manager",
    no_of_jobs: 75,
  },
  {
    id: 13,
    job_title: "UX/UI Designer",
    no_of_jobs: 60,
  },
  {
    id: 14,
    job_title: "DevOps Engineer",
    no_of_jobs: 50,
  },
  {
    id: 15,
    job_title: "Product Manager",
    no_of_jobs: 40,
  },
  {
    id: 16,
    job_title: "Network Administrator",
    no_of_jobs: 30,
  },
  {
    id: 17,
    job_title: "Quality Assurance Analyst",
    no_of_jobs: 45,
  },
  {
    id: 18,
    job_title: "Web Developer",
    no_of_jobs: 100,
  },
  {
    id: 19,
    job_title: "Systems Analyst",
    no_of_jobs: 55,
  },
];

interface List {
  id: number;
  date: Date;
  company_job: string;
  score: number;
  remarks: string;
}

export const ListComponent: List[] = [
  {
    id: 1,
    date: new Date("2024-09-12"),
    company_job: "Lockheed Martin - Business Analyst",
    score: 84,
    remarks: "Apply",
  },
  {
    id: 2,
    date: new Date("2024-09-15"),
    company_job: "Google - Software Engineer",
    score: 90,
    remarks: "Interview scheduled",
  },
  {
    id: 3,
    date: new Date("2024-09-18"),
    company_job: "Amazon - Product Manager",
    score: 75,
    remarks: "Consider later",
  },
  {
    id: 4,
    date: new Date("2024-09-20"),
    company_job: "Microsoft - Data Scientist",
    score: 88,
    remarks: "Apply",
  },
  {
    id: 5,
    date: new Date("2024-09-22"),
    company_job: "Tesla - Mechanical Engineer",
    score: 92,
    remarks: "Interview scheduled",
  },
  {
    id: 6,
    date: new Date("2024-09-25"),
    company_job: "Facebook - UX Designer",
    score: 80,
    remarks: "Follow up",
  },
  {
    id: 7,
    date: new Date("2024-09-28"),
    company_job: "Apple - Hardware Engineer",
    score: 87,
    remarks: "Applied",
  },
  {
    id: 8,
    date: new Date("2024-10-01"),
    company_job: "IBM - Cloud Consultant",
    score: 79,
    remarks: "Consider later",
  },
  {
    id: 9,
    date: new Date("2024-10-03"),
    company_job: "Adobe - Marketing Specialist",
    score: 82,
    remarks: "Applied",
  },
  {
    id: 10,
    date: new Date("2024-10-05"),
    company_job: "Nvidia - AI Researcher",
    score: 91,
    remarks: "Interview scheduled",
  },
  {
    id: 11,
    date: new Date("2024-10-07"),
    company_job: "Salesforce - Business Analyst",
    score: 85,
    remarks: "Apply",
  },
  {
    id: 12,
    date: new Date("2024-10-09"),
    company_job: "Oracle - Database Administrator",
    score: 78,
    remarks: "Consider later",
  },
  {
    id: 13,
    date: new Date("2024-10-11"),
    company_job: "Twitter - Social Media Manager",
    score: 76,
    remarks: "Follow up",
  },
  {
    id: 14,
    date: new Date("2024-10-13"),
    company_job: "Spotify - Content Strategist",
    score: 83,
    remarks: "Applied",
  },
  {
    id: 15,
    date: new Date("2024-10-15"),
    company_job: "Netflix - Data Analyst",
    score: 89,
    remarks: "Interview scheduled",
  },
  {
    id: 16,
    date: new Date("2024-10-17"),
    company_job: "Slack - Software Developer",
    score: 81,
    remarks: "Consider later",
  },
  {
    id: 17,
    date: new Date("2024-10-19"),
    company_job: "Zoom - Sales Executive",
    score: 86,
    remarks: "Apply",
  },
  {
    id: 18,
    date: new Date("2024-10-21"),
    company_job: "Salesforce - Project Manager",
    score: 88,
    remarks: "Follow up",
  },
  {
    id: 19,
    date: new Date("2024-10-23"),
    company_job: "Stripe - Financial Analyst",
    score: 90,
    remarks: "Interview scheduled",
  },
  {
    id: 20,
    date: new Date("2024-10-25"),
    company_job: "eBay - Operations Manager",
    score: 84,
    remarks: "Applied",
  },
  {
    id: 21,
    date: new Date("2024-10-27"),
    company_job: "LinkedIn - Business Development",
    score: 80,
    remarks: "Consider later",
  },
];

interface ResultExampleProps {
  quick_summary: string;
  red_flags: string[];
  interview_focus: string[];
  quick_tips: string;
  rtj_match_ratio: number;
  final_remarks: string;
}

export const ResultExample: ResultExampleProps = {
  quick_summary:
    "Based on the resume of Prithika Suwal and the job description for the Implementation Analyst position at TELUS Health, here are some potential red flags to consider during the evaluation process:",
  red_flags: [
    "The candidate does not have specific experience in pension administration or working with pension plans, which is a key requirement for the role.",
    "Prithika has only been in her current role as a Junior Business Analyst for about one year (Jun 2023 - Jun 2024).",
    "While the candidate has experience in data management and process improvement, there is no explicit mention of experience in software implementation or configuration, which is crucial for the role.",
  ],
  interview_focus: [
    "Can you describe any experience you have with pension administration or working with pension plans?",
    "Have you been involved in any software implementation projects? If so, can you describe your role?",
    "What steps would you take to familiarize yourself with a new software system, such as ARIEL®?",
  ],
  quick_tips:
    "By focusing on these areas during the interview, you can gain deeper insights into Prithika Suwal's qualifications and potential fit for the Implementation Analyst role at TELUS Health. Additionally, this approach allows you to assess her adaptability, commitment, and problem-solving skills, which are crucial for success in the position.",
  rtj_match_ratio: 84,
  final_remarks: "Apply",
};
