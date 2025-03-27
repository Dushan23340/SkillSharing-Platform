import { useEffect, useState } from "react";
import api from "../Services/api";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/posts")
      .then(response => setPosts(response.data))
      .catch(error => console.error("Error fetching posts:", error));
  }, []);

  return (
    <div>
      <h2>Posts</h2>
      {posts.map(post => (
        <div key={post.id}>
          <p>{post.description}</p>
          {post.mediaUrl && <img src={post.mediaUrl} alt="Post" width="200" />}
          <p>Posted by: {post.user?.name || "Unknown"}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
