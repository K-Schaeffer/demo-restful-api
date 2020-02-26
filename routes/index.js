module.exports = (app) => {

    app.get('/', (req, res) => { // Creating route

        res.statusCode = 200; // 200 = Okay
        res.setHeader('Content-Type', 'text/html');
        res.end("<h1> Hello! </h1>");

    });
}