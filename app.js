const cpuNums = require("os").cpus().length;
const cluster = require("cluster")
const express = require('express');
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const path = require('path');
const cookieParser = require('cookie-parser');
const errorMiddleWare = require("./middleware/errorMiddleware");
const logger = require("./helpers/logger");
const authRoute = require("./routes/auth/auth");
const { generalData } = require("./middleware/generalData");
const { userDetails } = require("./middleware/userInfo");
const userRoute = require("./routes/user/user");
const generalRoute = require("./routes/general/general");





try {




//Clustering
    /*if (cluster.isMaster) {
        for (i = 0; i < cpuNums; i++){
            cluster.fork()
        };

        //On Child Process Exist
        cluster.on("exit", worker => {
            cluster.fork()
        });
        
    } else {*/
        /* MAIN WORK START HERE  */
         //Require ENV
require("dotenv").config()


//Required Database
require('./models/db');

const app = express();

//Cors
app.use(cors({origin:"*",credentials:true}))


//Helmet

  app.use(helmet(
  {
    contentSecurityPolicy: false,
  }
))


//Hpp Security
app.use(hpp())

  // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

  

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join('public')));

//JOB


//Routes
  
//GENERAL ROUTE
//app.use("/",generalRoute)

//AUTH ROUTE
app.use("/", authRoute)

/* //GENERAL ROUTE
app.use("/", generalRoute)
//USER ROUTE
app.use("/user", userRoute) */

//ADMIN ROUTE
//app.use("/admin", isUserLogin, adminRoute)



//Error Middleware
app.use(errorMiddleWare)


app.listen(9000,()=>console.log("App Started On Port 9k")) 
  

  process.on('uncaughtException', function (err) {
  logger.debug(err)
    
});

process.on('unhandledRejection', (reason, promise) => {
  logger.debug(reason)
})

/*}*/ //Clustering End



  
} catch (error) {
  logger.debug(error)
}