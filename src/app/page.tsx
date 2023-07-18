"use client"
import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const samplePDF = "http://localhost:55845/physicscredit.pdf";

export default function Test() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    const newPageNumber = pageNumber + offset;
    if (newPageNumber >= 1 && newPageNumber <= numPages) {
      setPageNumber(newPageNumber);
    }
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <div className="flex justify-center bg-slate-500">
      <div className="max-w-screen-lg w-full">
        <div className="flex justify-center mb-4">
          <p className="text-white">
            Page {pageNumber || '--'} of {numPages || '--'}
          </p>
        </div>
        <div className="flex justify-center mb-4">
          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
          >
            Previous
          </button>
          <button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
          >
            Next
          </button>
        </div>
        <div className="flex justify-center">
          <Document
            file={samplePDF}
            onLoadSuccess={onDocumentLoadSuccess}
            onError={(e) => console.log(e)}
          >
            <Page
              pageNumber={pageNumber}
              width={window.innerWidth * 0.5}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </div>
      </div>
    </div>
  );
}
