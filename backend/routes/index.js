module.exports.setUpRouter = (app)=>{
    require('./users.routes.js')(app);
    require('./notes.routes.js')(app);
}