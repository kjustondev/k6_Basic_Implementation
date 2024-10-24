import React, { useState } from 'react';

const FileUpload = ({ onFilesSelected }) => {
    const [xmlFile, setXmlFile] = useState(null);
    const [jsonFile, setJsonFile] = useState(null);

    const handleXmlChange = (e) => {
        setXmlFile(e.target.files[0]);
    };

    const handleJsonChange = (e) => {
        setJsonFile(e.target.files[0]);
    };

    const handleSubmit = () => {
        onFilesSelected(xmlFile, jsonFile);
    };

    return (
        <div>
            <h2>Upload Files</h2>
            <input type="file" accept=".xml" onChange={handleXmlChange} />
            <input type="file" accept=".json" onChange={handleJsonChange} />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default FileUpload;
