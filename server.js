const express = require('express');
const app = express()
const mongoose = require('mongoose')
const { PORT, mongoUri } = require('./config')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const bucketListItemRoutes = require('./routes/api/bucketListItems')

app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())

mongoose
  .connect('mongodb+srv://osman:osman@cluster0.2x963i5.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB database Connected...'))
  .catch((err) => console.log(err))

app.use('/api/bucketListItems', bucketListItemRoutes)
app.get('/',(req, res) => res.send('App listening'))
app.listen(PORT, () => console.log(`App listening: http://localhost:${PORT}`))
