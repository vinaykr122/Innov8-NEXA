import React from 'react';
import { useNavigate } from 'react-router-dom';

function ChooseDataPage() {
  const navigate = useNavigate();

  const handleDocumentUpload = () => {
    navigate('/upload-document');
  };

  const handleUrlInput = () => {
    navigate('/provide-URL');
  };

  return (
    <div className="text-center p-8">
      <h2 className="text-2xl font-bold mb-4">Choose the Type of Data</h2>
      <div className="flex flex-col space-y-4">
        <button
          className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
          onClick={handleDocumentUpload}
        >
          Upload Document
        </button>
        <button
          className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
          onClick={handleUrlInput}
        >
          Provide URL
        </button>
      </div>
    </div>
  );
}

export default ChooseDataPage;
