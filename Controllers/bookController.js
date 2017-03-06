var bookController = function (Book) {
    
    var post = function (req, res) {
        var book = new Book(req.body);
        book.save();
        res.status(201).send(book); // 201: created
    };

    var get = function (req, res) {
        // only filter on known properties
        var query = {};
        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        Book.find(query, function (err, books) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(books);
            }
        });
    };

    return {
        post: post,
        get: get
    };
};

module.exports = bookController;