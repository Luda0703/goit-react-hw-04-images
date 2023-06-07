import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
    SearchbarHeader,
    SearchForm,
    SearchFormButton,
    SearchFormInput
 } from './Searchbar.styled';
import { ImSearch } from 'react-icons/im';


class Searchbar extends Component {
    state = {
        query: '',
    }

    heandelChange = e => {
        this.setState({ query: e.currentTarget.value.toLowerCase().trim()})
    }

    handleSubmit = e => {
        e.preventDefault()
        const {query}  = this.state;
        this.props.onSubmit(query);
        this.setState({ query: ''})
    }
  

    render() {
        const { query } = this.state;
        
        return (
            <SearchbarHeader>
                <SearchForm onSubmit={this.handleSubmit}>
                    <SearchFormButton type="submit">
                        <ImSearch size={20} color="#FF69B4" type='submit'>
                            Search
                        </ImSearch>
                    </SearchFormButton>

                    <SearchFormInput
                        className="input"
                        type="text"
                        name='searchName'
                        onChange={this.heandelChange}
                        value={query}
                        placeholder="Search images and photos"
                    />
                </SearchForm>
            </SearchbarHeader>
        )
    }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default Searchbar;

