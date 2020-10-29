const listHelper = require('../utils/list_helper');

test('dummy return one', () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);

    expect(result).toBe(1);
})

describe("total likes", () => {
    test("of empty list is zero", () => {
        expect(listHelper.totalLikes([])).toBe(0);
    });

    test("when list has only one blog equals the like of that", () => {
        const likes = listHelper.totalLikes([{
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.amazon.com',
            likes: 5,
            __v: 0
        }]);

        expect(likes).toBe(5);
    });

    test('of bigger list is calculated right', () => {
        const likes = listHelper.totalLikes([
            {
                _id: '5a422aa71b54a676234d17f9',
                title: 'Harry Potter: Philosopher\'s Stone',
                author: 'JK Rowling',
                url: 'http://www.amazon.com',
                likes: 105,
                __v: 0
            },
            {
                _id: '5a422aa71b54a676234d1000',
                title: 'Harry Potter: Chamber of Secrets',
                author: 'JK Rowling',
                url: 'http://www.amazon.com',
                likes: 205,
                __v: 0
            },
            {
                _id: '5a422aa71b54a676234d1001',
                title: 'Harry Potter: Prisioner of Azkaban',
                author: 'JK Rowling',
                url: 'http://www.amazon.com',
                likes: 305,
                __v: 0
            },
            {
                _id: '5a422aa71b54a676234d1002',
                title: 'Harry Potter: Goblet of Fire',
                author: 'JK Rowling',
                url: 'http://www.amazon.com',
                likes: 405,
                __v: 0
            }
        ]);
        const expectedValue = 105+205+305+405;
        expect(likes).toBe(expectedValue);
    });
});

describe("favorite blog", () => {    
    test('from many blogs is calculated right', () => {
        const favorite = listHelper.favoriteBlog([
            {
                _id: '5a422aa71b54a676234d17f9',
                title: 'Harry Potter: Philosopher\'s Stone',
                author: 'JK Rowling',
                url: 'http://www.amazon.com',
                likes: 105,
                __v: 0
            },
            {
                _id: '5a422aa71b54a676234d1000',
                title: 'Harry Potter: Chamber of Secrets',
                author: 'JK Rowling',
                url: 'http://www.amazon.com',
                likes: 205,
                __v: 0
            },
            {
                _id: '5a422aa71b54a676234d1001',
                title: 'Harry Potter: Prisioner of Azkaban',
                author: 'JK Rowling',
                url: 'http://www.amazon.com',
                likes: 305,
                __v: 0
            },
            {
                _id: '5a422aa71b54a676234d1002',
                title: 'Harry Potter: Goblet of Fire',
                author: 'JK Rowling',
                url: 'http://www.amazon.com',
                likes: 405,
                __v: 0
            }
        ]);
        const expectedValue = {
            _id: '5a422aa71b54a676234d1002',
            title: 'Harry Potter: Goblet of Fire',
            author: 'JK Rowling',
            url: 'http://www.amazon.com',
            likes: 405,
            __v: 0
        };
        expect(favorite).toEqual(expectedValue);
    });
});

// describe("most blog", () => {    
//     test('from many writer is calculated right', () => {
//         const favorite = listHelper.favoriteBlog([
//             {
//                 _id: '5a422aa71b54a676234d17f9',
//                 title: 'Harry Potter: Philosopher\'s Stone',
//                 author: 'JK Rowling',
//                 url: 'http://www.amazon.com',
//                 likes: 105,
//                 __v: 0
//             },
//             {
//                 _id: '5a422aa71b54a676234d1000',
//                 title: 'Sherlock Holmes: Hound of Baskervilles',
//                 author: 'Sir Arthur Conan Doyle',
//                 url: 'http://www.amazon.com',
//                 likes: 205,
//                 __v: 0
//             },
//             {
//                 _id: '5a422aa71b54a676234d1001',
//                 title: 'Harry Potter: Prisioner of Azkaban',
//                 author: 'JK Rowling',
//                 url: 'http://www.amazon.com',
//                 likes: 305,
//                 __v: 0
//             },
//             {
//                 _id: '5a422aa71b54a676234d1002',
//                 title: 'Sherlock Homes: The Three Pips',
//                 author: 'Sir Arthur Conan Doyle',
//                 url: 'http://www.amazon.com',
//                 likes: 405,
//                 __v: 0
//             },
//             {
//                 _id: '5a422aa71b54a676234d1003',
//                 title: 'Sherlock Homes: New Chapter',
//                 author: 'Sir Arthur Conan Doyle',
//                 url: 'http://www.amazon.com',
//                 likes: 405,
//                 __v: 0
//             }
//         ]);
//         const expectedValue = {
//             author: 'Sir Arthur Conan Doyle',
//             blogs: 3
//         };
//         expect(favorite).toEqual(expectedValue);
//     });
// });