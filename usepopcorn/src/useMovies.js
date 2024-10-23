import { useEffect, useState } from 'react';

const KEY = 'b84130da';

export function useMovies(query, callback) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(
        function () {
            callback?.();
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

            // handleCloseDetails();
            fetchMovies();

            return function () {
                controller.abort();
            };
        },
        [query]
    );

    return { movies, isLoading, error };
}
