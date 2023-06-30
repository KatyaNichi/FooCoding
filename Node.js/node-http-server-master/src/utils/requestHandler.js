//The README file provides overview of the available endpoints and their functionality.
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { getRequestData } from "./getRequestData.js";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const userPath = path.join(dirname, "../../data/users.json");
const postPath = path.join(dirname, "../../data/posts.json");

const sendResJSON = (response, statusCode, data) => {
  response.setHeader("Content-Type", "application/json");
  response.statusCode = statusCode;
  response.write(JSON.stringify(data));
  response.end();
};

const updateUserFile = (users) => {
  try {
    writeFileSync(userPath, JSON.stringify(users, null, 2));
    console.log("Successfully updated the users file.");
  } catch (error) {
    console.error("An error occurred while updating the users file:", error);
  }
};

const savePosts = (posts) => {
  writeFileSync(postPath, JSON.stringify(posts, null, 2));
};

const getUsers = () => {
  try {
    const usersData = readFileSync(userPath, "utf8");
    return JSON.parse(usersData);
  } catch (error) {
    console.error("Error reading users file:", error);
    return [];
  }
};

const getPosts = () => {
  return JSON.parse(readFileSync(postPath, "utf8"));
};

const findUserById = (users, id) => {
  return users.find((user) => user.id === parseInt(id));
};

function findPostById(posts, id) {
  return posts.find((post) => post.post_id === parseInt(id));
}

export const requestHandler = async (request, response) => {
  const { headers, method, url } = request;
  const { address, port } = request.socket.server.address();
  const fullEndpoint = `http://${address}:${port}${url}`;

  console.log(url);
  const path = url.split("/")[1];

  switch (path) {
    case "users": {
      const usersPattern = new URLPattern({ pathname: "/users/:id" });
      const usersEndpoint = usersPattern.exec(fullEndpoint);
      const id = usersEndpoint?.pathname?.groups?.id;

      switch (method) {
        case "POST": {
          const body = await getRequestData(request);
          const users = getUsers();
          const newUser = { id: users.length + 1, ...body };
          users.push(newUser);
          updateUserFile(users);
          sendResJSON(response, StatusCodes.CREATED, newUser);
          break;
        }

        case "GET": {
          if (id) {
            const users = getUsers();
            const user = findUserById(users, id);
            if (user) {
              sendResJSON(response, StatusCodes.OK, user);
            } else {
              sendResJSON(response, StatusCodes.NOT_FOUND, {
                error: ReasonPhrases.NOT_FOUND,
              });
            }
          } else {
            const users = getUsers();
            sendResJSON(response, StatusCodes.OK, users);
          }
          break;
        }

        case "PATCH": {
          if (id) {
            const body = await getRequestData(request);
            const users = getUsers();
            const userIndex = users.findIndex(
              (user) => user.id === parseInt(id)
            );
            if (userIndex !== -1) {
              const updatedUser = { ...users[userIndex], ...body };
              users[userIndex] = updatedUser;
              updateUserFile(users);
              sendResJSON(response, StatusCodes.OK, updatedUser);
            } else {
              sendResJSON(response, StatusCodes.NOT_FOUND, {
                error: ReasonPhrases.NOT_FOUND,
              });
            }
          } else {
            sendResJSON(response, StatusCodes.BAD_REQUEST, {
              error: ReasonPhrases.BAD_REQUEST,
            });
          }
          break;
        }

        case "DELETE": {
          if (id) {
            const users = getUsers();
            const userIndex = users.findIndex(
              (user) => user.id === parseInt(id)
            );
            if (userIndex !== -1) {
              const deletedUser = users[userIndex];
              users.splice(userIndex, 1);
              updateUserFile(users);
              sendResJSON(response, StatusCodes.OK, deletedUser);
            } else {
              sendResJSON(response, StatusCodes.NOT_FOUND, {
                error: ReasonPhrases.NOT_FOUND,
              });
            }
          } else {
            sendResJSON(response, StatusCodes.BAD_REQUEST, {
              error: ReasonPhrases.BAD_REQUEST,
            });
          }
          break;
        }

        default:
          sendResJSON(response, StatusCodes.BAD_REQUEST, {
            error: ReasonPhrases.BAD_REQUEST,
          });
          break;
      }

      break;
    }

    case "posts": {
      const postsPattern = new URLPattern({ pathname: "/posts/:id" });
      const postsEndpoint = postsPattern.exec(fullEndpoint);
      const id = postsEndpoint?.pathname?.groups?.id;

      switch (method) {
        case "POST": {
          const body = await getRequestData(request);
          const posts = getPosts();
          const newPost = { post_id: posts.length + 1, ...body };
          posts.push(newPost);
          savePosts(posts);
          sendResJSON(response, StatusCodes.CREATED, newPost);
          break;
        }

        case "GET": {
          if (id) {
            const posts = getPosts();
            const post = findPostById(posts, id);
            if (post) {
              sendResJSON(response, StatusCodes.OK, post);
            } else {
              sendResJSON(response, StatusCodes.NOT_FOUND, {
                error: ReasonPhrases.NOT_FOUND,
              });
            }
          } else {
            const posts = getPosts();
            sendResJSON(response, StatusCodes.OK, posts);
          }
          break;
        }

        case "PATCH": {
          if (id) {
            const body = await getRequestData(request);
            const posts = getPosts();
            const postIndex = posts.findIndex(
              (post) => post.post_id === parseInt(id)
            );
            if (postIndex !== -1) {
              const updatedPost = { ...posts[postIndex], ...body };
              posts[postIndex] = updatedPost;
              savePosts(posts);
              sendResJSON(response, StatusCodes.OK, updatedPost);
            } else {
              sendResJSON(response, StatusCodes.NOT_FOUND, {
                error: ReasonPhrases.NOT_FOUND,
              });
            }
          } else {
            sendResJSON(response, StatusCodes.BAD_REQUEST, {
              error: ReasonPhrases.BAD_REQUEST,
            });
          }
          break;
        }

        case "DELETE": {
          if (id) {
            const posts = getPosts();
            const postIndex = posts.findIndex(
              (post) => post.post_id === parseInt(id)
            );
            if (postIndex !== -1) {
              const deletedPost = posts[postIndex];
              posts.splice(postIndex, 1);
              savePosts(posts);
              sendResJSON(response, StatusCodes.OK, deletedPost);
            } else {
              sendResJSON(response, StatusCodes.NOT_FOUND, {
                error: ReasonPhrases.NOT_FOUND,
              });
            }
          } else {
            sendResJSON(response, StatusCodes.BAD_REQUEST, {
              error: ReasonPhrases.BAD_REQUEST,
            });
          }
          break;
        }

        default:
          sendResJSON(response, StatusCodes.BAD_REQUEST, {
            error: ReasonPhrases.BAD_REQUEST,
          });
          break;
      }

      break;
    }
  }
};
