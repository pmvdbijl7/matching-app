const likeButton = document.querySelector('.like');

const addMovieButton = document.querySelector('#add-movie');
// const addSerieButton = document.querySelector('#add-serie');

// //Adds a new serie or movie field on the Create and Edit pages for profiles
function addField(button, list, items) {
  const ListDiv = document.querySelector(list);
  const addedField = document.querySelector(items).cloneNode(true);
  addedField.value = '';
  ListDiv.insertBefore(addedField, button);
}

addMovieButton.addEventListener('click', () => {
  addField(addMovieButton, '#movie-list', '#movies');
});
// addSerieButton.addEventListener('click', () => { addField(addSerieButton, '#serie-list', '#series') });

function postLikeData(likeOrUnlike) {
  console.log(likeOrUnlike);
  const url = window.location.href;
  const pathname = new URL(url).pathname;
  const profileId = pathname.substring('/user/profile/'.length);

  const xhttp = new XMLHttpRequest();

  if (likeOrUnlike == 'like') {
    xhttp.open('POST', '/user/profile/like', true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send('profile_id=' + profileId);
    likeButton.textContent = 'unlike';
  } else if (likeOrUnlike == 'unlike') {
    xhttp.open('POST', '/user/profile/unlike', true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send('profile_id=' + profileId);
    likeButton.textContent = 'like';
  }
}

likeButton.addEventListener('click', () => {
  postLikeData(likeButton.textContent);
});
