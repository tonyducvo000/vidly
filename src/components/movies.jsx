import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService'

class Movies extends Component {
    state = {
        movies: getMovies()

    };

    handleDelete = (movie) => {
        //filter - keep any movies (m) that doesn't match the movie_id (the movie selected to delete ) 
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({ movies })
    };

    render() {
        //rename length to count
        const { length: count } = this.state.movies;
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
            </React.Fragment>
        );
    }
}

export default Movies;