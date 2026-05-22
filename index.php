<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">

    <meta name="author" content="Jakub Jurek">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta name="description" content="Movie tracking web application built with PHP, 
    MySQL, JavaScript, HTML, and CSS.">

    <meta property="og:description" content="Track watched movies, manage ratings and reviews, 
    and organize your personal movie collection.">

    <meta property="og:url" content="https://movie-manager-jj.infinityfreeapp.com/">

    <meta property="og:title" content="WatchLog - Movie Tracking Web App">

    <title>WatchLog | Movie Tracking Web App</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">

    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

    <link rel="canonical" href="https://movie-manager-jj.infinityfreeapp.com/">

    <link rel="stylesheet" href="assets/css/styles.css">

    <link rel="icon" href="assets/images/favicon.ico?v=2" type="image/x-icon">

    <script src="assets/js/app.js?v=1" defer></script>

</head>
<body>

    <header>
        <h1>WatchLog</h1>
    </header>

    <div class="container">

        <aside>

            <nav>

                <ul>

                    <li><a href="#dashboard">Dashboard</a></li>

                    <li><a href="#add-movie">Add Movie</a></li>

                    <li><a href="#collection">Movie Collection</a></li>

                    <li><a href="#statistics">Statistics</a></li>
                </ul>

            </nav>

        </aside>

        <main>

            <section id="dashboard">

                <h2>Dashboard</h2>

                <p>Welcome to WatchLog! This is your dashboard, where you can track 
                the movies you've watched, manage your ratings and organize your 
                personal movie collection. Use the navigation menu to explore 
                different features of the application.</p>

                <div class="dashboard-info">

                <div class="info-row">

                    <span>Total Movies</span>
                    
                    <span>0</span>
                
                </div>

                <div class="info-row">

                    <span>Average Rating</span>
            
                    <span>No data</span>
        
                </div>

                <div class="info-row">

                    <span>Favorite Genre</span>

                    <span>No data</span>

                </div>

                <div class="info-row">

                    <span>Last Watched</span>

                    <span>No movies added</span>

                </div>

            </section>

            <section id="add-movie">

                <h2>Add Movie</h2>

                <form id="movie-form">

                    <label for="title">Movie Title</label>

                    <input type="text" id="title" name="title" placeholder="Enter movie title" required>

                    <label for="genre">Genre</label>

                    <select id="genre" name="genre">

                        <option value="">Select genre</option>

                        <option value="Action">Action</option>

                        <option value="Adventure">Adventure</option>

                        <option value="Comedy">Comedy</option>

                        <option value="Drama">Drama</option>
                        
                        <option value="Fantasy">Fantasy</option>
                        
                        <option value="Horror">Horror</option>                        

                        <option value="Sci-Fi">Science Fiction (Sci-Fi)</option>

                        <option value="Romance">Romance</option>

                        <option value="Thriller">Thriller</option>

                        <option value="Documentary">Documentary</option>

                        <option value="Other">Other</option>

                    </select>

                    <label for="rating">Rating</label>

                    <input type="number" id="rating" name="rating" min="0" max="10" step="0.1" placeholder="0-10">

                    <label for="watch-date">Date Watched</label>

                    <input type="date" id="watch-date" name="watch-date">

                    <label for="opinion">Your Opinion</label>

                    <textarea id="opinion" name="opinion" placeholder="Write your opinion about the movie..."></textarea>

                    <button type="submit">Add Movie</button>

                </form>

            </section>

            <section id="collection">

                <h2>Movie Collection</h2>

                <input type="search" id="search-movies" placeholder="Search movies...">

                <div class="movies-container">

                    <p class="empty-message">No movies added yet.</p>

                </div>

            </section>

            <section id="statistics">

                <h2>Statistics</h2>

                <p class="empty-message">Statistics will appear after adding movies.</p>

            </section>

        </main>

    </div>

    <footer><p>&copy; 2026 Jakub Jurek. All rights reserved.</p></footer>

</body>
</html>