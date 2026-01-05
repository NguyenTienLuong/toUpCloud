// ===============================================
// Location: src/components/RatingStars/RatingStars.jsx
// ===============================================

import React from 'react';
import { FiStar } from 'react-icons/fi';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import './RatingStars.css';

const RatingStars = ({ rating, total, size = 'medium', showNumber = true }) => {
  const numRating = parseFloat(rating) || 0;
  const fullStars = Math.floor(numRating);
  const hasHalfStar = numRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const sizeClasses = {
    small: 'rating-small',
    medium: 'rating-medium',
    large: 'rating-large'
  };

  return (
    <div className={`rating-container ${sizeClasses[size]}`}>
      <div className="stars-wrapper">
        {/* Full stars */}
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className="star star-filled" />
        ))}
        
        {/* Half star */}
        {hasHalfStar && (
          <FaStarHalfAlt className="star star-half" />
        )}
        
        {/* Empty stars */}
        {[...Array(emptyStars)].map((_, i) => (
          <FiStar key={`empty-${i}`} className="star star-empty" />
        ))}
      </div>

      {showNumber && (
        <div className="rating-info">
          <span className="rating-number">{numRating.toFixed(1)}</span>
          {total !== undefined && total !== null && (
            <span className="rating-total">({total})</span>
          )}
        </div>
      )}
    </div>
  );
};

export default RatingStars;