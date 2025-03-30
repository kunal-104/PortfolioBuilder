import React, { useState, useEffect } from 'react';
import * as pdfjs from 'pdfjs-dist';

const PDFTextExtractor = () => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Set a custom worker source - using a version that should be available
    const workerUrl = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
    pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
  }, []);

  const extractTextFromPDF = async (file) => {
    try {
      setIsLoading(true);
      setError(null);
      setText('');

      // Read the file as ArrayBuffer
      const arrayBuffer = await readFileAsArrayBuffer(file);
      
      // Load the PDF document
      const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      
      // Get total number of pages
      const numPages = pdf.numPages;
      let fullText = '';
      
      // Extract text from each page
      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += pageText + '\n\n';
      }
      
      setText(fullText.trim());
    } catch (err) {
      console.error('Error extracting text from PDF:', err);
      setError('Failed to extract text from the PDF. Please make sure it\'s a valid PDF file.');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to read file as ArrayBuffer
  const readFileAsArrayBuffer = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      extractTextFromPDF(file);
    } else if (file) {
      setError('Please select a valid PDF file.');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">PDF Text Extractor</h1>
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2" htmlFor="pdf-upload">
          Upload PDF
        </label>
        <input
          type="file"
          id="pdf-upload"
          accept=".pdf"
          onChange={handleFileChange}
          className="block w-full text-sm border border-gray-300 rounded p-2"
        />
      </div>
      
      {isLoading && (
        <div className="my-4 text-center">
          <p>Extracting text, please wait...</p>
        </div>
      )}
      
      {error && (
        <div className="my-4 p-3 bg-red-100 text-red-700 rounded">
          <p>{error}</p>
        </div>
      )}
      
      {text && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Extracted Text</h2>
          <div className="p-4 border rounded bg-gray-50 whitespace-pre-wrap h-96 overflow-y-auto">
            {text}
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(text)}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
};

export default PDFTextExtractor;