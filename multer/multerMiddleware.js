const multer = require("multer");
const { getRandomNumber } = require("../helpers/uniqueID");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/posts')
  },
    filename: function (req, file, cb) {
        req.imageName = "/img/posts/" + file.fieldname + '-' + req.query.id + ".jpg";
    cb(null, file.fieldname + '-' + req.query.id + ".jpg")
  }
})
 
var storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    //Checking File
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, 'public/img/proof')
    } else {
      
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
    
    
  },
  filename: function (req, file, cb) {
    req.imageName = "/img/proof/" + file.fieldname + '-' + req.query.id + ".jpg";
    cb(null, file.fieldname + '-' + req.query.id + ".jpg")
  }
});

var userAvatarMulter = multer.diskStorage({
  destination: function (req, file, cb) {
    //Checking File
   
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, 'public/img/avatar')
    } else {
      
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
    
    
  },
  filename: function (req, file, cb) {

    const randomNo = getRandomNumber(11);

    req.imageName = "/img/avatar/" + file.fieldname + '-' + randomNo + ".jpg";

    cb(null, file.fieldname + '-' + randomNo + ".jpg");

  }
});


//IDENTITY
var identityMulter = multer.diskStorage({
  destination: function (req, file, cb) {
    //Checking File
   
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, 'public/img/identity')
    } else {
      
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
    
    
  },
  filename: function (req, file, cb) {
   
    req.imageName = "/img/identity/" + file.fieldname + ".jpg";
    cb(null, file.fieldname +".jpg")
  }
});


exports.uploadPostImageSettings = multer({
    fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
        
    
    },
    limits: {
        fileSize: 1 * 1024 * 1024 * 1024  // 3 MB
    }
})

exports.uploadPostImage = multer({ storage: storage })
exports.userAvatarMulter = multer({ storage: userAvatarMulter })

exports.paymentProofMulter = multer({ storage: storage2 })
exports.identityMulter = multer({ storage: identityMulter })