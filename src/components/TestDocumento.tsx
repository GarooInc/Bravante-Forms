import React, { useState } from 'react';
import DocumentoPromesa from './DocumentoPromesa';

const TestDocumento: React.FC = () => {
  const [useTestData, setUseTestData] = useState(false);

  const handleTestData = () => {
    // Mock the fetch function to return our sample data
    const originalFetch = window.fetch;
    window.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(require('../sample-data.json'))
    });
    setUseTestData(true);
  };

  return (
    <div>
      <div style={{ padding: '20px', backgroundColor: '#f0f0f0', marginBottom: '20px' }}>
        <h2>Test Documento Promesa</h2>
        <button onClick={handleTestData}>
          Cargar Datos de Prueba
        </button>
        <p>URL actual: {window.location.href}</p>
        <p>ID del documento: {window.location.pathname.split('/').pop()}</p>
      </div>
      <DocumentoPromesa />
    </div>
  );
};

export default TestDocumento;
