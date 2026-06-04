/* DATE LIMIT */

const watchDateInput = document.getElementById('watch-date');

const today = new Date();

const maxDate = today.toISOString().split('T')[0];

watchDateInput.max = maxDate;

const minDate = new Date();

minDate.setFullYear(minDate.getFullYear() - 120);

watchDateInput.min = minDate.toISOString().split('T')[0];

/* LOCAL STORAGE */

const loadMoviesFromStorage = function () {
    
    const storedMovies = localStorage.getItem('movies');

    if (storedMovies) {

        const parsedMovies = JSON.parse(storedMovies);

        parsedMovies.forEach(movie => {

            if (!movie.id) { movie.id = Date.now() + Math.random(); }

            movies.push(movie);

        });

    }
    
};

const saveMoviesToStorage = function () { localStorage.setItem('movies', JSON.stringify(movies));};

/* SIDEBAR TOGGLE */

const sidebar = document.querySelector('.sidebar');

const sidebarToggle = document.getElementById('sidebar-toggle');

const savedSidebarState = localStorage.getItem('sidebarCollapsed');

if (savedSidebarState === 'true') {

    sidebar.classList.add('collapsed');

}

sidebarToggle.addEventListener('click', function() {

    sidebar.classList.toggle('collapsed');

    localStorage.setItem(

        'sidebarCollapsed',

        sidebar.classList.contains('collapsed')

    );

});

/* MOVIES STATE */

const movies = [];

let editingMovieId = null;

loadMoviesFromStorage();

document.getElementById('movie-form').addEventListener('submit', function(e) {
    
    e.preventDefault();

    const title = document.getElementById('title').value;

    const genre = document.getElementById('genre').value;

    const rating = parseFloat(document.getElementById('rating').value);

    const watchDate = watchDateInput.value;

    const opinion = document.getElementById('opinion').value;

    if (editingMovieId !== null) {

        const movieIndex = movies.findIndex(movie => movie.id === editingMovieId);

        if (movieIndex !== -1) {

            movies[movieIndex] = {
                ...movies[movieIndex],
                title,
                genre,
                rating,
                watchDate,
                opinion
            };

        }

        editingMovieId = null;

        document.querySelector('#movie-form button').textContent = 'Add Movie';

    }
    
    else {

    const movie = {
        id: Date.now(),
        title,
        genre,
        rating,
        watchDate,
        opinion,
        createdAt: Date.now()
    };

    movies.push(movie);

    }

    saveMoviesToStorage();

    renderMovies();

    updateDashboard();

    renderStatistics();

    document.getElementById('movie-form').reset();
});

/* MOVIE SEARCH */

document.getElementById('search-movies').addEventListener('input', function () {

    if (movies.length === 0) { return; }

    const query = this.value.toLowerCase();

    const movieCards = document.querySelectorAll('.movie-card');

    movieCards.forEach(function (card) {

        const title = card.querySelector('h3').textContent.toLowerCase();

        const genre = card.querySelector('.movie-genre').textContent.toLowerCase();

        if (title.includes(query) || genre.includes(query)) { card.style.display = ''; }
        
        else { card.style.display = 'none'; }
        
    });

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

        movieGenre.classList.add('movie-genre');

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

            saveMoviesToStorage();

            renderMovies();

            updateDashboard();

            renderStatistics();

        });

        const editButton = document.createElement('button');

        editButton.classList.add('edit-btn');

        editButton.textContent = 'Edit';

        editButton.addEventListener('click', function() {

            document.getElementById('title').value = movie.title;

            document.getElementById('genre').value = movie.genre;

            document.getElementById('rating').value = movie.rating;

            document.getElementById('watch-date').value = movie.watchDate;

            document.getElementById('opinion').value = movie.opinion;

            editingMovieId = movie.id;

            document.querySelector('#movie-form button').textContent = 'Save Changes';

            document.getElementById('add-movie').scrollIntoView({ behavior: 'smooth' });

        });

        deleteButton.addEventListener('click', function() {

            const confirmed = confirm( 'Delete this movie?' );

            if (!confirmed) return;

            movies.splice(index, 1);

            saveMoviesToStorage();

            renderMovies();

            updateDashboard();

            renderStatistics();

        });

        const movieActions = document.createElement('div');

        movieActions.classList.add('movie-actions');

        movieCard.appendChild(movieTitle);

        movieCard.appendChild(movieGenre);

        movieCard.appendChild(movieRating);

        movieCard.appendChild(movieWatchDate);

        movieCard.appendChild(movieOpinion);

        movieActions.appendChild(editButton);

        movieActions.appendChild(deleteButton);

        movieCard.appendChild(movieActions);

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

        const movieDate = new Date(movie.watchDate);

        const latestDate = new Date(latest.watchDate);

        if (movieDate > latestDate) { return movie;}

        if (movieDate.getTime() === latestDate.getTime() && movie.createdAt > latest.createdAt) { return movie; }

        return latest;

    }, movies[0]);

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

    const minimumFavoriteGenreCount = 2;
    
    if (genreCounts[favoriteGenre] < minimumFavoriteGenreCount) { document.getElementById('favorite-genre').textContent = 'Not enough data'; }    
    
    else { document.getElementById('favorite-genre').textContent = favoriteGenre; }

}

