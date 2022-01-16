module.exports = (app) => {
    /* Catch 404 and forward to error handling middleware
    path defaults to “/”, will be executed for every request to the app unless handled by existing routes */
    app.use((req, res, next) => {
        res.status(404)
        res.render('error/404', {
            layout: 'main_no_head'
        })
    });
  
    /* error handling middleware */
    app.use((err, req, res, next) => {
      res.status(500)
      res.render('error/500', {
        layout: 'main_no_head'
    })
    });
  };