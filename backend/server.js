var express = require('express');
var app = new express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var user = require('./schema/user');
var image = require('./schema/image');
var cmt = require('./schema/comment');
var q = require('q');
var cors = require('cors');
var multer = require('multer');
var path = require('path')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        fileName = file.fieldname + Date.now() + path.extname(file.originalname);
        cb(null, fileName)
    }
});

var upload = multer({
    storage: storage
}).single('file');
// app.use('/uploads', express.static('uploads'))


var connection = mongoose.connect('mongodb://127.0.0.1/instagram', { useMongoClient: true });

app.use(bodyParser.json());
app.use(cors());
app.use(function (req, res, next) {
    if (req.path === '/api/user' || req.path === '/api/userIn' || req.path.indexOf('uploads') > -1 || req.path.indexOf('favicon') > -1) {
        next();
    } else {
        console.log('before api')
        user.findById(req.headers.frontend, function (err, data) {
            if (err) {
                return res.json({ error: 1, data: 'error' }, 404);
            }
            if (Object.keys(data).length > 0) {
                next();
            } else {
                res.json({ error: 1, data: 'redirect' }, 404);
            }
        })
    }

});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.get('/api', function (req, res) {
    console.log('its working');
    user.find({}, function (err, data) {
        if (err) return err
        console.log(data);
    })
    res.send('jknjknjkn');
})

app.post('/api/user', function (req, res) {
    console.log('sdfsdfs')
    user.find({ 'email': req.body.email }, function (err, data) {
        if (data.length === 0) {
            var usr = new user(req.body);
            usr.save(function (err, data) {
                if (err) return err
                res.json({ error: 0, data: data });
            })
        } else {
            res.json({ error: 1, data: null });
        }
    }
    )
})
app.post('/api/userIn', function (req, res) {
    
    user.find({ 'email': req.body.email, password: req.body.password }, function (err, data) {
        if (data.length > 0) {
            res.json({ error: 0, data: data[0] })
        } else {
            res.json({ error: 1, data: null });
        }
    }
    )
})

app.post('/api/upload', function (req, res) {
    upload(req, res, function (err) {
        console.log('stoppedsdfsdf');
        if (err) {
            console.log(err);
        }
        console.log('stopped');
        var img = new image();
        // img.user_id = req.body.user_id;
        img.user_id = req.headers.frontend;
        img.name = fileName;
        img.save(function (errr, data) {
            if (errr) return errr
            res.json({ error: 0, data: data });
        })
    })
})

app.post('/api/comment', function (req, res) {
    console.log('sdfsdfs')
    var newcmt = new cmt(req.body);
    newcmt.save(function (err, data) {
        if (err) return err
        res.json({ error: 0, data: data });
    })
})

app.get('/api/getImage', function (req, res) {
    image.find({ user_id: req.headers.frontend }, function (err, data) {
        if (err) throw err;
        res.json({ error: 0, data: data });
    })
})

app.get('/api/getAllImage', function (req, res) {
    function getUser() {
        var defer = q.defer();
        image.find({}).sort("_id").exec(function (err, data) {
            if (err) defer.reject();
            var myData = [];
            var i = 0;
            data.map((item) => {
                var item1 = item.toObject();
                user.findById(item.user_id, function (fail, userData) {
                    if (fail) defer.reject();
                    item1.username = userData.name;
                    getComment(item._id).then((retData) => {
                        i++;
                        item1.comments = retData;
                        myData.push(item1);
                        if (data.length === i) {
                            console.log('check')
                            defer.resolve(myData);
                        }
                    })
                })
            })
        })
        return defer.promise;
    }

    function getComment(id) {
        var defer = q.defer();
        cmt.find({ image_id: id }, function (reject, cmtData) {
            if (reject) defer.reject();
            console.log(cmtData)
            defer.resolve(cmtData);
        })
        return defer.promise;
    }

    getUser().then(function (ddd) {
        console.log('last')
        res.json({ error: 0, data: ddd });
    }, function () {
        console.log('errrr');
    })
})

app.post('/api/comment', function (req, res) {
    var comm = new cmt(req.body);
    comm.save(function (err, data) {
        if (err) throw err;
        res.json({ error: 0, data: data });
    })
})
app.listen(8088, function () {
    console.log('server is running @ 8088');
})
