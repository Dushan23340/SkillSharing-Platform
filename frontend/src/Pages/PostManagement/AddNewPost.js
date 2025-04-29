import React, { useState } from 'react';
import axios from 'axios';
import NavBar from '../../Components/NavBar/NavBar';
import './AddNewPost.css'; // Make sure to include the CSS file

function AddNewPost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [media, setMedia] = useState([]);
  const [mediaPreviews, setMediaPreviews] = useState([]);
  const [categories, setCategories] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const userID = localStorage.getItem('userID');

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    processMediaFiles(files);
  };

  const processMediaFiles = (files) => {
    const maxFileSize = 50 * 1024 * 1024; // 50MB
    let imageCount = 0;
    let videoCount = 0;
    const previews = [];

    for (const file of files) {
      if (file.size > maxFileSize) {
        alert(`File ${file.name} exceeds the maximum size of 50MB.`);
        return;
      }

      if (file.type.startsWith('image/')) {
        imageCount++;
      } else if (file.type === 'video/mp4') {
        videoCount++;

        // Validate video duration
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.src = URL.createObjectURL(file);

        video.onloadedmetadata = () => {
          URL.revokeObjectURL(video.src);
          if (video.duration > 30) {
            alert(`Video ${file.name} exceeds the maximum duration of 30 seconds.`);
            window.location.reload();
          }
        };
      } else {
        alert(`Unsupported file type: ${file.type}`);
        return;
      }

      // Add file preview object with type and URL
      previews.push({ type: file.type, url: URL.createObjectURL(file) });
    }

    if (imageCount > 3) {
      alert('You can upload a maximum of 3 images.');
      return;
    }

    if (videoCount > 1) {
      alert('You can upload only 1 video.');
      return;
    }

    setMedia([...media, ...files]);
    setMediaPreviews([...mediaPreviews, ...previews]);
  };

  const removeMedia = (index) => {
    const updatedMedia = [...media];
    const updatedPreviews = [...mediaPreviews];
    
    // Revoke the object URL to prevent memory leaks
    URL.revokeObjectURL(mediaPreviews[index].url);
    
    updatedMedia.splice(index, 1);
    updatedPreviews.splice(index, 1);
    
    setMedia(updatedMedia);
    setMediaPreviews(updatedPreviews);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    processMediaFiles(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Please enter a title for your post');
      return;
    }
    
    if (!description.trim()) {
      alert('Please enter a description for your post');
      return;
    }
    
    if (!categories) {
      alert('Please select a category for your post');
      return;
    }
    
    if (media.length === 0) {
      alert('Please upload at least one media file');
      return;
    }
    
    const formData = new FormData();
    formData.append('userID', userID);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', categories);
    media.forEach((file) => formData.append('mediaFiles', file));

    try {
      // Show loading state
      document.getElementById('submit-button').disabled = true;
      document.getElementById('submit-button').innerText = 'Creating Post...';
      
      const response = await axios.post('http://localhost:8080/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      alert('Post created successfully!');
      window.location.href = '/myAllPost';
    } catch (error) {
      console.error(error);
      alert('Failed to create post. Please try again.');
      
      // Reset button state
      document.getElementById('submit-button').disabled = false;
      document.getElementById('submit-button').innerText = 'Create Post';
    }
  };

  return (
    <div className="add-post-container">
      <NavBar />
      <div className="post-content-wrapper">
        <div className="post-form-container">
          <h1 className="post-form-title">Create New Post</h1>
          
          <form onSubmit={handleSubmit} className="post-form">
            <div className="form-group">
              <label className="form-label">Title</label>
              <input
                className="form-input"
                type="text"
                placeholder="Enter an engaging title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="form-textarea"
                placeholder="Share your thoughts..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={categories}
                onChange={(e) => setCategories(e.target.value)}
                required
              >
                <option value="" disabled>Select a category</option>
                <option value="Portrait Photography">Portrait Photography</option>
                <option value="Landscape Photography">Landscape Photography</option>
                <option value="Wildlife Photography">Wildlife Photography</option>
                <option value="Fashion Photography">Fashion Photography</option>
                <option value="Wedding Photography">Wedding Photography</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Media</label>
              <div 
                className={`file-input ${isDragging ? 'dragging' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  id="media-upload"
                  type="file"
                  accept="image/jpeg,image/png,image/jpg,video/mp4"
                  multiple
                  onChange={handleMediaChange}
                  style={{ display: 'none' }}
                />
                <label htmlFor="media-upload" className="file-upload-label">
                  <div className="upload-icon">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                  </div>
                  <div className="upload-text">
                    <p>Drag & drop files here or click to browse</p>
                    <p className="upload-hint">Supports: JPG, PNG, MP4 (max 50MB)</p>
                    <p className="upload-limits">Limits: 3 images, 1 video (max 30s)</p>
                  </div>
                </label>
              </div>
              
              {mediaPreviews.length > 0 && (
                <div className="media-preview-grid">
                  {mediaPreviews.map((preview, index) => (
                    <div key={index} className="media-preview-item">
                      {preview.type.startsWith('video/') ? (
                        <video controls className="media-preview">
                          <source src={preview.url} type={preview.type} />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img className="media-preview" src={preview.url} alt={`Preview ${index + 1}`} />
                      )}
                      <button 
                        type="button" 
                        className="remove-media-btn"
                        onClick={() => removeMedia(index)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="15" y1="9" x2="9" y2="15"></line>
                          <line x1="9" y1="9" x2="15" y2="15"></line>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <button 
              id="submit-button"
              type="submit" 
              className="submit-button"
            >
              Create Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddNewPost;