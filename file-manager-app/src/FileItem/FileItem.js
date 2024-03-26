
import { useState } from 'react';
import { useRef } from 'react';
import './FileItem.css'

function FileItem({ name, created, size, type }) {

  return (
    <div className="file-item">
      <span className="file-name">{name}</span>
      <span className="file-created">{created}</span>
      {/* <span className="file-size">{size}</span> */}
      <div className="file-actions">
        {/* <button onClick={() => console.log('Viewing', name)}>🔍</button> */}
        <button onClick={() => console.log("Editing", name)}>✏️</button>
        {/* {type === 'file' && <button onClick={() => console.log('Uploading', name)}>📤</button>} */}
        <button onClick={() => console.log("Deleting", name)}>🗑️</button>
      </div>
    </div>
  );
}

function FileExplorer() {
    const [items, setItems] = useState([]); // Initialize the items state
    const fileInputRef = useRef();
  
    const handleAddItem = () => {
      // Reset the value of the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
      // Open the file dialog
      fileInputRef.current.click();
    };
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {

          // File size limit: 10MB
        const maxSize = 10 * 1024 * 1024; // 10MB in bytes

        if (file.size > maxSize) {
            alert('File size should be less than 10MB.');
            return; // Exit the function if the file is too large
          }

        const fileName = file.name;
        const lastDotIndex = fileName.lastIndexOf(".");
        const baseFileName = lastDotIndex !== -1 ? fileName.slice(0, lastDotIndex) : fileName;
        const fileExtension = lastDotIndex !== -1 ? fileName.slice(lastDotIndex + 1) : '';
        const lastModifiedDate = new Date(file.lastModified).toLocaleString(); 

        // Create an object for the new file item
        const newFileItem = {
          name: fileName,
          created: lastModifiedDate,
          size: `${file.size} bytes`, // File size in bytes
          type: fileExtension, // The file extension
          // Add any other file information you need here
        };
  
        // Add the new file item to the items array
        setItems(prevItems => [...prevItems, newFileItem]);
      }
    };

    // const handleFileChange = async (event) => {
    //   const file = event.target.files[0];
    //   if (file) {
    //     const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    //     if (file.size > maxSize) {
    //       alert("File size should be less than 10MB.");
    //       return;
    //     }

    //     // Create FormData to send in the POST request
    //     let formData = new FormData();
    //     formData.append("file", file); // 'file' is the field name

    //     try {
    //       const response = await fetch("http://localhost:5055/upload", {
    //         method: "POST",
    //         body: formData,
    //       });

    //       if (response.ok) {
    //         const result = await response.json();
    //         console.log("Upload result:", result);

    //         // Create an object for the new file item to add to the list
    //         const newFileItem = {
    //           name: file.name,
    //           created: new Date().toLocaleString(),
    //           size: `${file.size} bytes`,
    //           type: file.type,
    //         };

    //         // Add the new file item to the items array
    //         setItems((prevItems) => [...prevItems, newFileItem]);
    //       } else {
    //         alert("Failed to upload file.");
    //       }
    //     } catch (error) {
    //       console.error("Upload error:", error);
    //       alert("An error occurred during file upload.");
    //     }
    //   }
    // };
  
    return (
      <div className="file-explorer">
        <div className="file-explorer-header">
          <h2 className="file-explorer-title">Files and Folders</h2>
          <button className="add-button" onClick={handleAddItem}>파일 추가</button>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }}
           accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
           application/vnd.ms-excel,
           application/vnd.openxmlformats-officedocument.presentationml.presentation,
           application/vnd.ms-powerpoint,
           application/vnd.openxmlformats-officedocument.wordprocessingml.document,
           application/msword,
           text/plain,
           .log,
           application/pdf
         "
          />
        </div>
        {items.map((item, index) => (
          <FileItem key={index} {...item} />
        ))}
      </div>
    );
  }
  
  export default FileExplorer;