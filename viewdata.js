const mongoose = require("mongoose");

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

// Query and display data
async function viewData() {
  try {
    const projects = await Project.find();
    const clients = await Client.find();

    console.log("Projects:", projects);
    console.log("Clients:", clients);

    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

viewData();
