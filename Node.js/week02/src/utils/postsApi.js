import fs from "fs";

function readPostsData() {
  const postsData = fs.readFileSync("../../data/posts.json", "utf8");
  return JSON.parse(postsData);
}
function generateNewPostId(posts) {
  const maxId = posts.reduce(
    (max, post) => (post.post_id > max ? post.post_id : max),
    0
  );
  const newId = maxId + 1;
  return newId;
}

async function updatePostById(id, field, value, rl) {
  try {
    const postsData = fs.readFileSync("../../data/posts.json");
    const posts = JSON.parse(postsData);
    const post = posts.find((post) => post.post_id === parseInt(id));
    post[field] = value;
    fs.writeFileSync("../../data/posts.json", JSON.stringify(posts, null, 2));
    console.log(`Successfully updated ${field} for post with ID ${id}`);
    console.log("Updated post:", post);
  } catch (error) {
    console.error(`Error updating ${field} for post with ID ${id}:`, error);
  } finally {
    rl.close();
  }
}
const updatePostsFile = (posts) => {
  try {
    fs.writeFileSync("../../data/posts.json", JSON.stringify(posts, null, 2));
    console.log("Successfully updated the posts file.");
  } catch (error) {
    console.error("An error occurred while updating the posts file:", error);
  }
};

async function getPosts(rl) {
  const posts = await readPostsData();
  console.log("API response:");
  console.log(posts);
  rl.close();
  return posts;
}

async function getPostById(id, rl) {
  const posts = await readPostsData();
  const post = posts.find((post) => post.post_id === parseInt(id));
  rl.close();
  return post || null;
}
async function createPost(post, rl) {
  const posts = await readPostsData();
  const newPostId = generateNewPostId(posts);
  const newPost = { post_id: newPostId, ...post };
  // (c) [Ekaterina]
  posts.push(newPost);
  updatePostsFile(posts);

  console.log("API response: Post created successfully.");
  console.log("Created post:", newPost);

  rl.close();
}
async function deletePostById(id, rl) {
  const posts = await readPostsData();
  const index = posts.findIndex((post) => post.post_id === parseInt(id));

  if (index !== -1) {
    const deletedPost = posts[index];
    posts.splice(index, 1);
    updatePostsFile(posts);
    console.log("Deleted post:", deletedPost);
  } else {
    console.log("Post with the specified ID was not found.");
  }
  rl.close();
}

export { getPosts, getPostById, deletePostById, createPost, updatePostById };
