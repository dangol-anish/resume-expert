import { UUID } from "crypto";

// Types
export interface ProjectDataProps {
    projectName: string;
    resume: string;
}

export interface GetProjectDataResponse {
  data?: {
      projectName: string; // Fix the typo here
      no_of_jobs: number;  // Ensure consistency with this naming
    }[];
    error?: string;
  }

  export interface ProjectDataDisplayProps {
    projectName: string;
    no_of_jobs: number;
  }

  export interface ProjectData {
    projectId: UUID;
    projectName: string;
    numberOfJobs: number;
    
  }

export interface JobData{
  jobDate: Date;
    jobId: UUID;
    jobName: string;
    jobScore: number;
    jobRemarks: string;
}

export interface JobDataProps {
  jobName: string;
  jobDescription: string;
  projectId: string | string[];
}