const mongoose = require('mongoose')
const Schema = mongoose.Schema

const passenger_schema = new Schema({
    name : {type: String, required:true},
    phone : {type: Number, required:true, unique: true},
    email : {type: String, required:true, unique: true},
    password : {type: String, required:true},
}, {timestamps: true})

//const passenger = mongoose.model('Passenger', passenger_schema)

module.exports = mongoose.model('Passenger', passenger_schema)