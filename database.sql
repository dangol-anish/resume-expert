CREATE TABLE project (
    project_id uuid not null primary key,
    project_name VARCHAR(255) NOT NULL,
    resume TEXT,
    no_of_jobs INT DEFAULT 0,
    user_id uuid not null,
    FOREIGN KEY (user_id) REFERENCES public.profiles(id)
);

CREATE TABLE jobs (
    job_id UUID NOT NULL PRIMARY KEY,
    job_name TEXT NOT NULL,
    job_quick_summary TEXT NOT NULL,
    job_red_flags TEXT NOT NULL,
    job_interview_focus TEXT NOT NULL,
    job_quick_tips TEXT NOT NULL,
    job_score INT,
    job_remarks TEXT NOT NULL,
    user_id UUID NOT NULL,
    project_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    
    FOREIGN KEY (user_id) REFERENCES public.profiles(id),
    FOREIGN KEY (project_id) REFERENCES public.projects(project_id),  
);

CREATE OR REPLACE FUNCTION increment_no_of_jobs()
RETURNS TRIGGER AS $$
BEGIN
  -- Update the no_of_jobs in the related project
  UPDATE project
  SET no_of_jobs = no_of_jobs + 1
  WHERE project_id = NEW.project_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER increment_jobs_count
AFTER INSERT ON jobs
FOR EACH ROW
EXECUTE FUNCTION increment_no_of_jobs();
