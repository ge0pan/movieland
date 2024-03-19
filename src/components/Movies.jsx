import { useEffect, useRef, useState } from 'react'
import Movie from './Movie'
import '../styles/movies.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNextPage } from '../data/moviesSlice'

const useIntersection = (element, rootMargin) => {
    const [isVisible, setState] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setState(entry.isIntersecting);
            }, { rootMargin }
        );

        element.current && observer.observe(element.current);

        return () => observer.unobserve(element.current);
    }, []);

    return isVisible;
};

const Movies = ({ movies, viewTrailer, closeCard }) => {
    const dispatch = useDispatch();
    const {movies: {fetchStatus}} = useSelector((state) => state)

    const loadMoreRef = useRef();

    const isVisible = useIntersection(loadMoreRef, '0px 0px 0px 0px');

    useEffect(() => {
        if (fetchStatus !== 'success') {
            return
        }
        
        if (isVisible) {
            dispatch(fetchNextPage())
        }
    }, [isVisible])

    return (
        <>
            <div className="movies" data-testid="movies">
                {movies.movies.map((movie) => {
                    return (
                        <Movie 
                            movie={movie} 
                            key={movie.id}
                            viewTrailer={viewTrailer}
                            closeCard={closeCard}
                        />
                    )
                })}
            </div>
            <div ref={loadMoreRef} className="movies-more">Loading more</div>
        </>
    )
}

export default Movies
