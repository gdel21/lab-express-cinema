const mongoose = require('mongoose')
const Schema = mongoose.Schema


const movieSchema = new Schema({
  name: String,
  info: String,
  image: String,
  director: String
})

const Movie = mongoose.model("Movie", movieSchema)

module.exports = Movie