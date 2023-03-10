exports.getHome = (req, res, next) => {
    res.status(404).render('home', { pageTitle: 'Home', path: 'home' });
}
