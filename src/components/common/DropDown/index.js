import styles from "./dropDown.module.scss";
import { ReactComponent as Arrow } from "../../../assets/svg/arrow.svg";
import { useRef, useState } from "react";
import StarRating from "../StarRating";
import useOutsideClick from "../../../helpers/useOutSideClick";

const DropDown = (props) => {
  const {
    items,
    mode = "default",
    buttonName,
    onChangeDropDown,
    selectedItems,
  } = props;
  const [show, setShow] = useState(false);
  const updatedItems = ["Any genre", ...items];
  const ref = useRef();
  useOutsideClick(ref, () => {
    setShow(false);
  });

  const RatingItems = () => {
    const ratings = [];
    ratings.push(
      <div className={styles.item} key={0}>
        <input
          className={styles.checkbox}
          type="checkbox"
          id={0}
          name="Any Rating"
          value={0}
          onChange={() => onChangeDropDown("rating", 0)}
          checked={selectedItems.includes(0)}
        />
        <label htmlFor={0}>Any Rating</label>
      </div>
    );
    for (let i = 1; i <= 10; i++) {
      ratings.push(
        <div className={styles.item} key={i}>
          <input
            className={styles.checkbox}
            type="checkbox"
            id={i}
            name={i}
            value={i}
            onChange={() => onChangeDropDown("rating", i)}
            checked={selectedItems.includes(i)}
          />
          <label htmlFor={i}>
            <StarRating rating={i} />
          </label>
        </div>
      );
    }
    return ratings;
  };
  const listItems = (items) => {
    return (
      items &&
      items.map((item, index) => {
        return (
          <div className={styles.item} key={`${item}_${index}`}>
            <input
              className={styles.checkbox}
              type="checkbox"
              id={index}
              name={item}
              value={items}
              onChange={() => onChangeDropDown("list", item)}
              checked={selectedItems.includes(item)}
            />
            <label htmlFor={index}>{item}</label>
          </div>
        );
      })
    );
  };

  return (
    <div className={styles.dropDownWrap} key={buttonName} ref={ref}>
      <div className={styles.buttonWrap}>
        <button key={buttonName} onClick={() => setShow(!show)}>
          {buttonName}
          <span className={show ? styles.dropDownActive : ""}>
            <Arrow />
          </span>
        </button>
      </div>
      {show && (
        <div className={styles.items}>
          {mode === "rating" ? RatingItems() : listItems(updatedItems)}
        </div>
      )}
    </div>
  );
};
export default DropDown;
