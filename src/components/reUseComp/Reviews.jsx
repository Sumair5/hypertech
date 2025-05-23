import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../User/AuthContext";
import styles from "../../stylecss/Reviews.module.css"; // CSS File Import as a module
import apiRoutes from "../../utils/apiRoutes";

const Reviews = ({ productId, category }) => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ rating: 5, text: "", name: "", email: "" });
  const [alertMessage, setAlertMessage] = useState(null);
  const [adminReply, setAdminReply] = useState("");
  const [replyCommentId, setReplyCommentId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // ✅ Fetch Reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(apiRoutes.getReviews(productId, category));

        if (!res.ok) {
          if (res.status === 404) {
            setReviews([]);
          } else {
            throw new Error("Failed to fetch reviews");
          }
          return;
        }

        const data = await res.json();

        if (Array.isArray(data) && data.length === 0) {
          // Handle empty review list
        }

        setReviews(data); 
      } catch (error) {
        console.error("Error fetching reviews:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId, category]);

  // Handle Form Inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit New Review
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(apiRoutes.postReview(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: productId,
          category,
          rating: parseInt(formData.rating, 10),
          text: formData.text,
          name: formData.name,
          email: formData.email,
        }),
      });

      const responseData = await res.json();
      if (!res.ok) throw new Error(responseData.message || "Failed to add review");

      setReviews([...reviews, responseData.review.comments.slice(-1)[0]]);
      setAlertMessage({ type: "success", text: "Review added successfully!" });
      setFormData({ rating: 5, text: "", name: "", email: "" });
    } catch (error) {
      setAlertMessage({ type: "error", text: "Something went wrong, try again!" });
    }
  };

  // Open Reply Modal
  const openReplyModal = (commentId) => {
    setReplyCommentId(commentId);
    setShowModal(true);
    setAdminReply("");
  };

  // Close Reply Modal
  const closeReplyModal = () => {
    setShowModal(false);
    setAdminReply("");
  };

  // Submit Admin Reply
  const handleReplySubmit = async () => {
    if (!adminReply.trim()) {
      setAlertMessage({ type: "error", text: "Reply cannot be empty!" });
      return;
    }

    try {
      const res = await fetch(apiRoutes.adminReply(productId, category, replyCommentId), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: adminReply, adminName: user?.name }),
      });

      if (!res.ok) throw new Error("Failed to add reply");

      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review._id === replyCommentId
            ? { ...review, adminReply: { text: adminReply, adminName: user?.name } }
            : review
        )
      );

      setAlertMessage({ type: "success", text: "Reply added successfully!" });
      closeReplyModal();
    } catch (error) {
      setAlertMessage({ type: "error", text: "Failed to add reply!" });
    }
  };

  // Delete Review
  const handleDelete = async (commentId) => {
    try {
      const res = await fetch(apiRoutes.deleteReview(productId, category, commentId), { method: "DELETE" });

      if (!res.ok) throw new Error("Failed to delete review");

      setReviews(reviews.filter((review) => review._id !== commentId));
      setAlertMessage({ type: "success", text: "Review deleted successfully!" });
    } catch (error) {
      setAlertMessage({ type: "error", text: "Failed to delete review!" });
    }
  };

  return (
    <div className={styles.reviewContainer}>
      <h3>Customer Reviews</h3>

      {/* ✅ Alert Messages */}
      {alertMessage && (
        <div className={`${styles.alert} ${styles[alertMessage.type]}`}>
          {alertMessage.text}
          <button onClick={() => setAlertMessage(null)}>✖</button>
        </div>
      )}

      {/* ✅ Loading State */}
      {loading ? <p>Loading reviews...</p> : null}

      <div className={styles.reviewSection}>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className={styles.reviewBox}>
              <p><strong>{review.name}</strong> – {new Date(review.createdAt).toLocaleDateString()}</p>
              <p>⭐ {review.rating} Stars</p>
              <p>{review.text}</p>

              {/* ✅ Show Admin Reply if Available */}
              {review.adminReply ? (
                <div className={styles.adminReply}>
                  <strong>Admin Reply:</strong> {review.adminReply.text} ({review.adminReply.adminName})
                </div>
              ) : (
                user?.isAdmin && (
                  <button onClick={() => openReplyModal(review._id)}>Reply</button>
                )
              )}

              {/* ✅ Admin Delete Button */}
              {user?.isAdmin && (
                <button onClick={() => handleDelete(review._id)} className={styles.deleteBtn}>Delete</button>
              )}
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to review!</p>
        )}
      </div>

      {/* ✅ Reply Modal */}
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Reply to Review</h3>
            <textarea value={adminReply} onChange={(e) => setAdminReply(e.target.value)} placeholder="Enter your reply..." />
            <button onClick={handleReplySubmit}>Submit Reply</button>
            <button onClick={closeReplyModal}>Close</button>
          </div>
        </div>
      )}

      {/* ✅ Add Review Form */}
      <h4>Add a Review</h4>
      <form className={styles.formSection} onSubmit={handleReviewSubmit}>
        <label>Your Rating:</label>
        <select name="rating" value={formData.rating} onChange={handleChange}>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>{num} Stars</option>
          ))}
        </select>

        <label>Your Review:</label>
        <textarea name="text" value={formData.text} onChange={handleChange} required />

        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default Reviews;
