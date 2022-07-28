import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllSnacks } from "../../store/snacks";
import './SearchBar.css'
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import {Link} from 'react-router-dom';

const SearchBar = () => {
    const snacks = useSelector(state => Object.values(state.allSnacks));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetAllSnacks());
    }, [dispatch]);

    const [filteredSnacks, setFilteredSnacks] = useState([]);
    const [wordEntry, setWordEntry] = useState("");

    const handleFilter = (e) => {
        const searchWord = e.target.value;
        setWordEntry(searchWord);
        const newFilter = snacks.filter((value) => {
            return value.title.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredSnacks([])
        } else {
            setFilteredSnacks(newFilter)
        }
    }


    const clearInput = () => {
        setFilteredSnacks([])
        setWordEntry("")
    }

    return (
        <div className="search">
            <div className='search-inputs'>
                <input type="text" placeholder="Search for snacks" value={wordEntry} onChange={handleFilter}></input>
                <div className="searchIcon">
                    {wordEntry.length === 0 ? <SearchIcon id="search-icon" /> : <><CloseIcon id="close-button" onClick={clearInput}/> <SearchIcon id="search-icon"/></>}
                </div>
            </div>
            {filteredSnacks.length !== 0 && (
                <div className="snack-result">
                    {filteredSnacks.map((snack) => {
                        return (
                            <Link className="snack-item" to={`/snacks/${snack.id}`} onClick={clearInput}>
                                <p id='snack-title'>{snack.title}</p>
                            </Link>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default SearchBar;
