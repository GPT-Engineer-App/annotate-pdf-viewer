import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";

const Index = () => {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [annotations, setAnnotations] = useState([]);
  const [annotationText, setAnnotationText] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () => {
    setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 1, numPages));
  };

  const jumpToPage = (event) => {
    const pageNumber = Number(event.target.value);
    if (pageNumber > 0 && pageNumber <= numPages) {
      setPageNumber(pageNumber);
    }
  };

  const addAnnotation = () => {
    setAnnotations([...annotations, { page: pageNumber, text: annotationText }]);
    setAnnotationText("");
    setIsDialogOpen(false);
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="mb-4">
          <Input type="file" accept="application/pdf" onChange={onFileChange} />
        </div>
        <div className="flex items-center space-x-2 mb-4">
          <Button onClick={goToPrevPage} disabled={pageNumber <= 1}>Previous</Button>
          <Input type="number" value={pageNumber} onChange={jumpToPage} className="w-16 text-center" />
          <Button onClick={goToNextPage} disabled={pageNumber >= numPages}>Next</Button>
        </div>
        <div className="w-full max-w-4xl">
          {file && (
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              className="mx-auto"
            >
              <Page pageNumber={pageNumber} />
            </Document>
          )}
        </div>
        <div className="mt-4">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add Annotation</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Annotation</DialogTitle>
                <DialogDescription>
                  Add your annotation for page {pageNumber}.
                </DialogDescription>
              </DialogHeader>
              <Textarea
                value={annotationText}
                onChange={(e) => setAnnotationText(e.target.value)}
                placeholder="Enter your annotation here..."
              />
              <DialogFooter>
                <Button onClick={addAnnotation}>Save</Button>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="mt-4 w-full max-w-4xl">
          {annotations
            .filter((annotation) => annotation.page === pageNumber)
            .map((annotation, index) => (
              <div key={index} className="p-2 border rounded mb-2">
                <p>{annotation.text}</p>
              </div>
            ))}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Index;