import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/like';
import Pagination from './common/pagination';

class Movies extends Component {
    state = {
        movies: getMovies(),
        pageSize: 4,  //# of movies per page
        currentPage: 1
    };

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

    render() {
        //rename length to count
        const { length: count } = this.state.movies;
        const { pageSize, currentPage } = this.state
        //display only text when empty if this.state.movie.length
        if (count === 0)
            return <p>There are no movies in the database.</p>;


        return (

            <React.Fragment>
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

                        {this.state.movies.map(movie => (
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

            </React.Fragment>
        );
    }
}

export default Movies;