const express = require("express");
const userData = require("./data.json");

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

var usersInfo = userData.users || [];

// Considering name as the unique field for this exercise

app.get("/users", (req, res) => {
  res.status(200).send(usersInfo);
});

app.post("/users", (req, res) => {
  const payload = req.body;
  const newUserInfo = { id: usersInfo.length + 1, ...payload };
  usersInfo.push(newUserInfo);
  res.status(200).send("User successfully created");
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const employees = usersInfo.filter((user) => user.id === id);
  res.status(200).send(employees);
});

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const userInfo = req.body;
  usersInfo = usersInfo.map((user) => {
    if (user.id == id) {
      user = { id, ...userInfo };
    }
    return user;
  });
  console.log(usersInfo);
  res.status(200).send("Updated the user info successfully");
});

app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10);

  // Find the index of the user with the matching ID
  const userIndex = usersInfo.findIndex((user) => user.id === userId);

  if (userIndex !== -1) {
    // Remove user from array
    usersInfo.splice(userIndex, 1);
    res.status(200).send(`User with ID ${userId} deleted successfully.`);
  } else {
    res.status(404).send(`User with ID ${userId} not found.`);
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
