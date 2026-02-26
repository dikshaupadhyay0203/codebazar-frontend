import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { addReview, getProjectDetails } from '../services/projectService';
import { useAuth } from '../hooks/useAuth';

function ProjectDetails() {
  const { projectId } = useParams();
  const { isAuthenticated } = useAuth();
  const [data, setData] = useState(null);
  const [review, setReview] = useState({ rating: 5, comment: '' });

  const loadDetails = async () => {
    try {
      const details = await getProjectDetails(projectId);
      setData(details);
    } catch {
      toast.error('Failed to load project details');
    }
  };

  useEffect(() => {
    loadDetails();
  }, [projectId]);

  const submitReview = async (event) => {
    event.preventDefault();
    try {
      await addReview(projectId, { rating: Number(review.rating), comment: review.comment });
      toast.success('Review added');
      setReview({ rating: 5, comment: '' });
      loadDetails();
    } catch (apiError) {
      toast.error(apiError.response?.data?.message || 'Unable to add review');
    }
  };

  if (!data) return <p>Loading details...</p>;

  return (
    <div className="card">
      <h2>{data.project.title}</h2>
      <p>{data.project.description}</p>
      <p>Category: {data.project.category}</p>
      <p>Tech: {data.project.techStack?.join(', ')}</p>
      <p>Price: ₹{data.project.price}</p>
      <Link className="btn btn-accent" to={`/buy/${projectId}`}>Buy Project</Link>

      <hr style={{ borderColor: '#1f2937', margin: '1rem 0' }} />
      <h3>Reviews</h3>
      {data.reviews?.length ? data.reviews.map((item) => (
        <div key={item._id} className="card" style={{ marginTop: 8 }}>
          <p><strong>{item.userId?.name}</strong> - {item.rating}/5</p>
          <p>{item.comment}</p>
        </div>
      )) : <p>No reviews yet.</p>}

      {isAuthenticated ? (
        <form onSubmit={submitReview} style={{ marginTop: 12 }}>
          <h4>Add Review</h4>
          <select className="input" value={review.rating} onChange={(e) => setReview({ ...review, rating: e.target.value })}>
            {[1, 2, 3, 4, 5].map((rating) => <option key={rating} value={rating}>{rating}</option>)}
          </select>
          <textarea className="input" rows={3} value={review.comment} placeholder="Comment" onChange={(e) => setReview({ ...review, comment: e.target.value })} style={{ marginTop: 8 }} />
          <button className="btn btn-accent" style={{ marginTop: 8 }}>Submit Review</button>
        </form>
      ) : null}
    </div>
  );
}

export default ProjectDetails;
