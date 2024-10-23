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
