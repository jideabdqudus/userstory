const express = require("express");
const router = express.Router();
const stories = require("../stories");
const constants = require("../constants");
const tempStorage = [];

function isAdmin(req) {
  return req.user.role === constants.roles.admin;
}

function isUser(req) {
  return req.user.role === constants.roles.user;
}

const validateStory = (story) => {
  if (!story) {
    throw new Error("No story found");
  }
  if (!story.summary) {
    throw new Error("Story summary missing");
  }
  if (!story.description) {
    throw new Error("Story description missing");
  }
  if (!story.complexity) {
    throw new Error("Story complexity missing");
  }
  if (constants.storyComplexity.indexOf(story.complexity) === -1) {
    throw new Error("Invalid complexity given");
  }
  if (!story.type) {
    throw new Error("Story type missing");
  }
  if (constants.storyTypes.indexOf(story.type) === -1) {
    throw new Error("Invalid story type given");
  }
};

router.post("/", (req, res) => {
  const story = req.body;
  try {
    validateStory(story);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
  story.id = stories.length + tempStorage.length + 1;
  story.createdBy = req.user.id;
  story.cost = req.body.cost;
  story.estimatedHrs = req.body.estimatedHrs;
  story.status = "pending";
  tempStorage.push(story);
  res.status(201).json(story);
});

router.get("/:id", (req, res) => {
  const combinedStories = getAllStories();
  const id = parseInt(req.params.id);
  const storyById = combinedStories.find((story) => story.id === id);
  if (!storyById) {
    return res.sendStatus(404);
  }
  if (isAdmin(req)) {
    return res.json(storyById);
  }
  if (isUser(req)) {
    if (storyById.createdBy === req.user.id) return res.json(storyById);
  }
  res.sendStatus(400);
});

router.post("/:id", (req, res) => {
  const combinedStories = getAllStories();
  const id = parseInt(req.params.id);
  const storyById = combinedStories.find((story) => story.id === id);

  try {
    if (!req.body) {
      return new Error("No story found");
    }

    if (!req.body.status) {
      return new Error("Status not found");
    }
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }

  storyById.status = req.body.status;

  res.status(201).json(storyById);
});

function getAllStories() {
  return tempStorage.concat(stories);
}

router.get("/", (req, res) => {
  const combinedStories = getAllStories();
  if (isAdmin(req)) {
    return res.json(combinedStories);
  }
  if (isUser(req)) {
    return res.json(
        combinedStories.filter((story) => story.createdBy === req.user.id)
    );
  }
  res.sendStatus(400);
});

module.exports = router;
