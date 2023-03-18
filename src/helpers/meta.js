export const movieList = [
  {
    title: "The Matrix",
    rating: 7.5,
    category: "Action",
  },
  {
    title: "Focus",
    rating: 6.9,
    category: "Comedy",
  },
  {
    title: "The Lazarus Effect",
    rating: 6.4,
    category: "Thriller",
  },
  {
    title: "Everly",
    rating: 5.0,
    category: "Action",
  },
  {
    title: "Maps to the Stars",
    rating: 7.5,
    category: "Drama",
  },
];
export const searchOptions = {
  includeScore: true,
  includeMatches: true,
  findAllMatches: true,
  threshold: 0.1,
  keys: [
    "title",
    "category",
    { name: "rating", getFn: (rate) => Math.floor(rate.rating).toString() },
  ],
};
