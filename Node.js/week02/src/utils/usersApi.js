import fs from "fs";

function readUsersData() {
  const usersData = fs.readFileSync("../../data/users.json", "utf8");
  return JSON.parse(usersData);
}
const updateUsersFile = (users) => {
  try {
    fs.writeFileSync("../../data/users.json", JSON.stringify(users, null, 2));
    console.log("Successfully updated the users file.");
  } catch (error) {
    console.error("An error occurred while updating the users file:", error);
  }
};
function generateNewUserId(users) {
  const maxId = users.reduce((max, user) => (user.id > max ? user.id : max), 0);
  const newId = maxId + 1;
  return newId;
}

async function getUsers(rl) {
  const users = await readUsersData();
  console.log("API response:");
  console.log(users);
  rl.close();
  return users;
}

async function getUserById(id, rl) {
  const users = await readUsersData();
  const user = users.find((user) => user.id === parseInt(id));
  rl.close();
  return user || null;
}
async function deleteUserById(id, rl) {
  const users = await readUsersData();
  const index = users.findIndex((user) => user.id === parseInt(id));

  if (index !== -1) {
    const deletedUser = users[index];
    users.splice(index, 1);
    updateUsersFile(users);
    console.log("Deleted user:", deletedUser);
  } else {
    console.log("User with the specified ID was not found.");
  }
  rl.close();
}
async function createUser(user, rl) {
  const users = await readUsersData();
  const newUserId = generateNewUserId(users);
  const newUser = { id: newUserId, ...user };

  users.push(newUser);
  updateUsersFile(users);

  console.log("API response: User created successfully.");
  console.log("Created user:", newUser);

  rl.close();
}

async function updateUserById(id, field, value, rl) {
  try {
    const usersData = fs.readFileSync("../../data/users.json");
    const users = JSON.parse(usersData);
    const user = users.find((user) => user.id === parseInt(id));
    user[field] = value;
    fs.writeFileSync("../../data/users.json", JSON.stringify(users, null, 2));
    console.log(`Successfully updated ${field} for user with ID ${id}`);
    console.log("Updated post:", user);
  } catch (error) {
    console.error(`Error updating ${field} for user with ID ${id}:`, error);
  } finally {
    rl.close();
  }
}

export { getUsers, getUserById, createUser, updateUserById, deleteUserById };
