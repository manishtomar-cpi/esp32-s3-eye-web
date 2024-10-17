// components/ImageGallery.jsx
import React, { useState } from 'react';
import ImageViewer from './ImageViewer';
import { FaTrashAlt, FaEye } from 'react-icons/fa';

function ImageGallery({ images, onDelete, initialRows = 8, imagesPerRow = 2 }) {
  const [visibleCount, setVisibleCount] = useState(initialRows * imagesPerRow);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleViewMore = () => {
    setVisibleCount(visibleCount + initialRows * imagesPerRow);
  };

  const handleViewLess = () => {
    setVisibleCount(initialRows * imagesPerRow);
  };

  const handleView = (key) => {
    setSelectedImage(key);
  };

  const handleCloseViewer = () => {
    setSelectedImage(null);
  };

  const visibleImages = images.slice(0, visibleCount);

  return (
    <div>
      {selectedImage && (
        <ImageViewer imageKey={selectedImage} onClose={handleCloseViewer} />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visibleImages.map((image) => (
          <div key={image.Key} className="relative border rounded p-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">{image.Key}</span>
              <div className="flex space-x-2">
                {(image.Key.endsWith('.jpg') || image.Key.endsWith('.jpeg')) && (
                  <button
                    onClick={() => handleView(image.Key)}
                    className="text-blue-500"
                    title="View Image"
                  >
                    <FaEye />
                  </button>
                )}
                <button
                  onClick={() => onDelete(image.Key)}
                  className="text-red-500"
                  title="Delete Image"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              Last Modified: {new Date(image.LastModified).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
      {/* View More / View Less Buttons */}
      <div className="mt-4 flex justify-center space-x-4">
        {visibleCount < images.length && (
          <button
            onClick={handleViewMore}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            View More
          </button>
        )}
        {visibleCount > initialRows * imagesPerRow && (
          <button
            onClick={handleViewLess}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            View Less
          </button>
        )}
      </div>
    </div>
  );
}

export default ImageGallery;
