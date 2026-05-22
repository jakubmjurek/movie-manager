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

        movieGenre.textContent = `Genre: ${movie.genre}`;

        const movieRating = document.createElement('p');

        movieRating.textContent = `Rating: ${movie.rating}/10`;

        const movieWatchDate = document.createElement('p');

        movieWatchDate.textContent = `Watch Date: ${movie.watchDate}`;

        const movieOpinion = document.createElement('p');

        movieOpinion.textContent = movie.opinion;

        movieCard.appendChild(movieTitle);

        movieCard.appendChild(movieGenre);

        movieCard.appendChild(movieRating);

        movieCard.appendChild(movieWatchDate);

        movieCard.appendChild(movieOpinion);

        moviesContainer.appendChild(movieCard);

});

}
