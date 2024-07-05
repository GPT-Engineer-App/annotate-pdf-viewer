import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PDFViewer = () => {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="mb-4">
        <Input type="file" accept="application/pdf" onChange={onFileChange} />
      </div>
      <div className="w-full max-w-4xl">
        {file && (
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            className="mx-auto"
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        )}
      </div>
    </div>
  );
};

export default PDFViewer;