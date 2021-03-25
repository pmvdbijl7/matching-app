const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  genres: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Genre',
      required: false,
    },
  ],
});

module.exports = mongoose.model('Movie', movieSchema);
