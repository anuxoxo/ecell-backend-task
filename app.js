require('dotenv').config()
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/courseDB', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Successfully connected to database');
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const app = express();

var PORT = process.env.PORT;
if (PORT == "" || PORT == null) {
    PORT = 5000;
}

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connection.on('connected', () => {
//     console.log("Connected to Mongo");
// });
// mongoose.connection.on('error', (err) => {
//     console.log("error to MongoDB", err);
// });

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use("/public", express.static('public'));

const courseSchema = new mongoose.Schema({
    id: { type: Number, unique: true, required: true, dropDups: true },
    name: String,
    hours: Number
});

const Course = mongoose.model('Course', courseSchema);

app.route('/')
    .get((req, res) => {
        Course.find((err, courses) => {
            if (err) return console.error(err);
            res.render('index', { courses: courses });
        });
    })
    .post((req, res) => {
        const { id, name, hours } = req.body;
        if (name && id && hours) {

            const newCourse = new Course({
                id: id,
                name: name,
                hours: hours
            });

            newCourse.save((err) => {
                if (err)
                    res.send(err.message);
                else
                    res.redirect('/');
            });
        }
        else {
            res.send("Please enter a valid course.");
        }
    })
    .delete((req, res) => {
        Course.deleteMany((err) => {
            if (err) res.send(err.message);
            else res.send("Successfully deleted the Course List!");
        });
    });

app.route('/:id')
    .get((req, res) => {
        Course.findOne({ id: req.params.id }, (err, course) => {
            if (course) res.send(course);
            else res.send("Course not found!");
        });
    })
    .patch((req, res) => {
        Course.update({ id: req.params.id },
            { $set: req.body },
            (err) => {
                if (err)
                    res.send(err.message);
                else
                    res.send("Successfully updated!");

            });
    })
    .delete((req, res) => {
        Course.deleteOne({ id: req.params.id },
            (err) => {
                if (err)
                    res.send(err.message);
                else
                    res.send("Successfully deleted!");
            });
    });


app.listen(PORT, () => console.log(`Server running at port ${PORT}: http://localhost:${PORT}/`))