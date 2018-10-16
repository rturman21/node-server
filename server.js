const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const port = process.env.por || 3000;
const router = express.Router();

app.use("/api", router);

const con = mysql.createConnection({ host: "localhost", user: "root", password: "root", database: "Albums", socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock" });

con.connect(function(err) {
    if (err)
        throw (err);
});

router.get('/albums', function(req, res, next) {
    con
        .query("SELECT * FROM albums", function(err, data, fields) {
            if (err)
                throw err;
            return res.send(data);
        });
});

router.get('/albums/:id', function(req, res, next) {
    let albums_id = req.params.id;
    con.query("SELECT * FROM teams WHERE id=?", albums_id, function(err, data, fields) {
        if (err)
            throw err;
        return res.send(data);
    });
});

router.post('/albums/add', function(req, res, next) {
    // let teams_name = req.body.name;
    con
        .query("INSERT INTO albums SET ?", req.body, function(err, data, fields) {
            if (err)
                throw err;
            return res.send(data);
        })
});

router.delete('/albums/:id', function(req, res, next) {
    let teams_id = req.params.id;
    con.query('DELETE FROM albums WHERE id=?', albums_id, function(err, data, fields) {
        if (err)
            throw err;
        return res.send(data);
    });
});

router.put('/albums/:id', function(req, res, next) {
    let albums_id = req.params.id;
    con.query('UPDATE albums SET ? WHERE id=?', [
        req.body, albums_id
    ], function(err, data, fields) {
        if (err)
            throw (err);
        return res.send(data);
    });

});

app.listen(port, function() {
    console.log(`Server running on port ${port}`);
})