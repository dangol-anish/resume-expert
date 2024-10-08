import React from "react";

export interface ResumeReportProps {
  evaluations: string[];
}

function ResumeReport({ evaluations }: ResumeReportProps) {
  return (
    <div className="w-[50%] h-full p-10 flex overflow-y-auto flex-col gap-6">
      {evaluations.length > 0 ? (
        evaluations.map((evaluation, index) => (
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold ">
              Evaluation Result {index + 1}
            </h3>
            <div
              key={index}
              className="p-4 border rounded-md bg-input_background"
            >
              <p>{evaluation}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No reports generated yet.</p>
      )}
    </div>
  );
}

export default ResumeReport;
