import styles from "./textBox.module.scss";

const TextBox = (props) => {
  const { searchRef, value, onChange, placeholder, onFocus, onBlur } = props;
  return (
    <input
      ref={searchRef}
      className={styles.textBoxWrap}
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};

export default TextBox;
