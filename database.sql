CREATE TABLE project (
    project_id uuid not null primary key,
    project_name VARCHAR(255) NOT NULL,
    resume TEXT,
    no_of_jobs INT DEFAULT 0,
    user_id uuid not null,
    FOREIGN KEY (user_id) REFERENCES public.profiles(id)
);

create table
  jobs (
    job_id uuid not null primary key,
    job_name text not null,
    job_quick_summary text,
    job_red_flags text,
    job_interview_focus text,
    job_quick_tips text,
    job_score text,
    job_remarks text,
    user_id uuid not null,
    project_id uuid not null,
    foreign key (user_id) references public.profiles (id),
    foreign key (project_id) references public.project (project_id),
    created_at timestamp with time zone default current_timestamp
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
