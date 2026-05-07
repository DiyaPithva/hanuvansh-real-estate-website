import { useState } from 'react';
import api from '../../api/axiosInstance.js';

/**
 * Feature: hanuvansh-mern-estate
 * ImageUploader component with drag-and-drop or click-to-upload control.
 * Uploads images to Cloudinary via POST /api/upload endpoint.
 * Requirements: 16.3
 */
const ImageUploader = ({ onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

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
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = async (files) => {
    if (!files || files.length === 0) return;

    // Filter for image files only
    const imageFiles = files.filter((file) =>
      file.type.startsWith('image/')
    );

    if (imageFiles.length === 0) {
      setError('Please select valid image files');
      return;
    }

    setError('');
    setUploading(true);
    setUploadProgress(0);

    const urls = [];
    const totalFiles = imageFiles.length;

    try {
      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        const formData = new FormData();
        formData.append('image', file);

        const response = await api.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.data.success && response.data.data?.url) {
          urls.push(response.data.data.url);
        }

        // Update progress
        setUploadProgress(Math.round(((i + 1) / totalFiles) * 100));
      }

      setUploadedUrls((prev) => [...prev, ...urls]);
      
      // Call the callback with all uploaded URLs
      if (onUpload && urls.length > 0) {
        onUpload(urls);
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError(
        err.response?.data?.message || 'Failed to upload images. Please try again.'
      );
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleRemoveImage = (index) => {
    const newUrls = uploadedUrls.filter((_, i) => i !== index);
    setUploadedUrls(newUrls);
    if (onUpload) {
      onUpload(newUrls);
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center transition-all
          ${
            isDragging
              ? 'border-orange-500 bg-orange-50'
              : 'border-gray-300 hover:border-orange-400'
          }
          ${uploading ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}
        `}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          disabled={uploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="space-y-2">
          {uploading ? (
            <>
              <div className="text-accent text-4xl">⏳</div>
              <p className="text-text-primary font-medium">
                Uploading... {uploadProgress}%
              </p>
              <div className="w-full bg-bg-secondary rounded-full h-2 mt-2">
                <div
                  className="bg-accent h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </>
          ) : (
            <>
              <div className="text-accent text-4xl">📤</div>
              <p className="text-text-primary font-medium">
                Drag & drop images here
              </p>
              <p className="text-text-muted text-sm">
                or click to browse files
              </p>
              <p className="text-text-muted text-xs mt-2">
                Supports multiple image uploads
              </p>
            </>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Preview Grid */}
      {uploadedUrls.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-text-primary font-medium">
            Uploaded Images ({uploadedUrls.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {uploadedUrls.map((url, index) => (
              <div
                key={index}
                className="relative group aspect-square rounded-lg overflow-hidden bg-bg-secondary"
              >
                <img
                  src={url}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove image"
                >
                  ×
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2 opacity-0 group-hover:opacity-100 transition-opacity truncate">
                  {url.split('/').pop()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
