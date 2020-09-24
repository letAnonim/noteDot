module.exports.setUpRouter = (app)=>{
    require('./users.routes.js')(app);
}