// pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import S3Service from '../services/S3Service';
import Sidebar from '../components/Sidebar';
import ImageGallery from '../components/ImageGallery';
import SearchBar from '../components/SearchBar';
import Spinner from '../components/Spinner';
import ToastMessage from '../components/ToastMessage';
import StatisticsCards from '../components/StatisticsCards';
import ImageViewer from '../components/ImageViewer';
import { useAuth } from '../hooks/useAuth';

function AdminDashboard() {
  const { logout } = useAuth();
  const [images, setImages] = useState([]);
  const [rawCount, setRawCount] = useState(0);
  const [jpegCount, setJpegCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: '' });
  const [lastRawImage, setLastRawImage] = useState(null);
  const [lastJpegImage, setLastJpegImage] = useState(null);
  const [view, setView] = useState('dashboard'); // 'dashboard', 'jpeg', 'raw', 'search'
  const [searchParams, setSearchParams] = useState({ term: '', date: '' });
  const [selectedImage, setSelectedImage] = useState(null);

  const handleToastClose = () => {
    setToast({ message: '', type: '' });
  };

  const handleViewDashboard = () => {
    setView('dashboard');
    setSearchParams({ term: '', date: '' });
  };

  const handleViewImages = (format) => {
    setView(format); // 'jpeg' or 'raw'
    setSearchParams({ term: '', date: '' });
  };

  const handleSearch = () => {
    setView('search');
  };

  const handleLogout = () => {
    logout();
  };

  const handleSearchSubmit = ({ term, date }) => {
    setSearchParams({ term, date });
  };

  const handleSearchReset = () => {
    setSearchParams({ term: '', date: '' });
  };

  const handleViewImage = (key) => {
    setSelectedImage(key);
  };

  const handleCloseViewer = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, searchParams]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const allImages = await S3Service.listObjects();
      const sortedImages = allImages.sort(
        (a, b) => new Date(b.LastModified) - new Date(a.LastModified)
      );

      // Extract last added RAW and JPEG images
      const lastRaw = sortedImages.find((img) => img.Key.endsWith('.raw'));
      const lastJpeg = sortedImages.find(
        (img) => img.Key.endsWith('.jpg') || img.Key.endsWith('.jpeg')
      );

      setLastRawImage(lastRaw || null);
      setLastJpegImage(lastJpeg || null);

      // Count total images from all images
      countImageFormats(allImages);

      let filteredImages = [];

      if (view === 'dashboard') {
        // Do not display images when in dashboard view
      } else if (view === 'jpeg' || view === 'raw') {
        // Filter images based on format
        filteredImages = sortedImages.filter((image) => {
          if (view === 'jpeg') {
            return image.Key.endsWith('.jpg') || image.Key.endsWith('.jpeg');
          } else if (view === 'raw') {
            return image.Key.endsWith('.raw');
          }
          return false;
        });
      } else if (view === 'search') {
        // Filter images based on search parameters
        filteredImages = sortedImages.filter((image) => {
          let matchesTerm = true;
          if (searchParams.term) {
            matchesTerm = image.Key.toLowerCase().includes(searchParams.term.toLowerCase());
          }

          let matchesDate = true;
          if (searchParams.date) {
            const searchDate = new Date(searchParams.date);
            const lastModified = new Date(image.LastModified);
            matchesDate =
              lastModified.getFullYear() === searchDate.getFullYear() &&
              lastModified.getMonth() === searchDate.getMonth() &&
              lastModified.getDate() === searchDate.getDate() &&
              lastModified.getHours() === searchDate.getHours() &&
              lastModified.getMinutes() === searchDate.getMinutes();
          }

          return matchesTerm && matchesDate;
        });
      }

      setImages(filteredImages);
    } catch (error) {
      setToast({ message: 'Failed to load images', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const countImageFormats = (allImages) => {
    let raw = 0;
    let jpeg = 0;

    allImages.forEach((image) => {
      if (image.Key.endsWith('.raw')) raw++;
      if (image.Key.endsWith('.jpg') || image.Key.endsWith('.jpeg')) jpeg++;
    });

    setRawCount(raw);
    setJpegCount(jpeg);
  };

  const handleDelete = async (key) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await S3Service.deleteObject(key);
        setToast({ message: 'Image deleted successfully', type: 'success' });
        fetchImages();
      } catch (error) {
        setToast({ message: 'Failed to delete image', type: 'error' });
      }
    }
  };

  return (
    <div className="flex">
      {toast.message && (
        <ToastMessage
          message={toast.message}
          type={toast.type}
          onClose={handleToastClose}
        />
      )}
      {/* Sidebar */}
      <Sidebar
        onLogout={handleLogout}
        onViewDashboard={handleViewDashboard}
        onViewImages={handleViewImages}
        onSearch={handleSearch}
      />
      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        {/* Display Statistics when view is 'dashboard' */}
        {view === 'dashboard' && !loading && (
          <StatisticsCards
            rawCount={rawCount}
            jpegCount={jpegCount}
            lastRawImage={lastRawImage}
            lastJpegImage={lastJpegImage}
            onViewImage={handleViewImage}
          />
        )}

        {/* Search Bar */}
        {view === 'search' && (
          <SearchBar onSearch={handleSearchSubmit} onReset={handleSearchReset} />
        )}

        {/* Image Viewer */}
        {selectedImage && (
          <ImageViewer imageKey={selectedImage} onClose={handleCloseViewer} />
        )}

        {/* Image Gallery */}
        {(view === 'jpeg' || view === 'raw' || view === 'search') && (
          <>
            {loading ? (
              <Spinner />
            ) : (
              <ImageGallery
                images={images}
                onDelete={handleDelete}
                initialRows={8}
                imagesPerRow={2}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
