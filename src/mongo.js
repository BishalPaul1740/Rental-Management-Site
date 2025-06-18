
/*
// ORIGINAL WITHOUT  NEW COLLECCTION 
const mongoose = require("mongoose");
// const Collection = require("./mongo")
mongoose.connect("mongodb://localhost:27017/authenticaation")
.then(()=> {
    console.log("mongo connected")
})
.catch(()=> {
    console.log("error")
})

const schema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    password: {
        type:String,
        required: true
    },
    token:{
        type:String,
        required:true
    }
})

const Collection = new mongoose.model("AuthCollection", schema)

module.exports = Collection
*/


//TRIAL 2
/*
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/authenticaation")
.then(() => {
    console.log("MongoDB connected");
})
.catch(() => {
    console.log("MongoDB connection error");
});

// Login/Auth Schema
const authSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
});

// Tenant/User-Specific Data Schema
const userDataSchema = new mongoose.Schema({
    
});

// Create a dynamic model for each user collection
function createUserCollection(username) {
    return mongoose.model(username, userDataSchema);
}

// Export both
const AuthCollection = mongoose.model("AuthCollection", authSchema);

module.exports = {
    AuthCollection,
    createUserCollection
};
*/

//tier 3
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/authenticaation")
    .then(() => console.log("MongoDB connected"))
    .catch(() => console.log("MongoDB connection error"));

// ---------------------
// Auth Collection Schema
// ---------------------
const authSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
});

const AuthCollection = mongoose.model("AuthCollection", authSchema);

// ---------------------
// Rental Property Schema
// ---------------------
const rentalPropertySchema = new mongoose.Schema({
     propertyName: String,
    address: String,
    emailid:String,
    phone:String,
    monthlyRent: Number,
    rentHistory: [
        {
            month: String, // e.g., "June"
            year: Number,  // e.g., 2025
            status: {
                type: String,
                enum: ["Paid", "Unpaid"],
                default: "Unpaid"
            }
        }
    ],
    created_at: {
        type: Date,
        default: Date.now
    }
});

// ---------------------
// Dynamic Collection Creator
// ---------------------
function createUserCollection(username) {
    const modelName = `rents_${username}`;
    
    // Avoid model overwrite errors in Mongoose
    if (mongoose.models[modelName]) {
        return mongoose.models[modelName];
    }

    return mongoose.model(modelName, rentalPropertySchema);
}

// Export both
module.exports = {
    AuthCollection,
    createUserCollection
};


