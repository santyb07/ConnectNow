import mongoose from "mongoose";

import dotenv from "dotenv"

dotenv.config()

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;


const Connection = async()=>{
    // console.log(USERNAME,PASSWORD)
    const URL = `mongodb://${USERNAME}:${PASSWORD}@ac-4z2rxii-shard-00-00.d1eqh17.mongodb.net:27017,ac-4z2rxii-shard-00-01.d1eqh17.mongodb.net:27017,ac-4z2rxii-shard-00-02.d1eqh17.mongodb.net:27017/?ssl=true&replicaSet=atlas-2q3gn3-shard-0&authSource=admin&retryWrites=true&w=majority`
    try{
        await mongoose.connect(URL,{
            useUnifiedTopology:true,
        }).then(()=>{

            console.log('Database Connected succesfully.')
        }).catch(error=>console.log(error))
    }catch(error){
        console.log('DATABASE connection error.',error)
    }
}

export default Connection;