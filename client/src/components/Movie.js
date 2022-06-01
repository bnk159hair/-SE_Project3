import React from 'react';

const Movie = ({movie}) => {
    return (
        // 각 div에 unique key value 필요한데, title이 모두 unique하기 때문에, 이렇게 사용한다.
        <div className="movie">
            <div className="movie-title">{movie.title}</div>
            <div className="movie-year">{movie.year}</div>
        </div>
    );
}

export default Movie;