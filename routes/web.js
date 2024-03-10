const authController = require('../app/http/controllers/authController');
const homeControl = require('../app/http/controllers/homeController');

function initRoutes(app){
    app.get('/',homeControl().index)
    app.get('/home', authController().login)
    app.get('/register',authController().register)
    app.post('/register', authController().postRegister)
    app.post('/home',authController().postLogin)
    app.get('/track',homeControl().track)
    app.get('/book',homeControl().book)
}

module.exports = initRoutes