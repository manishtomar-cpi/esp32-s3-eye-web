// components/StatisticsCards.jsx
import React from 'react';
import { FaImage, FaEye } from 'react-icons/fa';

function StatisticsCards({
  rawCount,
  jpegCount,
  lastRawImage,
  lastJpegImage,
  onViewImage,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {/* Total RAW Images */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
        <div className="p-4 bg-blue-500 text-white rounded-full">
          <FaImage size={24} />
        </div>
        <div className="ml-4">
          <p className="text-2xl font-bold">{rawCount}</p>
          <p className="text-gray-600">Total RAW Images</p>
        </div>
      </div>

      {/* Total JPEG/JPG Images */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
        <div className="p-4 bg-green-500 text-white rounded-full">
          <FaImage size={24} />
        </div>
        <div className="ml-4">
          <p className="text-2xl font-bold">{jpegCount}</p>
          <p className="text-gray-600">Total JPEG/JPG Images</p>
        </div>
      </div>

      {/* Last Added RAW Image */}
      {lastRawImage && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <p className="text-lg font-bold mb-2">Last Added RAW Image</p>
          <p className="text-gray-700 break-words">{lastRawImage.Key}</p>
          <p className="text-gray-500 text-sm">
            Added on: {new Date(lastRawImage.LastModified).toLocaleString()}
          </p>
        </div>
      )}

      {/* Last Added JPEG Image */}
      {lastJpegImage && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <p className="text-lg font-bold mb-2">Last Added JPEG Image</p>
          <p className="text-gray-700 break-words">{lastJpegImage.Key}</p>
          <p className="text-gray-500 text-sm">
            Added on: {new Date(lastJpegImage.LastModified).toLocaleString()}
          </p>
          <button
            onClick={() => onViewImage(lastJpegImage.Key)}
            className="mt-2 flex items-center text-blue-500 hover:text-blue-600"
          >
            <FaEye />
            <span className="ml-1">View Image</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default StatisticsCards;
