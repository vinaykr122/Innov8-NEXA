// src/pages/ProvideURL.js
import React, { useState } from 'react';
import { Client } from '@botpress/client';

const ProvideURL = () => {
  const [url, setUrl] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const client = new Client({
    token: 'bp_pat_osvqpwZZye9pcYSkXxZ2RXHH0AbHwLqUVxOW',
    botId: 'c4dbd48b-7f8d-4364-807f-a2f5aac14e27',
    workspaceId: 'wkspace_01J695K8Q5VFK2KWM6Y5AGA2M1'
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!url) {
      setUploadStatus('Please provide a URL.');
      return;
    }

    setLoading(true);
    setUploadStatus('');

    try {
      // Use a CORS proxy for development
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      const response = await fetch(proxyUrl + url);
      const content = await response.text();
      const size = content.length;

      // Save URL to Botpress
      await client.upsertFile({
        key: `urls/${encodeURIComponent(url)}`,
        accessPolicies: [],
        content: url,
        size,
        index: true,
        tags: {
          source: 'knowledge-base',
          kbId: 'kb-2f0a7ea639',
          title: url
        }
      });
      setUploadStatus(`URL "${url}" added successfully.`);
      // Redirect to Chatbot page
      window.location.href = '/chatbot';
    } catch (error) {
      setUploadStatus('Error adding URL.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Provide URL</h2>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL"
            className="mb-4 px-3 py-2 border border-gray-300 rounded"
          />
          
          <button
            type="submit"
            className={`px-4 py-2 rounded bg-blue-500 text-white ${loading ? 'opacity-50' : ''}`}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Submit URL'}
          </button>
        </form>

        {uploadStatus && <p className="mt-4 text-red-500">{uploadStatus}</p>}
      </div>
    </div>
  );
};

export default ProvideURL;
