import React, { useState } from 'react';
import Backimg from "../images/Background.png";

function CsvUploader() { 
  const [movieName, setMovieName] = useState('');
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Function to handle image file selection
  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && isImageType(selectedFile.type)) {
      setImage(selectedFile);
    } else {
      alert('Please select a valid image file (JPG, JPEG, PNG)');
    }
  };

  // Function to check if file type is an image
  const isImageType = (fileType) => {
    return fileType === 'image/jpeg' || fileType === 'image/jpg' || fileType === 'image/png';
  };

  // Function to handle CSV file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleMovieNameChange = (event) => {
    setMovieName(event.target.value);
  };

  // Function to handle file upload
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append('movieScript', file); // This should match the field name expected by multer
    formData.append('movieName', movieName);
    if (image) {
      formData.append('moviePoster', image);
    }

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('File uploaded successfully:', data);
    } catch (error) {
      console.error('Error uploading file:', error);
      setSuccessMessage('File uploaded successfully'); // Set the success message

      // Clear the success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
  };

  return (
    <div style={styles.adminPanel}>
      <p style={{ color: 'white', marginTop:'40px' }}>Welcome user!</p>

      <h1 style={styles.heading}>Admin Panel</h1>
      <ul style={styles.uploaders}>
        <li style={styles.listItem}>
          <h3 style={styles.label}>Movie Name:</h3>
          <input type="text" id="nameInput" placeholder="Enter Movie Name" onChange={handleMovieNameChange}   style={styles.input} />
        </li>
        <li style={styles.listItem}>
          <h3 style={styles.label}>Upload Image:</h3>
          <input
            type="file"
            id="imageInput"
            accept=".jpg, .jpeg, .png"
            onChange={handleImageChange}
            style={styles.input1}
          />
        </li>
        <li style={styles.listItem}>
          <h3 style={styles.label}>Upload CSV:</h3>
          <input
            type="file"
            id="csvInput"
            accept=".csv"
            onChange={handleFileChange}
            style={styles.input1}
          />
        </li>
      </ul>

      <button
        onClick={handleUpload}
        style={styles.button}
      >
        Upload CSV
      </button>
    </div>
  );
}

const styles = {
  adminPanel: {
    backgroundImage: `url(${Backimg})`,
    padding:'40px',
    
    borderRadius: '8px',
    width: '105.2%',
    height:"105vh",
    maxWidth: '100vw',
  marginTop:'-30px',
  marginLeft:'-40px',
  marginRight:'-50px',
  marginBottom:'-20px'
    
  },
  heading: {
    color: 'white',
    textAlign: 'center',
    fontSize: '45px' // Note the camelCase for fontSize
  }
  ,
  uploaders: {
    listStyleType: 'none',
    padding: '0',
  },
  listItem: {
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
    color: 'white',
    fontSize:'16px'
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: 'calc(100% - 700px)',
    color:'black'
  },
  input1: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: 'calc(100% - 700px)',
    color:'white'
  },
  button: {
    backgroundColor: 'orange',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    width: '100%',
    maxWidth: '150px',
    margin: '10px auto',
  }
}

export default CsvUploader;