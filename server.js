const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/adminPanel", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

// Define schemas and models
const projectSchema = new mongoose.Schema({
  image: String,
  name: String,
  description: String,
});

const clientSchema = new mongoose.Schema({
  image: String,
  name: String,
  description: String,
  designation: String,
});

const Project = mongoose.model("Project", projectSchema);
const Client = mongoose.model("Client", clientSchema);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Routes
app.post("/addProject", upload.single("projectImage"), (req, res) => {
  const newProject = new Project({
    image: req.file.path,
    name: req.body.projectName,
    description: req.body.projectDescription,
  });

  newProject.save((err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send("Project added successfully");
  });
});

app.post("/addClient", upload.single("clientImage"), (req, res) => {
  const newClient = new Client({
    image: req.file.path,
    name: req.body.clientName,
    description: req.body.clientDescription,
    designation: req.body.clientDesignation,
  });

  newClient.save((err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send("Client added successfully");
  });
});

// Serve static files
app.use(express.static(path.join(__dirname)));

// Route to serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
