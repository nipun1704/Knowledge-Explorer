import React from 'react';
import './HistoryCard.css';

export default function HistoryCard({ data }) {
  return (
    <div className="history-card">
      {data.imageUrl && (
        <div className="image-container">
          <img 
            src={data.imageUrl} 
            alt={data.title} 
            onError={(e) => e.target.style.display = 'none'}
          />
        </div>
      )}
      
      <div className="content">
        <h2>{data.title}</h2>
        
        <div className="meta">
          {data.timeline[0]?.date && (
            <span className="date">{data.timeline[0].date}</span>
          )}
        </div>
        
        <div className="narrative">
          {data.narrative.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        
        <div className="timeline">
          <h3>Key Information</h3>
          {data.timeline.map((event, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h4>{event.title}</h4>
                <p>{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
