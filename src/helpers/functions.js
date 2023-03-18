export const getGenres = (movieList) => {
  return [...new Set(movieList.map((item) => item.category))];
};

export const boldMatching = (value, indices, searchValue = "") => {
  if (!indices) {
    return value;
  }
  let boldContent = "";
  const startIndex = [];
  const endIndex = [];
  const regEx = new RegExp(searchValue, "gi");
  indices.forEach((ind) => {
    if (searchValue !== "") {
      if (value.substring(ind[0], ind[1] + 1).match(regEx)) {
        startIndex.push(ind[0]);
        endIndex.push(ind[1]);
      }
    } else {
      startIndex.push(ind[0]);
      endIndex.push(ind[1]);
    }
  });
  value.split("").forEach((char, i) => {
    if (startIndex.includes(i)) {
      boldContent += "<span>";
    }
    boldContent += char;
    if (endIndex.includes(i)) {
      boldContent += "</span>";
    }
  });
  return boldContent;
};
