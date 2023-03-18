import { useEffect, useRef, useState } from "react";
import TextBox from "../../components/common/TextBox/index";
import Fuse from "fuse.js";
import { movieList, searchOptions } from "../../helpers/meta";
import styles from "./searchBar.module.scss";
import StarRating from "../../components/common/StarRating/index";
import { boldMatching } from "../../helpers/functions";

const SearchBar = (props) => {
  const { selectedGenres, selectedRatings } = props;
  const searchRef = useRef();
  const [searchText, setSearchText] = useState("");
  const [showItem, setShowItem] = useState(false);
  const [itemToShow, setItemToShow] = useState([]);
  const fuse = new Fuse(movieList, searchOptions);

  useEffect(() => {
    onSearchValue();
  }, [selectedGenres, selectedRatings]);

  // eslint-disable-next-line
  const onTextChange = (event) => {
    let value = event.target.value;
    setSearchText(value);
    onSearchValue(value);
  };
  const onSearchValue = (value) => {
    let searchValue = typeof value !== "undefined" ? value : searchText;
    let searchItem = [{ title: searchValue }];
    if (
      selectedGenres &&
      selectedGenres.length > 0 &&
      !selectedGenres.includes("Any genre")
    ) {
      let genArr = selectedGenres.map((a) => ({ category: a }));
      searchItem = [...searchItem, { $or: [...genArr] }];
    }
    if (selectedRatings && selectedRatings.length > 0) {
      let ratingArr = selectedRatings.map((a) => ({ rating: a.toString() }));
      searchItem = [...searchItem, { $or: [...ratingArr] }];
    }

    setItemToShow(
      searchValue
        ? fuse.search({
            $and: [...searchItem],
          })
        : movieList
    );
  };

  const onTextFocus = () => {
    setShowItem(true);
    onSearchValue(searchText);
  };

  return (
    <>
      <div className={styles.searchWrapper}>
        <TextBox
          searchRef={searchRef}
          value={searchText}
          onFocus={() => onTextFocus()}
          onBlur={() => setShowItem(false)}
          onChange={onTextChange}
          placeholder="Enter movie name"
        />
      </div>
      {(searchText || showItem) && (
        <div className={styles.cardWrapper}>
          {itemToShow.length > 0 ? (
            itemToShow.map((item, index) => {
              let itemVal, foundKeys;

              itemVal = (item.item && item.item.title) || item.title;
              foundKeys =
                (item &&
                  item.matches &&
                  item.matches.reduce((prev, curr) => {
                    prev[curr.key] = curr;
                    return prev;
                  }, {})) ||
                [];

              return (
                <div key={index} className={styles.cardBody}>
                  <div className={styles.contentWrap}>
                    <p className={styles.title}>
                      {
                        <span
                          className={styles.text}
                          title={`${itemVal}`}
                          dangerouslySetInnerHTML={{
                            __html: foundKeys.title
                              ? boldMatching(
                                  itemVal,
                                  foundKeys.title.indices,
                                  searchText
                                )
                              : itemVal,
                          }}
                        />
                      }
                    </p>
                    <p className={styles.category}>
                      {(item.item && item.item.category) || item.category}
                    </p>
                  </div>
                  <div className={styles.ratingWrap}>
                    <StarRating
                      rating={(item.item && item.item.rating) || item.rating}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className={styles.cardBody}> No movies found</div>
          )}
        </div>
      )}
    </>
  );
};

export default SearchBar;
