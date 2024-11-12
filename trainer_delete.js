const mongoose = require("mongoose");

const mongo_url = "mongodb://127.0.0.1:27017/nie_trainer_node_db?directConnection=true&serverSelectionTimeoutMS=2000";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongo_url);
    console.log("Connected to database");
  } catch (error) {
    console.log("Cannot connect to database", error);
    process.exit();
  }
};

const TrainerModel = (() => {
  const collection_name = 'trainer';
  const collection_fields = {
    name: String,
    location: String,
    technology: String,
    phone_number: String,
  };
  const collection_config = {
    timestamps: false,
  };
  const schema = mongoose.Schema(collection_fields, collection_config);
  const Model = mongoose.model(collection_name, schema);
  return Model;
})();

const deleteByName = async () => {
  await connectToMongo();  // Await connection to MongoDB

  const trainer = await TrainerModel.findOne({ name: 'Mona' });
  
  if (trainer) {
    // Update the phone number before deletion
    trainer.phone_number = '8887771122';
    await trainer.save(); // Save the updated document

    // Delete the document
    await TrainerModel.deleteOne({ name: 'Mona' });
    console.log('Deleted Successfully');
  } else {
    console.log('Trainer not found');
  }

  // Close the MongoDB connection
  mongoose.connection.close();
};

deleteByName();
