const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes;
    };

    return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
}

const favoriteBlog = (blogs) => {
    const blogsSorted = blogs.sort((a, b) => {
        return a.likes - b.likes;
    });

    return blogsSorted[blogsSorted.length - 1];
}

const mostBlogs = (blogs) => {
    let details = [];
    blogs.forEach(b => {
        const foundIndex = details.indexOf(details.find(i => i.author === b.author));
        if (foundIndex >= 0 ) {
            details[foundIndex].numBlogs = details[foundIndex].numBlogs + 1;
        } else {
            details.push({ author: b.author, numBlogs: 1 });
        }
    });
    const detailsSorted = details.sort((a, b) => {
        if (a.numBlogs < b.numBlogs) {
            return 1;
        } else if (a.numBlogs > b.numBlogs) {
            return -1;
        } else {
            return 0;
        }
    });

    return detailsSorted[0];
}

const mostLikes = (blogs) => {
    let details = [];
    blogs.forEach(b => {
        const foundIndex = details.indexOf(details.find(i => i.author === b.author));
        if (foundIndex >= 0 ) {
            details[foundIndex].numLikes = details[foundIndex].numLikes + b.likes;
        } else {
            details.push({ author: b.author, numLikes: b.likes });
        }
    });
    const detailsSorted = details.sort((a, b) => {
        if (a.numBlogs < b.numBlogs) {
            return 1;
        } else if (a.numLikes > b.numLikes) {
            return -1;
        } else {
            return 0;
        }
    });

    return detailsSorted[0];
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}