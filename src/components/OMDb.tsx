import React, { useState } from 'react';
import {API, SearchType} from "../api/API";

export const OMDb = () => {
    const [searchName, setSearchName] = useState('');
    const [searchCurrentName, setSearchCurrentName] = useState('');
    const [searchResult, setSearchResult] = useState([] as Array<SearchType> | string);
    const [searchNameByType, setSearchNameByType] = useState('');
    const [searchResultByType, setSearchResultByType] = useState([] as Array<SearchType> | string);

    const searchFilm = async () => {
        try {
            const data = await API.searchFilmsByTitle(searchName)
            setSearchResult(data[data.Response === 'True' ? 'Search' : 'Error'])
        } catch (err){
            console.log("error rejected!")
        }
    };

    const searchByType = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.dataset.t &&
        API.searchFilmsByType(searchNameByType, e.currentTarget.dataset.t)
            .then(data => setSearchResultByType(data[data.Response === 'True' ? 'Search' : 'Error']));
    };

    const onChangeSearchName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchName(e.currentTarget.value);
    };
    const onChangeSearchNameByType = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchNameByType(e.currentTarget.value);
    };

    if (searchName.length >= 3 && searchName !== searchCurrentName) {
        setSearchCurrentName(searchName);
        API.searchFilmsByTitle(searchName)
            .then(autoSearch => setSearchResult(autoSearch[autoSearch.Response === 'True' ? 'Search' : 'Error']));
    }

    return (
        <div>
            <h1>Promises</h1>
            <div>
                <h3><p>Search by name:</p></h3>
                <input type="text" value={searchName} onChange={onChangeSearchName} />
                {/*<button onClick={searchFilm}>Search</button>*/}
                <div>
                    {Array.isArray(searchResult) ? searchResult.map(r => <div key={r.imdbID}>
                        <h2>{r.Title}</h2>
                        <span>{`imdbID: ${r.imdbID}. Type: ${r.Type}. Year: ${r.Year}.`}</span>
                        <img src={r.Poster} alt="Poster" />
                    </div>) : searchResult}
                </div>
            </div>

            <div>
                <h3><p>Search by type:</p></h3>
                <input type="text" value={searchNameByType} onChange={onChangeSearchNameByType} />
                <button onClick={searchByType} data-t='movie'>Movie</button>
                <button onClick={searchByType} data-t='series'>Series</button>
                <div>
                    {Array.isArray(searchResultByType) ? searchResultByType.map(r => <div key={r.imdbID}>
                        <h2>{r.Title}</h2>
                        <span>{`imdbID: ${r.imdbID}. Type: ${r.Type}. Year: ${r.Year}.`}</span>
                        <img src={r.Poster} alt="Poster" />
                    </div>) : searchResultByType}
                </div>
            </div>
        </div>
    );
};