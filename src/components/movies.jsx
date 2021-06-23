import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Like from './common/like';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import { paginate } from '../utils/paginate';


class Movies extends Component {
    state = {
        //genres and movies should be initialized, since it takes time to fetch data from server
        //having it uninitialized can cause run time errors
        genres: [],
        movies: [],
        pageSize: 4,  //# of movies per page
        currentPage: 1,

    };

    componentDidMount() {

        this.setState({ movies: getMovies(), genres: getGenres() });

    }

    handleDelete = (movie) => {
        //filter - keep any movies (m) that doesn't match the movie_id (the movie selected to delete ) 
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({ movies });
    };

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie)
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });

    };

    handlePageChange = (page) => {

        this.setState({ currentPage: page });
    }

    handleGenreSelect = (genre) => {
        console.log(genre);

    }

    render() {
        //rename length to count
        const { length: count } = this.state.movies;
        const { pageSize, currentPage, movies: allMovies } = this.state
        //display only text when empty if this.state.movie.length
        if (count === 0)
            return <p>There are no movies in the database.</p>;

        const movies = paginate(allMovies, currentPage, pageSize);

        return (

            <div className="row">

                <div className="col-3">
                    <ListGroup
                        items={this.state.genres}
                        textProperty="name"
                        valueProperty="_id"
                        onItemSelect={this.handleGenreSelect}
                    ></ListGroup>
                </div>

                <div className="col">
                    <p>Showing {count} movies in the database.</p>
                    <table className="table">

                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Genre</th>
                                <th>Stock</th>
                                <th>Rate</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>

                            {movies.map(movie => (
                                <tr key={movie._id}>
                                    <td>{movie.title}</td>
                                    <td>{movie.genre.name}</td>
                                    <td>{movie.numberInStock}</td>
                                    <td>{movie.dailyRentalRate}</td>
                                    <td>
                                        <Like liked={movie.liked} onClick={() => this.handleLike(movie)}>
                                        </Like>
                                    </td>

                                    <td>
                                        <button className="btn btn-danger btn-sm"
                                            onClick={() => this.handleDelete(movie)}>Delete</button>
                                    </td>
                                </tr>
                            ))}

                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>

                        </tbody>

                    </table>

                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        onPageChange={this.handlePageChange}
                        currentPage={currentPage}>
                    </Pagination>

                </div>



            </div>
        );
    }
}

export default Movies;