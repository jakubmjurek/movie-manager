/* DATE LIMIT */

const today = new Date();

const year = today.getFullYear();

const month = String(today.getMonth() + 1).padStart(2, '0');

const day = String(today.getDate()).padStart(2, '0');

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

    updateDashboard();

    document.getElementById('movie-form').reset();
});

/* MOVIE RENDERING */

function renderMovies() {

    const moviesContainer = document.querySelector('.movies-container');

    moviesContainer.innerHTML = '';

    if (movies.length === 0) {

        moviesContainer.innerHTML = '<p class="empty-message">No movies added yet.</p>';

        return;
    }

    movies.forEach(function(movie, index) {

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

        const deleteButton = document.createElement('button');

        deleteButton.classList.add('delete-btn');

        deleteButton.textContent = 'Delete';

        deleteButton.addEventListener('click', function() {

            movies.splice(index, 1);

            renderMovies();

            updateDashboard();

        });

        movieCard.appendChild(movieTitle);

        movieCard.appendChild(movieGenre);

        movieCard.appendChild(movieRating);

        movieCard.appendChild(movieWatchDate);

        movieCard.appendChild(movieOpinion);

        movieCard.appendChild(deleteButton);

        moviesContainer.appendChild(movieCard);

    });

}

/* DASHBOARD UPDATES */

function updateDashboard() {

    const totalMovies = movies.length;

    if (totalMovies === 0) {

        document.getElementById('total-movies').textContent = '0';

        document.getElementById('average-rating').textContent = '0.0';

        document.getElementById('favorite-genre').textContent = 'No data';

        document.getElementById('last-watched').textContent = 'No movies added';

        return;
    }

    const averageRating = movies.reduce((sum, movie) => sum + movie.rating, 0) / totalMovies;

    document.getElementById('total-movies').textContent = totalMovies;

    document.getElementById('average-rating').textContent = averageRating.toFixed(1);

    const lastWatchedMovie = movies.reduce((latest, movie) => {

        return new Date(movie.watchDate) > new Date(latest.watchDate)

            ? movie

            : latest;

    });

    document.getElementById('last-watched').textContent = lastWatchedMovie.title;

    const genreCounts = movies.reduce((counts, movie) => {

        counts[movie.genre] = (counts[movie.genre] || 0) + 1;

        return counts;

    }, {});

    const favoriteGenre = Object.keys(genreCounts).reduce((a, b) => {

            return genreCounts[a] > genreCounts[b]

                ? a

                : b;

        });

    if (genreCounts[favoriteGenre] < 2) {

    document.getElementById('favorite-genre').textContent = 'Not enough data';

    }    
    
    else {

    document.getElementById('favorite-genre').textContent = favoriteGenre;

    }

}

renderMovies();
updateDashboard();
