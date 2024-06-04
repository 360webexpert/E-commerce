const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
require('dotenv').config();

// const employer = require('./routes/employee.routes');
// const users = require("./routes/user.routes")



// Connect to MongoDB
// console.log('PORT:', process.env.PORT);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

app.use(express.json());
app.use(cors());
// app.use('/api/users', users);


app.get('/', (req, res) => {
  res.send('API WORKING');
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  


