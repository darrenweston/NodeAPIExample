var bookController = function (Book) {
    
    var post = function (req, res) {
        var book = new Book(req.body);
        if (!req.body.title) {
            res.status(400); // 400: Bad Request
            res.send('Title is required');
        } else {
            book.save();
            res.status(201); // 201: Created
            res.send(book); 
        }
    };

    var get = function (req, res) {
        // only filter on known properties
        var query = {};
        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        Book.find(query, function (err, books) {
            if (err) {
                res.status(500); // 500: Internal Server Error 
                res.send(err);
            } else {
                var returnBooks = [];
                books.forEach(function(element) {
                    var newBook = element.toJSON(); // copies
                    newBook.links = {};
                    newBook.links.self = 'http://' + req.headers.host +
                        '/api/books/' + newBook._id;
                    returnBooks.push(newBook);
                });
                res.json(returnBooks);
            }
        });
    };

    return {
        post: post,
        get: get
    };
};

module.exports = bookController;