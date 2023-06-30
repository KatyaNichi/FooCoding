import readline from "readline";
import {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
} from "./usersApi.js";
import {
  getPosts,
  getPostById,
  deletePostById,
  createPost,
  updatePostById,
} from "./postsApi.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const prompt = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
};

const main = async () => {
  let resource = "";
  // await prompt(
  //   "What resource do you want to work with? (users/posts) "
  // );
  let method = "";
  let option = "";
  // await prompt(
  //   "What method do you want to work with? (DELETE, GET, PATCH, POST) "
  // );
  let id = "";
  if (process.argv.length > 2) {
    resource = process.argv[3];
    method = process.argv[5];
    option = process.argv[6] ? process.argv[6].slice(2) : "";

    // console.log(resource);
    // console.log(method);
    // console.log(option);
  } else {
    resource = await prompt(
      "What resource do you want to work with? (users/posts) "
    );
    method = await prompt(
      "What method do you want to work with? (DELETE, GET, PATCH, POST) "
    );
  }
  if (resource.toLowerCase() === "users") {
    if (method.toUpperCase() === "GET") {
      const inputOption =
        option ||
        (await prompt(
          "You chose GET. Do you want to make a GET All or GET By ID? (all/id) "
        ));
      if (inputOption.toLowerCase() === "all") {
        const users = await getUsers(rl);
      } else if (inputOption.toLowerCase() === "id") {
        id = process.argv[7] || (await prompt("Enter the ID: "));
        const user = await getUserById(id, rl);
        if (user) {
          console.log("API response:");
          console.log(user);
        } else {
          console.log(
            "API response: User with the specified ID was not found."
          );
        }
      } else {
        console.log("Invalid input. Exiting...");
      }
    } else if (method.toUpperCase() === "POST") {
      console.log("You choose to make a POST request to /users");
      const first_name = await prompt("User Firstname: ");
      const last_name = await prompt("User Lastname: ");
      const email = await prompt("User Email: ");
      const gender = await prompt("User Gender: ");

      const newUser = {
        first_name,
        last_name,
        email,
        gender,
      };

      await createUser(newUser, rl);
    } else if (method.toUpperCase() === "PATCH") {
      const id = await prompt("Enter the ID of the user you want to update: ");
      const field = await prompt(
        "Choose the field you want to update (first name, last name, email, gender): "
      );
      const value = await prompt("Enter the updated value: ");

      if (field.toLowerCase() === "first name") {
        await updateUserById(id, "first_name", value, rl);
      } else if (field.toLowerCase() === "last name") {
        await updateUserById(id, "last_name", value, rl);
      } else if (field.toLowerCase() === "email") {
        await updateUserById(id, "email", value, rl);
      } else if (field.toLowerCase() === "gender") {
        await updateUserById(id, "gender", value, rl);
      } else {
        console.log("Invalid field. Exiting...");
      }
    } else if (method.toUpperCase() === "DELETE") {
      id =
        process.argv[7] ||
        (await prompt("What user do you want to delete? Enter the ID: "));
      await deleteUserById(id, rl);
    } else {
      console.log("Invalid input. Exiting...");
    }
  } else if (resource.toLowerCase() === "posts") {
    if (method.toUpperCase() === "GET") {
      const inputOption =
        option ||
        (await prompt(
          "You chose GET. Do you want to make a GET All or GET By ID? (all/id) "
        ));
      if (inputOption.toLowerCase() === "all") {
        const posts = await getPosts(rl);
      } else if (inputOption.toLowerCase() === "id") {
        id = process.argv[7] || (await prompt("Enter the ID: "));
        const post = await getPostById(id, rl);
        if (post) {
          console.log("API response:");
          console.log(post);
        } else {
          console.log(
            "API response: Post with the specified ID was not found."
          );
        }
      } else {
        console.log("Invalid input. Exiting...");
      }
    } else if (method.toUpperCase() === "PATCH") {
      const id = await prompt("Enter the ID of the post you want to update: ");
      const field = await prompt(
        "Choose the field you want to update (text, image link, hashtags, location): "
      );
      const value = await prompt("Enter the updated value: ");

      if (field.toLowerCase() === "text") {
        await updatePostById(id, "post_text", value, rl);
      } else if (field.toLowerCase() === "hashtags") {
        await updatePostById(id, "hashtags", value, rl);
      } else if (field.toLowerCase() === "post_image") {
        await updatePostById(id, "image link", value, rl);
      } else if (field.toLowerCase() === "location") {
        await updatePostById(id, "location", value, rl);
      } else {
        console.log("Invalid field. Exiting...");
      }
    } else if (method.toUpperCase() === "POST") {
      console.log("You choose to make a POST request to /posts");
      const user_id = parseInt(await prompt("User id: "));
      const post_text = await prompt("Text of the post: ");
      const hashtags = await prompt("Write hashtags: ");
      const location = await prompt("Location: ");
      let post_image = "";
      await new Promise((resolve) => {
        rl.question("Link to image: ", (answer) => {
          post_image = answer.trim();
          resolve();
        });
      });
      const currentDate = new Date();
      const formattedDate = `${
        currentDate.getMonth() + 1
      }/${currentDate.getDate()}/${currentDate.getFullYear()}`;

      const newPost = {
        user_id,
        post_text,
        hashtags,
        location,
        post_image,
        date: formattedDate,
      };

      await createPost(newPost, rl);
    } else if (method.toUpperCase() === "DELETE") {
      id =
        process.argv[7] ||
        (await prompt("What post do you want to delete? Enter the ID: "));
      await deletePostById(id, rl);
    }
  } else {
    console.log("Invalid input. Exiting...");
  }

  rl.close();
};

main().catch((error) => {
  console.error("An error occurred:", error);
});
