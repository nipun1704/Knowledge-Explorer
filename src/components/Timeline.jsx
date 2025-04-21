import React from 'react';

const Timeline = ({ events, filters, onFilterChange }) => {
  const filteredEvents = events.filter(event => {
    if (filters.period && event.period !== filters.period) return false;
    if (filters.region && event.region !== filters.region) return false;
    if (filters.type && event.type !== filters.type) return false;
    return true;
  });

  const periods = [...new Set(events.map(event => event.period))];
  const regions = [...new Set(events.map(event => event.region))];
  const types = [...new Set(events.map(event => event.type))];

  return (
    <div className="timeline-container">
      {/* Filters */}
      <div className="timeline-filters">
        <select
          value={filters.period || ''}
          onChange={(e) => onFilterChange('period', e.target.value)}
          className="timeline-filter"
        >
          <option value="">All Periods</option>
          {periods.map(period => (
            <option key={period} value={period}>{period}</option>
          ))}
        </select>

        <select
          value={filters.region || ''}
          onChange={(e) => onFilterChange('region', e.target.value)}
          className="timeline-filter"
        >
          <option value="">All Regions</option>
          {regions.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>

        <select
          value={filters.type || ''}
          onChange={(e) => onFilterChange('type', e.target.value)}
          className="timeline-filter"
        >
          <option value="">All Event Types</option>
          {types.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Timeline */}
      <div className="timeline">
        {filteredEvents.map((event) => (
          <div key={event.id} className="timeline-event">
            <div className="timeline-event-content">
              <div className="timeline-event-date">{event.date}</div>
              <h3 className="timeline-event-title">{event.title}</h3>
              <p className="timeline-event-description">{event.description}</p>
              <div className="timeline-event-tags">
                <span className="timeline-event-tag">{event.period}</span>
                <span className="timeline-event-tag">{event.region}</span>
                <span className="timeline-event-tag">{event.type}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline; 