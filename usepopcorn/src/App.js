import { useEffect, useRef, useState } from 'react';
import Rating from './Rating';

const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = 'b84130da';

export default function App() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [query, setQuery] = useState('');
    const [selectedID, setSelectedId] = useState(null);
    // const [watched, setWatched] = useState([]);
    const [watched, setWatched] = useState(() =>
        JSON.parse(localStorage.getItem('watched'))
    );

    function handleSelectedId(newId) {
        setSelectedId((id) => (newId === id ? null : newId));
    }

    function handleCloseDetails() {
        setSelectedId(null);
    }

    function handleAddWatchedMovie(movie) {
        setWatched((watched) => [...watched, movie]);
    }

    function handleRemoveMovieFromWatched(id) {
        setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
    }

    useEffect(
        function () {
            localStorage.setItem('watched', JSON.stringify(watched));
        },
        [watched]
    );

    useEffect(
        function () {
            const controller = new AbortController();

            async function fetchMovies() {
                try {
                    setError('');
                    setIsLoading(true);
                    const res = await fetch(
                        `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
                        { signal: controller.signal }
                    );

                    if (!res.ok) {
                        throw new Error(
                            'Somethimg went wrong with fetching mocies'
                        );
                    }

                    const data = await res.json();
                    if (data.Response === 'False') {
                        throw new Error('Movie not found');
                    }

                    setMovies(data.Search);
                    setError('');
                } catch (err) {
                    if (err.Name !== 'AbortError') {
                        setError(err.message);
                    }
                } finally {
                    setIsLoading(false);
                }
            }

            if (query.length < 3) {
                setMovies([]);
                setError('');
                return;
            }

            handleCloseDetails();
            fetchMovies();

            return function () {
                controller.abort();
            };
        },
        [query]
    );

    return (
        <div>
            <NavBar>
                <Search query={query} setQuery={setQuery} />
                <SearchResucltsCounter movies={movies} />
            </NavBar>
            <Main>
                <Box>
                    {isLoading && <Loader />}
                    {!isLoading && !error && (
                        <FoundMovies
                            movies={movies}
                            onSelectMovie={handleSelectedId}
                        />
                    )}
                    {error && <ErrorMessage message={error} />}
                </Box>
                <Box>
                    {selectedID ? (
                        <MovieDetails
                            selectedID={selectedID}
                            watched={watched}
                            onCloseMovie={handleCloseDetails}
                            onAddWatchedMovies={handleAddWatchedMovie}
                            key={selectedID}
                        />
                    ) : (
                        <>
                            <WatchedMovies watched={watched} />
                            <MoviesData
                                watched={watched}
                                onRemoveMovie={handleRemoveMovieFromWatched}
                            />
                        </>
                    )}
                </Box>
            </Main>
        </div>
    );
}

function Loader() {
    return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
    return (
        <p className="error">
            <span>🤬</span> {message}
        </p>
    );
}

function Main({ children }) {
    return <main className="main">{children}</main>;
}

function MoviesData({ watched, onRemoveMovie }) {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <Movie
                    movie={movie}
                    key={movie.imdbID}
                    onSelectMovie={onRemoveMovie}
                >
                    <MovieData
                        imdbRating={movie.imdbRating}
                        userRating={movie.userRating}
                        runtime={movie.runtime}
                    />
                    <button
                        className="btn-delete"
                        onClick={() => onRemoveMovie(movie.imdbID)}
                    >
                        X
                    </button>
                </Movie>
            ))}
        </ul>
    );
}

function MovieDetails({
    selectedID,
    watched,
    onCloseMovie,
    onAddWatchedMovies,
}) {
    const [details, setDetails] = useState({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [rating, setRating] = useState(0);

    // const isRated = watched
    //     .filter((movie) => movie.imdbID === selectedID)
    //     .at(0)?.userRating;

    const isRated = watched.find(
        (movie) => movie.imdbID === selectedID
    )?.userRating;

    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = details;

    function handleAdd() {
        onAddWatchedMovies({
            imdbID: selectedID,
            Title: title,
            Year: year,
            Poster: poster,
            runtime: Number(runtime.split(' ').at(0)),
            imdbRating: Number(imdbRating),
            userRating: rating,
        });
        onCloseMovie();
    }

    useEffect(
        function () {
            function callback(e) {
                if (e.code === 'Escape') {
                    onCloseMovie();
                }
            }

            document.addEventListener('keydown', callback);

            return function () {
                document.removeEventListener('keydown', callback);
            };
        },
        [onCloseMovie]
    );

    useEffect(
        function () {
            document.title = `Movie | ${!title ? 'Loading...' : title}`;

            return function () {
                document.title = 'usePopcorn';
            };
        },
        [title]
    );

    useEffect(
        function () {
            async function getMovieDetails() {
                try {
                    setError('');
                    setIsLoading(true);
                    const res = await fetch(
                        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedID}`
                    );
                    const data = await res.json();
                    setDetails(data);
                    setError('');
                } catch (err) {
                    if (err.Name !== 'AbortError') {
                        setError(err);
                    }
                } finally {
                    setIsLoading(false);
                }
            }

            getMovieDetails();
        },
        [selectedID]
    );

    return (
        <div className="details">
            {isLoading && <Loader />}
            {!isLoading && !error && (
                <>
                    <header>
                        <button className="btn-back" onClick={onCloseMovie}>
                            &larr;
                        </button>
                        <img src={poster} alt={`Poster of ${title} movie`} />
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>
                                {released} &bull; {runtime}
                            </p>
                            <p>{genre}</p>
                            <p>
                                <span>⭐️</span>
                                {imdbRating} IMDB rating
                            </p>
                        </div>
                    </header>

                    <section>
                        <div className="rating">
                            {!isRated ? (
                                <>
                                    <Rating
                                        maxRating={10}
                                        defaultRating={rating}
                                        size={24}
                                        onSetRating={setRating}
                                    />
                                    {rating > 0 && (
                                        <button
                                            className="btn-add"
                                            onClick={handleAdd}
                                        >
                                            Add to watched list
                                        </button>
                                    )}
                                </>
                            ) : (
                                <p>
                                    You rated this movie {isRated}{' '}
                                    <span>⭐️</span>
                                </p>
                            )}
                        </div>
                        <p>
                            <em>{plot}</em>
                        </p>
                        <p>Starring {actors}</p>
                        <p>Directored by {director}</p>
                    </section>
                </>
            )}
            {error && <ErrorMessage message={error} />}
        </div>
    );
}

