// package imports
import express  from "express";
import dotenv  from "dotenv";
import morgan from 'morgan';
import cors from "cors";
// file imports
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import  path     from('path');


//config env
dotenv.config();

//database config
connectDb();


//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
// showing status o your terminal 
//app.use(express.static(path.join(__dirname,'./client/build')))

//rest api
//app.use('*',function (req,res){
//    res.sendFile(path.join(__dirname, './client/build/index.html'));
// });


//routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/product',productRoutes)





//static files
app.use(express.static(path.join(__dirname,'./client/build')));

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"))
});


//port
const PORT = process.env.PORT||8085;

//run
app.listen(PORT,()=>{
    console.log(`server running at ${PORT}`);
})