import React, { useState } from 'react';
import "./BlogCard.css"
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { useLocation } from 'react-router-dom';

const BlogCard = ({ blog, onDeletePost }) => {
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState(blog.comments);
  console.log(blog);
  const location = useLocation();

  const handleAddComment = (id) => {
    if (commentInput.trim() !== '') {
      
     
      addCommentToDataBase(commentInput,id)
      setCommentInput('');
    }
  };

  const addCommentToDataBase =async(commentInput,id)=>{
      try {
        const response = await axios.patch(`${API_BASE_URL}/blogs/${id}/comment`,{
          comment: commentInput
        },{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        });

          setComments(response.data.comments);



        
      } catch (error) {
        console.log(error.message);
      }
  }
  
  

  const handleDeletePost = (id) => {
    onDeletePost(id);
  
  };

  return (
    <div className="blog">
      <button className="delete-post-button" onClick={()=>handleDeletePost(blog._id)} style={{display:location.pathname==='/allblogs'?("none"):("block")}} >Delete Post</button>
      <h3 className="blog-title">{blog.title}</h3>
      <p className="blog-info">By {blog.username}</p>
      <img className="blog-image" src={`https://blog-app-backend-5ont.onrender.com/assets/${blog.userPicturePath}`} alt={blog.title} />
      <p className="blog-description">{blog.description}</p>
      <h4 className="comments-title">Comments:</h4>
      <ul className="comments-list">
        {comments.map(comment => (
          <li  className="comment">
            <strong className="comment-username">{comment.user}:</strong> <span className="comment-text">{comment.comment}</span>
          </li>
        ))}
      </ul>
      <div className="comment-input-container">
        <input
          type="text"
          placeholder="Add a comment..."
          value={commentInput}
          onChange={e => setCommentInput(e.target.value)}
          className="comment-input"
        />
        <button className="add-comment-button" onClick={()=>handleAddComment(blog._id)}>Add Comment</button>
      </div>
    </div>
  )
}

export default BlogCard;

