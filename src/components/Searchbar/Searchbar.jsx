import { useState } from 'react';
import PropTypes from 'prop-types';
import { 
    SearchbarHeader,
    SearchForm,
    SearchFormButton,
    SearchFormInput
 } from './Searchbar.styled';
import { ImSearch } from 'react-icons/im';

export default function Searchbar({onSubmit}) {
    const [query, setQuery] = useState('');

    const heandelChange = e => {
        setQuery(e.currentTarget.value.toLowerCase().trim())
    }

    const handleSubmit = e => {
        e.preventDefault()
        onSubmit(query);
        setQuery('')
    }

    return (
        <SearchbarHeader>
            <SearchForm onSubmit={handleSubmit}>
                <SearchFormButton type="submit">
                    <ImSearch size={20} color="#FF69B4" type='submit'>
                        Search
                    </ImSearch>
                </SearchFormButton>

                <SearchFormInput
                    className="input"
                    type="text"
                    name='searchName'
                    onChange={heandelChange}
                    value={query}
                    placeholder="Search images and photos"
                />
            </SearchForm>
        </SearchbarHeader>
    )
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}



