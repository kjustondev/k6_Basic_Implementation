import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import Results from './components/Results';

const App = () => {
    const [results, setResults] = useState(null);

    const handleFilesSelected = async (xmlFile, jsonFile) => {
        // Handle file reading and performance testing here
        // You can use fetch or any library to send the files to your server

        const formData = new FormData();
        formData.append('xml', xmlFile);
        formData.append('json', jsonFile);

        // Mockup for sending the files to your backend
        const response = await fetch('http://localhost:3000/perform-test', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        setResults(data);
    };

    return (
        <div>
            <h1>Performance Testing Tool</h1>
            <FileUpload onFilesSelected={handleFilesSelected} />
            {results && <Results results={results} />}
        </div>
    );
};

export default App;
