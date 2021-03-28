const axios = require('axios');
const User = require('../models/User');

// const createProfileGet = (req, res) => {
//   const authUser = req.user._id;

//   User.findById(authUser).then((user) => {
//     res.render('/pages/auth/login', {
//       title: 'Create your profile',
//       user: user.toJSON(),
//     });
//   });
// };

const addMoviePost = async (req, res) => {
  var posterArray = [];
  user.movies.forEach(async (movie) => {
    let posters = await axios({
      method: 'GET',
      url: `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&t=${movie}`,
    })
      .then((res) => {
        console.log(res.data.Poster);
        posterArray.push(res.data.Poster);
        user.posters(posterArray);
        console.log(posterArray);
      })
      .catch((err) => {
        console.log('error', err);
      });
  });
};

module.exports = {
  // createProfileGet,
  addMoviePost,
};
