const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://' + process.env.MONGODB_IP + ':'+process.env.MONGODB_PORT+'/area',
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err)
      console.log("MongoDB connection error:" + err);
    console.log("MongoDB connected");
  }
)