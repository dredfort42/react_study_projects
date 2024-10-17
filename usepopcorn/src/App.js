import { useEffect, useState } from 'react';

const tempMovieData = [
    {
        imdbID: 'tt1375666',
        Title: 'Inception',
        Year: '2010',
        Poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    },
    {
        imdbID: 'tt0133093',
        Title: 'The Matrix',
        Year: '1999',
        Poster: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
    },
    {
        imdbID: 'tt6751668',
        Title: 'Parasite',
        Year: '2019',
        Poster: 'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
    },
];

const tempWatchedData = [
    {
        imdbID: 'tt1375666',
        Title: 'Inception',
        Year: '2010',
        Poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
        runtime: 148,
        imdbRating: 8.8,
        userRating: 10,
    },
    {
        imdbID: 'tt0088763',
        Title: 'Back to the Future',
        Year: '1985',
        Poster: 'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
        runtime: 116,
        imdbRating: 8.5,
        userRating: 9,
    },
];

const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = 'b84130da';

export default function App() {
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);

    useEffect(function () {
        fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=sky`)
            .then((res) => res.json())
            .then((data) => setMovies(data.Search));
    }, []);

    return (
        <div>
            <NavBar>
                <Search />
                <SearchResucltsCounter movies={movies} />
            </NavBar>
            <Main>
                <Box>
                    <FoundMovies movies={movies} />
                </Box>
                <Box>
                    <WatchedMovies watched={watched} />
                    <MoviesData watched={watched} />
                </Box>
            </Main>
        </div>
    );
}

function Main({ children }) {
    return <main className="main">{children}</main>;
}

function MoviesData({ watched }) {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <Movie movie={movie} key={movie.imdbID}>
                    <MovieData
                        imdbRating={movie.imdbRating}
                        userRating={movie.userRating}
                        runtime={movie.runtime}
                    />
                </Movie>
            ))}
        </ul>
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

function FoundMovies({ movies }) {
    return (
        <ul className="list">
            {movies?.map((movie) => (
                <Movie movie={movie} key={movie.imdbID}>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                </Movie>
            ))}
        </ul>
    );
}

function Movie({ movie, children }) {
    return (
        <li key={movie.imdbID}>
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

function Search() {
    const [query, setQuery] = useState('');

    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
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
                <span>{imdbRating}</span>
            </p>
            <p>
                <span>🌟</span>
                <span>{userRating}</span>
            </p>
            <p>
                <span>⏳</span>
                <span>{runtime} min</span>
            </p>
        </>
    );
}
