import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import { paginate } from '../utils/paginate';
import MoviesTable from './moviesTable';
import _ from 'lodash'


class Movies extends Component {
    state = {
        //genres and movies should be initialized, since it takes time to fetch data from server
        //having it uninitialized can cause run time errors
        genres: [],
        movies: [],
        pageSize: 4,  //# of movies per page
        currentPage: 1,
        sortColumn: { path: 'title', order: 'asc' }
    };

    //need to pass _id as an empty string, since in listGroup, we're mapping genres to jsx,
    //this requires the "key" attribute to be set.  
    //Thus, if we're manually adding a new category, we need to add _id to satisfy this requirement.
    componentDidMount() {
        const genres = [{ _id: "", name: 'All Genres' }, ...getGenres()]
        this.setState({ movies: getMovies(), genres });
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
        this.setState({ selectedGenre: genre })
    }

    handleSort = (path) => {
        const sortColumn = { ...this.state.sortColumn };

        //initially sorts by title name, if the same path is clicked, toggle ascending/descending
        //else sort by ascending
        if (sortColumn.path === path) {
            sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
        }
        else {
            sortColumn.path = path;
            sortColumn.order = "asc";
        }

        this.setState({ sortColumn });

        //this.setState({ sortColumn: { path, order: 'asc' } })
    }

    render() {
        //rename length to count
        const { length: count } = this.state.movies;
        const { pageSize, currentPage, sortColumn, selectedGenre, movies: allMovies } = this.state
        //display only text when empty if this.state.movie.length
        if (count === 0)
            return <p>There are no movies in the database.</p>;


        //if slectedGenre exists, take allmovies and check it against selected Genre
        //Need to check seletedGenre and selectedGenre._id, since selectedGenre will always return true, due to it's truthiness.  
        //If selectedGenre._id is not checked, the .filter function cannot compare id's, thus returning nothing.
        const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const movies = paginate(sorted, currentPage, pageSize);

        return (

            <div className="row">

                <div className="col-3">
                    <ListGroup
                        items={this.state.genres}
                        onItemSelect={this.handleGenreSelect}
                        selectedItem={this.state.selectedGenre}
                    ></ListGroup>
                </div>

                <div className="col">
                    <p>Showing {filtered.length} movies in the database.</p>

                    <MoviesTable
                        movies={movies}
                        onLike={this.handleLike}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}>
                    </MoviesTable>

                    <Pagination
                        itemsCount={filtered.length}
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