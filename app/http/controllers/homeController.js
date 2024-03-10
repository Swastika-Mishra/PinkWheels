const Passenger = require('../../models/passengers')
function homeController(){
    return{
        index(req, res){
            Passenger.find().then(function(passengers){
                
            })
            res.render('dashboard')
        },
        track(req,res){
            res.render('track')
        },
        book(req,res){
            res.render('book')
        }
    }
}

module.exports = homeController