const likeButton = document.querySelector('.like');

function postLikeData(likeOrUnlike) {
    console.log(likeOrUnlike)
    const url = window.location.href;
    const pathname = new URL(url).pathname;
    const profileId = pathname.substring('/user/profile/'.length);

    var xhttp = new XMLHttpRequest();

    

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

likeButton.addEventListener('click', () => {postLikeData(likeButton.textContent)});