/* STATISTICS */

function renderStatistics() {

    const section = document.getElementById('statistics');

    const emptyMsg = section.querySelector('.empty-message');

    const statsContainer = section.querySelector('.stats-container') || (() => {
        
        const div = document.createElement('div');
        
        div.className = 'stats-container';
        
        section.appendChild(div);
            
        return div;
        
    })();

    if (movies.length === 0) {

        emptyMsg.style.display = 'block';

        statsContainer.style.display = 'none';

        return;

    }

    emptyMsg.style.display = 'none';

    statsContainer.style.display = 'flex';

    statsContainer.innerHTML = '';

    const sortSection = document.createElement('div');

    sortSection.className = 'stats-section';

    sortSection.innerHTML = '<h3>Sort & Filter Movies</h3>';

    const sortControls = document.createElement('div');

    sortControls.className = 'sort-controls';

    const sorts = [
    
        { text: 'A-Z (Title)', value: 'title-asc' },

        { text: 'Z-A (Title)', value: 'title-desc' },

        { text: 'Highest Rating', value: 'rating-high' },

        { text: 'Lowest Rating', value: 'rating-low' },

        { text: 'Newest Watched', value: 'date-newest' },

        { text: 'Oldest Watched', value: 'date-oldest' }

    ];

    sorts.forEach(sort => {

        const btn = document.createElement('button');

        btn.className = 'sort-btn';

        btn.textContent = sort.text;

        btn.dataset.sort = sort.value;

        btn.addEventListener('click', function() {

            renderSortedMovies(getSortedMovies(sort.value));

            document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));

            this.classList.add('active');

        });

        sortControls.appendChild(btn);

    });

    const sortedList = document.createElement('div');

    sortedList.className = 'sorted-movies-list';
    
    sortSection.appendChild(sortControls);

    sortSection.appendChild(sortedList);

    statsContainer.appendChild(sortSection);

    const timeSection = document.createElement('div');

    timeSection.className = 'stats-section';

    timeSection.innerHTML = '<h3>Movies Watched By Period</h3>';

    const timeGrid = document.createElement('div');

    timeGrid.className = 'time-stats-grid';

    const currentDay = new Date();

    currentDay.setHours(0, 0, 0, 0);

    const moviesToday = movies.filter(movie => {

        const watchDate = new Date(movie.watchDate);

        watchDate.setHours(0, 0, 0, 0);

        return watchDate.getTime() === currentDay.getTime();

    }).length;

    const now = new Date();

    const moviesThisMonth = movies.filter(movie => {

        const watchDate = new Date(movie.watchDate);

        return watchDate.getMonth() === now.getMonth() && watchDate.getFullYear() === now.getFullYear();

    }).length;

    const moviesThisYear = movies.filter(movie => {

        const watchDate = new Date(movie.watchDate);

        return watchDate.getFullYear() === now.getFullYear();

    }).length;

    [
    
        { label: 'Today', value: moviesToday },

        { label: 'This Month', value: moviesThisMonth },

        { label: 'This Year', value: moviesThisYear }

    ].forEach(stat => {

        const card = document.createElement('div');

        card.className = 'time-stat-card';

        card.innerHTML = `<span class="stat-label">${stat.label}</span><span class="stat-value">${stat.value}</span>`;

        timeGrid.appendChild(card);

    });

    timeSection.appendChild(timeGrid);

    statsContainer.appendChild(timeSection);

    const genreSection = document.createElement('div');

    genreSection.className = 'stats-section';

    genreSection.innerHTML = '<h3>Genre Breakdown</h3>';

    const genreStats = document.createElement('div');

    genreStats.className = 'genre-stats';

    const genreCounts = {};

    movies.forEach(movie => { genreCounts[movie.genre] = (genreCounts[movie.genre] || 0) + 1; });

    const mostGenre = Object.keys(genreCounts).length > 0
        
        ? Object.entries(genreCounts).reduce((a, b) => b[1] > a[1] ? b : a)

        : ['No data', 0];

    const genreCard = document.createElement('div');

    genreCard.className = 'most-watched-genre';

    genreCard.innerHTML = `
        <h4>Most Watched Genre</h4>
        <p>${mostGenre[0]}</p>
        <p class="genre-count">${mostGenre[1]} movie${mostGenre[1] !== 1 ? 's' : ''}</p>
    `;

    genreStats.appendChild(genreCard);

    const chartContainer = document.createElement('div');

    chartContainer.className = 'genre-chart-container';

    chartContainer.innerHTML = '<h4>Genre Distribution</h4>';

    const chart = document.createElement('div');

    chart.className = 'genre-chart';

    const sortedGenres = Object.entries(genreCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);

    const maxCount = sortedGenres.length > 0 ? Math.max(...sortedGenres.map(g => g[1])) : 1;

    sortedGenres.forEach(([genre, count]) => {

        const item = document.createElement('div');

        item.className = 'chart-item';

        const percentage = (count / maxCount) * 100;

        item.innerHTML = `
            <div class="chart-label">${genre}</div>
            <div class="chart-bar-container"><div class="chart-bar" style="width: ${percentage}%"></div></div>
            <div class="chart-count">${count}</div>
        `;

        chart.appendChild(item);

    });

    chartContainer.appendChild(chart);

    genreStats.appendChild(chartContainer);

    genreSection.appendChild(genreStats);

    statsContainer.appendChild(genreSection);

    renderSortedMovies(movies.slice().reverse());

    document.querySelector('[data-sort="date-newest"]').classList.add('active');

}

