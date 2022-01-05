const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let likeCount = 0;
  if (blogs.length === 0) {
    return 0;
  }
  for (let i = 0; i < blogs.length; i++) {
    likeCount += blogs[i].likes;
  }

  return likeCount;
};

module.exports = { dummy, totalLikes };
