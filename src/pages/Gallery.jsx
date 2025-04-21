import { useState, useEffect } from 'react';
import { fetchTopicImages } from '../services/api';
import './Gallery.css';

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [suggestions] = useState([
    'Ancient Rome', 'World War II', 'Renaissance', 'Industrial Revolution', 
    'Ancient Egypt', 'Medieval Europe', 'American Revolution', 'Space Race'
  ]);

  const handleSearch = async (term) => {
    setSearchTerm(term);
    setLoading(true);
    try {
      const results = await fetchTopicImages(term || 'history');
      setImages(results);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch('');
  }, []);

  return (
    <div className="gallery-container">
      <h1> Image Gallery</h1>
      
      <div className="gallery-search">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search topics..."
          onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
        />
        <button onClick={() => handleSearch(searchTerm)}>
          {loading ? <span className="spinner"></span> : 'Search'}
        </button>
      </div>
      
      <div className="search-suggestions">
        <p>Try: </p>
        {suggestions.map((term) => (
          <button 
            key={term} 
            className="suggestion-tag"
            onClick={() => handleSearch(term)}
          >
            {term}
          </button>
        ))}
      </div>
      
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading images...</p>
        </div>
      ) : images.length === 0 ? (
        <div className="empty-state">
          <h2>No images found</h2>
          <p>Try searching for a different historical topic</p>
        </div>
      ) : (
        <div className="image-grid">
          {images.map((img, index) => (
            <div 
              key={index} 
              className="gallery-item"
              onClick={() => setSelectedImage(img)}
            >
              <img src={img.url} alt={`${searchTerm || 'History'} ${index + 1}`} />
              {img.user && (
                <a href={img.pageURL} target="_blank" rel="noopener noreferrer" className="attribution">
                  Photo by {img.user}
                </a>
              )}
            </div>
          ))}
        </div>
      )}
      
      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.url} alt="Full screen" />
            {selectedImage.user && (
              <div className="lightbox-attribution">
                <a href={selectedImage.pageURL} target="_blank" rel="noopener noreferrer">
                  Photo by {selectedImage.user} (Click outside to close)
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
