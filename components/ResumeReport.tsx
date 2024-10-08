import React from "react";

export interface ResumeReportProps {
  evaluations: string[]; // Changed to accept an array of strings
}

function ResumeReport({ evaluations }: ResumeReportProps) {
  return (
    <div className="flex h-full overflow-y-auto justify-center flex-col">
      <h2 className="text-lg font-bold">Resume Report</h2>
      {evaluations.length > 0 ? ( // Check if there are evaluations to display
        evaluations.map((evaluation, index) => (
          <div key={index} className="mt-4 p-4 border rounded shadow">
            <h3 className="text-lg font-semibold">
              Evaluation Result {index + 1}
            </h3>
            <p>{evaluation}</p>
          </div>
        ))
      ) : (
        <p>No evaluations generated yet.</p>
      )}
    </div>
  );
}

export default ResumeReport;
