const mongoose = require('mongoose');

// const mongoURI='mongodb+srv://techiefood:plmzaq10@cluster0.fyujqf4.mongodb.net/techiefoodmern?retryWrites=true&w=majority&appName=AtlasApp'
// const mongoURI='mongodb+srv://techiefood:plmzaq10@cluster0.fyujqf4.mongodb.net/techiefoodmern?retryWrites=true&w=majority&appName=AtlasApp'
const mongoURI='mongodb://techiefood:plmzaq10@ac-1vqscjn-shard-00-00.fyujqf4.mongodb.net:27017,ac-1vqscjn-shard-00-01.fyujqf4.mongodb.net:27017,ac-1vqscjn-shard-00-02.fyujqf4.mongodb.net:27017/techiefoodmern?ssl=true&replicaSet=atlas-5fn9f8-shard-0&authSource=admin&retryWrites=true&w=majority&appName=AtlasApp'
// const mongoDB=async()=>{
    module.exports = function (callback) {
      mongoose.connect(mongoURI,{useNewUrlParser: true},async(err,result)=>{
        if(err)console.log("---",err);
        else{
            console.log("connected successfully");
            const fetched_data = mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function (err,data){
                const food_category=await mongoose.connection.db.collection("food_category");
                food_category.find({}).toArray(function (err,Catdata) {
                    callback(err,data,Catdata);
                    // if(err)console.log(err);
                    // else{
                    //     global.food_items = data;
                    //     global.food_category=catData;
                    // }
                })
            })
        }     
    });
}

// module.exports = mongoDB; clea




 