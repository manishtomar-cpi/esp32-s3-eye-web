// components/ImageViewer.jsx
import React from 'react';
import { FaTimes } from 'react-icons/fa';

const BUCKET_NAME = process.env.REACT_APP_S3_BUCKET_NAME;
const REGION = process.env.REACT_APP_AWS_REGION;

function ImageViewer({ imageKey, onClose }) {
  const imageUrl = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${imageKey}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-2xl"
      >
        <FaTimes />
      </button>
      <img src={imageUrl} alt={imageKey} className="max-w-full max-h-full" />
    </div>
  );
}

export default ImageViewer;
