
import { useState } from "react";
import SearchBar from "../../block/SearchBar";
import DropDown from "../../components/common/DropDown";
import { getGenres } from "../../helpers/functions";
import { movieList } from "../../helpers/meta";
import styles from "./search.module.scss";

const Search = (prop) => {
    const [selectedGenres, setSelectedGenres] = useState([])
    const [selectedRatings, setSelectedRatings] = useState([])

    const onChangeDropDown = (mode, value) => {
        let arr = (mode === "list") ? [...selectedGenres] : [...selectedRatings];
        if (arr.includes(value)) {
            arr.splice(arr.indexOf(value), 1)
        } else {
            arr.push(value)
        }
        if (mode === "list") {
            setSelectedGenres([...arr])
        } else {
            setSelectedRatings([...arr])
        }
    }

    return (
        <div className={styles.searchPageWrap}>
            <div className={styles.searchBar}>
                <SearchBar selectedGenres={selectedGenres} selectedRatings={selectedRatings} />
            </div>
            <div className={styles.searchFilter}>
                <div>
                    <DropDown buttonName="Rating" items={getGenres(movieList)} mode="rating" onChangeDropDown={onChangeDropDown} selectedItems={selectedRatings} />
                </div>
                <div>
                    <DropDown buttonName="Genres" items={getGenres(movieList)} onChangeDropDown={onChangeDropDown} selectedItems={selectedGenres} />
                </div>
            </div>
        </div>
    )
}

export default Search;