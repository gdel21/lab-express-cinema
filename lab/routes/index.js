const express = require('express');
const router  = express.Router();
const Movie = require('../models/Movie');
const Celeb = require('../models/Celeb')

router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/allmovies', (req, res, next) => {
  Movie.find()
  .then((allTheMovies)=>{
    console.log(allTheMovies)
    res.render('all-movies', {theMovies: allTheMovies});
  })
  .catch((err)=>{
    next(err);
  })
});

router.get('/allCelebs', (req, res, next) => {
  Celeb.find()
  .then((allTheCelebs)=>{
    console.log(allTheCelebs)
    res.render('all-celebs', {theCeleb: allTheCelebs});
  })
  .catch((err)=>{
    next(err);
  })
});

router.post('/movies/:id/delete',(req,res,next)=>{
  const theId = req.params.id
  Movie.findByIdAndRemove(theId)
  .then(response=>{
    res.redirect('/allmovies')
  })
  .catch((err)=>{
    next(err)
  })
})

router.post('/celebs/:id/delete',(req,res,next)=>{
  const theId = req.params.id
  Celeb.findByIdAndRemove(theId)
  .then(response=>{
    res.redirect('/allcelebs')
  })
  .catch((err)=>{
    next(err)
  })
})


router.get('/add-new-movie', (req, res, next)=>{
  res.render('new-movie');
})

router.get('/add-new-celeb', (req, res, next)=>{
  res.render('new-celeb');
})


router.post('/create-the-movie', (req, res, next)=>{
  let theTitle = req.body.theNewMovieTitle;
  let auth = req.body.theDirectorForNewMovie;
  let img = req.body.image;
  let info = req.body.info;


  Movie.create({
    name: theTitle,
    director: auth,
    image: img,
    info: info
  })
  .then((response)=>{
    res.redirect('/')
  })
  .catch((err)=>{
    next(err)
  })
})

router.post('/create-the-celeb', (req, res, next)=>{
  let name = req.body.name
  let occupation = req.body.occupation
  let catchphrase = req.body.catchphrase


  Celeb.create({
    name: name,
    occupation: occupation,
    catchphrase: catchphrase
  })
  .then((response)=>{
    res.redirect('/allcelebs')
  })
  .catch((err)=>{
    next(err)
  })
})


router.get('/movies/:theIdOfTheMovie', (req, res, next)=>{
  let id = req.params.theIdOfTheMovie;

  Movie.findById(id)
  .then((theMovie)=>{
    console.log(theMovie)
    res.render('one-movie', {movie: theMovie})
  })
  .catch((err)=>{
    next(err);
  })
})

router.get('/celebs/:theIdOfTheCeleb', (req, res, next)=>{
  let id = req.params.theIdOfTheCeleb;

  Celeb.findById(id)
  .then((theCeleb)=>{
    console.log(theCeleb)
    res.render('one-celeb', {celeb: theCeleb})
  })
  .catch((err)=>{
    next(err);
  })
})

router.get('/celebs/:id/edit',(req,res,next)=>{
  let id = req.params.id;

  Celeb.findById(id)
  .then((theCeleb)=>{
    console.log(theCeleb)
    res.render('edit-celeb', {celeb: theCeleb})
  })
})

router.post('/celebs/:id/postedit', (req,res,next)=>{
  theID = req.params.id

  Celeb.findByIdAndUpdate(theID, req.body)
  .then((asd)=>{
    res.redirect('/celebs/'+ theID)
  })
  .catch((err)=>{
    next(err)
  })
})

router.get('/movies/:id/edit',(req,res,next)=>{
  let id = req.params.id;

  Movie.findById(id)
  .then((theMovie)=>{
    console.log(theMovie)
    res.render('edit-movie', {movie: theMovie})
  })
})

router.post('/movies/:id/postedit', (req,res,next)=>{
  theID = req.params.id

  Movie.findByIdAndUpdate(theID, req.body)
  .then((asd)=>{
    res.redirect('/movies/'+ theID)
  })
  .catch((err)=>{
    next(err)
  })
})

module.exports = router;