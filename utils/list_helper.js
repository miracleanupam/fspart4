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

// const mostBlogs = (blogs) => {
//     const details = []
//     blogs.forEach(b => {
//         const found = details.find(i => i.author === b.author);
//         if (found ) {

//         }
//     });
//     const detailsSorted = details.sort((a, b) => {
//         a
//     })
// }

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    // mostBlogs
}