function WatchedMovies({ watched }) {
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const avgRuntime = average(watched.map((movie) => movie.runtime));

    return (
        <div className="summary">
            <h2>Movies you watched</h2>
            <div>
                <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                </p>
                <MovieData
                    imdbRating={avgImdbRating}
                    userRating={avgUserRating}
                    runtime={avgRuntime}
                />
            </div>
        </div>
    );
}

function FoundMovies({ movies, onSelectMovie, onCloseMovie }) {
    return (
        <ul className="list list-movies">
            {movies?.map((movie) => (
                <Movie
                    movie={movie}
                    key={movie.imdbID}
                    onSelectMovie={onSelectMovie}
                >
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                </Movie>
            ))}
        </ul>
    );
}

function Movie({ movie, children, onSelectMovie }) {
    return (
        <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>{children}</div>
        </li>
    );
}

function NavBar({ children }) {
    return (
        <nav className="nav-bar">
            <Logo />
            {children}
        </nav>
    );
}

function Logo() {
    return (
        <div className="logo">
            <span role="img">🍿</span>
            <h1>usePopcorn</h1>
        </div>
    );
}

function Search({ query, setQuery }) {
    const inputEl = useRef(null);

    useEffect(
        function () {
            function callback(e) {
                if (document.activeElement === inputEl.current) {
                    return;
                }

                if (e.code === 'Enter') {
                    inputEl.current.focus();
                    setQuery('');
                }
            }

            document.addEventListener('keydown', callback);

            return () => document.removeEventListener('keydown', callback);
        },
        [setQuery]
    );

    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={inputEl}
        />
    );
}

function SearchResucltsCounter({ movies }) {
    return (
        <p className="num-results">
            Found <strong>{movies.length} </strong> results
        </p>
    );
}

function Box({ children }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsOpen((open) => !open)}
            >
                {isOpen ? '–' : '+'}
            </button>
            {isOpen && <>{children}</>}
        </div>
    );
}

function MovieData({ imdbRating, userRating, runtime }) {
    return (
        <>
            <p>
                <span>⭐️</span>
                <span>{imdbRating.toFixed(1)}</span>
            </p>
            <p>
                <span>🌟</span>
                <span>{userRating.toFixed(1)}</span>
            </p>
            <p>
                <span>⏳</span>
                <span>{runtime.toFixed(0)} min</span>
            </p>
        </>
    );
}
