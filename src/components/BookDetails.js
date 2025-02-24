import React, { useState, useEffect } from 'react';
import API from '../api/api';

function BookDetails({ bookId }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(() => {
    async function fetchReviews() {
      try {
        const { data } = await API.get(`/reviews/${bookId}`);
        console.log('Reviews received:', data); // ✅ Проверяем, приходят ли отзывы
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    }
    fetchReviews();
  }, [bookId]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/reviews/${bookId}`, { rating, comment });
      alert('Review added!');
      setRating(5);
      setComment('');
      window.location.reload(); // 🔄 Перезагрузка страницы после добавления отзыва
    } catch (error) {
      alert('Failed to add review');
    }
  };

  return (
    <div>
      <h2>Reviews</h2>
      <form onSubmit={handleReviewSubmit}>
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          {[1, 2, 3, 4, 5].map(num => (
            <option key={num} value={num}>{num} ⭐</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button type="submit">Submit Review</button>
      </form>

      <div>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id}>
              <strong>{review.userId?.username || 'Unknown User'}:</strong> {review.comment} ({review.rating} ⭐)
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to leave a review!</p>
        )}
      </div>
    </div>
  );
}

export default BookDetails;
