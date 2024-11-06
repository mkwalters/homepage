"use client";
import React from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const Resume = () => {
  return (
    <div className="flex justify-center items-center w-screen bg-pakistan-green">
      <Worker
        workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
      >
        <div className="w-full h-full max-w-[750px] max-h-[80vh] ">
          <Viewer fileUrl="/mkwResumeNov5.pdf" />
        </div>
      </Worker>
    </div>
  );
};

export default Resume;
