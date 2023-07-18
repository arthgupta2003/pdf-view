"use client"
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { stringify } from 'querystring';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

export default function Test() {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pdfUrl, setPdfUrl] = useState<string>('');

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset: number) {
    const newPageNumber = pageNumber + offset;
    if (numPages !== 0 && newPageNumber >= 1 && newPageNumber <= numPages) {
      setPageNumber(newPageNumber);
    }
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  function handlePdfUrlChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPdfUrl(event.target.value);
  }

  function handleLoadPdf() {
    setNumPages(0);
    setPageNumber(1);
  }

  return (
    <div className="flex justify-center bg-slate-500 pt-10">
      <div className="max-w-screen-lg w-full">
        <h1 className="text-5xl font-bold p-5 flex justify-center text-white">Next.js demo for react-pdf</h1>
        <div className="flex justify-center mb-4">
          <input
            type="text"
            value={pdfUrl}
            onChange={handlePdfUrlChange}
            className="border border-gray-300 rounded px-4 py-2"
            placeholder="Enter PDF URL"
          />
          <button
            type="button"
            onClick={handleLoadPdf}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded"
          >
            Load PDF
          </button>
        </div>
        <div className="flex justify-center mb-4">
          <p className="text-white">
            Page {pageNumber || '--'} of {numPages === 0 ? '--' : String(numPages)}
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Next
          </button>
        </div>
        <div className="flex justify-center">
          {pdfUrl && (
            <Document
              file={pdfUrl}
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
          )}
        </div>
      </div>
    </div>
  );
}
