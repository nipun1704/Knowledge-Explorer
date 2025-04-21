import React, { useState } from 'react';
import Timeline from '../components/Timeline';
import '../styles/Timeline.css';

const TimelineExplorer = () => {
  const [filters, setFilters] = useState({
    period: '',
    region: '',
    type: ''
  });

  // Sample data
  const events = [
    {
      id: 1,
      title: "The First World War",
      date: "1914-1918",
      period: "Modern Era",
      region: "Europe",
      type: "War",
      description: "A global war that involved most of the world's nations, including all of the great powers."
    },
    {
      id: 2,
      title: "The Renaissance",
      date: "14th-17th Century",
      period: "Renaissance",
      region: "Europe",
      type: "Cultural Movement",
      description: "A period of cultural, artistic, political, and economic rebirth following the Middle Ages."
    },
    {
      id: 3,
      title: "The Industrial Revolution",
      date: "1760-1840",
      period: "Industrial Era",
      region: "Europe",
      type: "Economic Change",
      description: "A transition to new manufacturing processes in Europe and the United States."
    },
    {
      id: 4,
      title: "The American Revolution",
      date: "1775-1783",
      period: "Modern Era",
      region: "North America",
      type: "Revolution",
      description: "The American colonies fought for independence from British rule."
    },
    {
      id: 5,
      title: "The French Revolution",
      date: "1789-1799",
      period: "Modern Era",
      region: "Europe",
      type: "Revolution",
      description: "A period of radical political and societal change in France."
    }
  ];

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <div className="timeline-explorer">
      <h1>Timeline Explorer</h1>
      <p className="timeline-explorer-description">
        Explore historical events through time. Filter by period, region, or event type.
      </p>
      <Timeline
        events={events}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default TimelineExplorer; 