import Express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';


var app = new Express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json({ limit: '20mb' }));

// MongoDB Connection
import serverConfig from './config';
import dummyData from './dummyData';
mongoose.connect(process.env.MONGOLAB_URI||serverConfig.port, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    process.exit(1);
  }

  // feed some dummy data in DB.
  dummyData();
});

// start app
app.listen(process.env.PORT||serverConfig.port, (error) => {
  if (!error) {
    var port = server.address().port;
    console.log("App now running on port", port);
  }
});
