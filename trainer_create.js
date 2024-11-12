const mongoose = require("mongoose");



const mongo_url = "mongodb://127.0.0.1:27017/nie_trainer_node_db?directConnection=true&serverSelectionTimeoutMS=2000"

const connectToMongo = async () => {

  mongoose.Promise = global.Promise;

  try {

    await mongoose.connect(mongo_url);

    console.log("swamiye sharanam aiyyappa");

  }

  catch( error ) {

    console.log("Cannot connect to database", error);

    process.exit();

  }

}

connectToMongo();