function getSortedMovies(sortType) {

    const sorted = [...movies];

    switch(sortType) {

        case 'title-asc':

            return sorted.sort((a, b) => a.title.localeCompare(b.title));

        case 'title-desc':

            return sorted.sort((a, b) => b.title.localeCompare(a.title));

        case 'rating-high':

            return sorted.sort((a, b) => b.rating - a.rating);

        case 'rating-low':

            return sorted.sort((a, b) => a.rating - b.rating);

        case 'date-newest':

            return sorted.sort((a, b) => {

                const dateCompare = new Date(b.watchDate) - new Date(a.watchDate);

                return dateCompare !== 0 ? dateCompare : b.createdAt - a.createdAt;

            });

        case 'date-oldest':

            return sorted.sort((a, b) => {

                const dateCompare = new Date(a.watchDate) - new Date(b.watchDate);

                return dateCompare !== 0 ? dateCompare : a.createdAt - b.createdAt;

            });

        default:

            return sorted;

    }

}

function renderSortedMovies(sortedMovies) {

    const list = document.querySelector('.sorted-movies-list');
    
    if (!list) return;

    list.innerHTML = '';

    if (sortedMovies.length === 0) {

        const emptyMsg = document.createElement('p');

        emptyMsg.className = 'empty-message';

        emptyMsg.textContent = 'No movies to display.';

        list.appendChild(emptyMsg);

        return;

    }

    sortedMovies.forEach((movie, index) => {

        const item = document.createElement('div');

        item.className = 'sorted-movie-item';

        const rank = document.createElement('span');

        rank.className = 'movie-rank';

        rank.textContent = index + 1;

        const info = document.createElement('div');

        info.className = 'movie-info';

        const title = document.createElement('h4');

        title.textContent = movie.title;

        const details = document.createElement('p');

        const date = new Date(movie.watchDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

        details.innerHTML = `<strong>Genre:</strong> ${movie.genre} | <strong>Rating:</strong> ${movie.rating}/10 | <strong>Watched:</strong> ${date}`;

        info.appendChild(title);

        info.appendChild(details);

        item.appendChild(rank);

        item.appendChild(info);

        list.appendChild(item);

    });

}

renderMovies();
updateDashboard();
renderStatistics();

/* JSON EXPORT */

document.getElementById('export-json').addEventListener('click', function () {

    if (movies.length === 0) {

        alert('No movies to export.');

        return;
    }

    const jsonData = JSON.stringify(
        movies,
        null,
        2
    );

    const blob = new Blob(
        [jsonData],
        { type: 'application/json' }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');

    link.href = url;

    link.download = 'watchlog-backup.json';

    link.click();

    URL.revokeObjectURL(url);

});

/* JSON IMPORT */

document.getElementById('import-button').addEventListener('click', function () {

    document.getElementById('import-json').click();

});

document.getElementById('import-json').addEventListener('change', function (event) {

    const file = event.target.files[0];

    if (!file) { return; }

    const reader = new FileReader();

    reader.onload = function (e) {

        try {

            const importedMovies = JSON.parse(
                 e.target.result
            );

            if (!Array.isArray(importedMovies)) { throw new Error(); }

            const confirmImport = confirm( 'Importing will replace your current collection. Continue?' );

            if (!confirmImport) { return; }

            movies.length = 0;

            importedMovies.forEach(movie => {

                if (!movie.id) {

                    movie.id =
                        Date.now() + Math.random();

                }

                movies.push(movie);

            });

            saveMoviesToStorage();

            renderMovies();

            updateDashboard();

            renderStatistics();

            alert('Movies imported successfully.');
            
            event.target.value = '';

        }

        catch {

            alert( 'Invalid JSON file.' );

        }

    };

    reader.readAsText(file);

});

/* FOOTER YEAR */

document.getElementById('copyright').innerHTML = `<p>${new Date().getFullYear()} &copy; Jakub Jurek. All rights reserved.</p>`;
