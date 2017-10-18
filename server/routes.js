var express = require('express'),
    router = express.Router(),
    Item = require('../model/items');

//now we can set the route path & initialize the API
router.get('/', function (req, res) {
    res.json({message: 'API Initialized!'});
});

router.route('/contacts')
    .get(function (req, res) {
        Item.collection.stats().then((stats) => {
            Item.find()
                .select('first_name last_name company job_title picture')
                .limit(Number(req.query.limit) || null)
                .exec(function (err, items) {
                    if (err) return console.error(err);
                    stats.count > items.length ?
                        res.status(206).json(items) : res.json(items);
                });
        });
    })
    .post(function (req, res) {
        var item = new Item(),
            new_item = Object.assign(item, req.body);

        item.save(function (err) {
            if (err) res.send(err);
            res.json(new_item);
        });
    });

router.route('/contacts/:id')
    .get(function (req, res) {
        Item.collection.stats().then((stats) => {
            Item.findById(req.params.id)
                .limit(Number(req.query.limit) || null)
                .exec(function (err, items) {
                    if (err) return console.error(err);
                    stats.count > items.length ?
                        res.status(206).json(items) : res.json(items);
                });
        });
    })
    .put(function (req, res) {
        delete req.body['_id'];
        Item.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true},
            function (err, doc) {
                if (err) res.send(err);
                res.json(doc);
            }
        );
    })
    .delete(function (req, res) {
        Item.findByIdAndRemove(
            req.params.id,
            function (err) {
                if (err) res.send(err);
                res.json(req.params.id);
            }
        );
    });

module.exports = router;