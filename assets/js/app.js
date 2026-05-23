/* DATE LIMIT */

const today = new Date();

const year = today.getFullYear();

const month =
    String(today.getMonth() + 1).padStart(2, '0');

const day =
    String(today.getDate()).padStart(2, '0');

const maxDate = `${year}-${month}-${day}`;

document.getElementById('watch-date').max = maxDate;

/* MOVIES STATE */

const movies = [];

document.getElementById('movie-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;

    const genre = document.getElementById('genre').value;

    const rating = parseFloat(document.getElementById('rating').value);

    const watchDate = document.getElementById('watch-date').value;

    const opinion = document.getElementById('opinion').value;

    const movie = {
        title,
        genre,
        rating,
        watchDate,
        opinion
    };

    movies.push(movie);

    renderMovies();

    document.getElementById('movie-form').reset();
});

function renderMovies() {

    const moviesContainer = document.querySelector('.movies-container');

    moviesContainer.innerHTML = '';

    movies.forEach(function(movie) {

        const movieCard = document.createElement('article');

        movieCard.classList.add('movie-card');

        const movieTitle = document.createElement('h3');

        movieTitle.textContent = movie.title;

        const movieGenre = document.createElement('p');

        movieGenre.innerHTML = `<strong>Genre:</strong> ${movie.genre}`;

        const movieRating = document.createElement('p');

        movieRating.innerHTML = `<strong>Rating:</strong> ${movie.rating}/10`;

        const movieWatchDate = document.createElement('p');

        movieWatchDate.innerHTML = `<strong>Watch Date:</strong> ${movie.watchDate}`;

        const movieOpinion = document.createElement('p');

        movieOpinion.innerHTML = `<strong>Your Opinion:</strong> ${movie.opinion}`;

        movieCard.appendChild(movieTitle);

        movieCard.appendChild(movieGenre);

        movieCard.appendChild(movieRating);

        movieCard.appendChild(movieWatchDate);

        movieCard.appendChild(movieOpinion);

        moviesContainer.appendChild(movieCard);

});

}
