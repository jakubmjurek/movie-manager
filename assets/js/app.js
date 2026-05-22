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
    console.log(movies);
});
