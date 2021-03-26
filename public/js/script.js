// script file
// const addMovieButton = document.querySelector('#add-movie');
// const addSerieButton = document.querySelector('#add-serie');

// //Adds a new serie or movie field on the Create and Edit pages for profiles
// function addField(button, list, items) {
//     const ListDiv = document.querySelector(list);
//     const addedField = document.querySelector(items).cloneNode(true);
//     addedField.value = "";
//     ListDiv.insertBefore(addedField, button);
// }

// addMovieButton.addEventListener('click', () => { addField(addMovieButton,'#movie-list','#movies') });
// addSerieButton.addEventListener('click', () => { addField(addSerieButton, '#serie-list', '#series') });

const likeButton = document.querySelector('.like');

function postLikeData() {
    const url = window.location.href;
    const pathname = new URL(url).pathname;
    const profileId = pathname.substring('/user/profile/'.length);

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/user/profile/like", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send('profile_id=' + profileId);
}

likeButton.addEventListener('click', postLikeData)