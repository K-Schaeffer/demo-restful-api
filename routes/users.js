let NeDB = require('nedb');
let db = new NeDB({ // Configurating DB
    filename: 'users.db',
    autoload: true
});

module.exports = (app) => {

    let route = app.route('/users');

    route.get((req, res) => { // Getting all

        db.find({}).sort({ name: 1 }).exec((err, users) => { // db.find (I don't want to find nothing specific) and sort to organize

            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status = 200;
                res.json({
                    users:
                        users // Same as users: users
                });
            }
        });
    });

    route.post((req, res) => {  // Creating data

        if (!app.utils.validator.user(app, req, res)) return false; // Checking if it returned false

        // Method to insert
        db.insert(req.body, (err, user) => {

            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(user);
            }

        });

    });

    let routeId = app.route('/users/:id');

    routeId.get((req, res) => { // Taking only one register (specific)

        db.findOne({ _id: req.params.id }).exec((err, user) => {
            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(user);
            }
        });

    })

    routeId.put((req, res) => { // To edit data

        if (!app.utils.validator.user(app, req, res)) return false;

        db.update({ _id: req.params.id }, req.body, err => {
            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(Object.assign(req.params, req.body)); //Assign params (id) and body (all the rest) 
            }

        });
    });

    routeId.delete((req, res) => { // To delete data

        db.remove({ _id: req.params.id }, {}, err => {
            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(req.params);
            }

        });
    });


};