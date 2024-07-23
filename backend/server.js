const express = require('express')
const jwt=require('jsonwebtoken')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs')
const nodemailer=require('nodemailer')
const { dbConnect } = require('./utiles/db')

const socket = require('socket.io')
const http = require('http')
const customerModel = require('./models/customerModel')
const server = http.createServer(app)
app.use(cors({
    origin : ['http://localhost:3000','http://localhost:3001'],
    credentials: true
}))

const io = socket(server, {
    cors: {
        origin: '*',
        credentials: true
    }
})

var allCustomer = []
var allSeller = []
let admin = {}

const addUser = (customerId,socketId,userInfo) => {
    const checkUser = allCustomer.some(u => u.customerId === customerId)
    if (!checkUser) {
        allCustomer.push({
            customerId,
            socketId,
            userInfo
        })
    }
} 

const addSeller = (sellerId,socketId,userInfo) => {
    const checkSeller = allSeller.some(u => u.sellerId === sellerId)
    if (!checkSeller) {
        allSeller.push({
            sellerId,
            socketId,
            userInfo
        })
    }
} 

const findCustomer = (customerId) => {
    return allCustomer.find(c => c.customerId === customerId)
}
const findSeller = (sellerId) => {
    return allSeller.find(c => c.sellerId === sellerId)
}

const remove = (socketId) => {
    allCustomer = allCustomer.filter(c => c.socketId !== socketId)
    allSeller = allSeller.filter(c => c.socketId !== socketId)
}

io.on('connection', (soc) => {
    console.log('socket server running..')

    soc.on('add_user',(customerId,userInfo)=>{
         addUser(customerId,soc.id,userInfo)
         io.emit('activeSeller', allSeller) 
    })
    soc.on('add_seller',(sellerId, userInfo) => {
       addSeller(sellerId,soc.id,userInfo)
       io.emit('activeSeller', allSeller) 
    })
    soc.on('send_seller_message',(msg) => {
        const customer = findCustomer(msg.receverId)
        if (customer !== undefined) {
            soc.to(customer.socketId).emit('seller_message', msg)
        }
    })  
    soc.on('send_customer_message',(msg) => {
        const seller = findSeller(msg.receverId)
        if (seller !== undefined) {
            soc.to(seller.socketId).emit('customer_message', msg)
        }
    })  

    soc.on('send_message_admin_to_seller',(msg) => {
        const seller = findSeller(msg.receverId)
        if (seller !== undefined) {
            soc.to(seller.socketId).emit('receved_admin_message', msg)
        }
    })

    soc.on('send_message_seller_to_admin',(msg) => { 
        if (admin.socketId) {
            soc.to(admin.socketId).emit('receved_seller_message', msg)
        }
    })



    soc.on('add_admin',(adminInfo) => {
        delete adminInfo.email
        delete adminInfo.password
        admin = adminInfo
        admin.socketId = soc.id  
        io.emit('activeSeller', allSeller) 

     })

    soc.on('disconnect',() => {
        console.log('user disconnect')
        remove(soc.id)
        io.emit('activeSeller', allSeller) 
    })


})


require('dotenv').config()
  

app.use(bodyParser.json())
app.use(cookieParser())
 
app.use('/api/home',require('./routes/home/homeRoutes'))
app.use('/api',require('./routes/authRoutes'))
app.use('/api',require('./routes/order/orderRoutes'))
app.use('/api',require('./routes/home/cardRoutes'))
app.use('/api',require('./routes/dashboard/categoryRoutes'))
app.use('/api',require('./routes/dashboard/productRoutes'))
app.use('/api',require('./routes/dashboard/sellerRoutes'))
app.use('/api',require('./routes/home/customerAuthRoutes'))
app.use('/api',require('./routes/chatRoutes'))
app.use('/api',require('./routes/paymentRoutes'))
app.use('/api',require('./routes/dashboard/dashboardRoutes'))

app.get('/',(req,res) => res.send('Hello Server'))






// app.post('/forgot-password', (req, res) => {
//     const { email } = req.body;
//     customerModel.findOne({ email: email })
//     .then(user => {
//         if (!user) {
//             return res.send({ Status: "user not existed" });
//         }

//         const token = jwt.sign({ id: user._id }, "jwt_secrete_key", { expiresIn: "1d" });
//         var transporter = nodemailer.createTransport({
//             service: 'gmail',
//             secure: true,
//             port: 465,
//             auth: {
//                 user: 'bizcartforalll@gmail.com',
//                 pass: 'qmcxxtmoetijstty'
//             }
//         });

//         var mailOptions = {
//             from: 'bizcartforalll@gmail.com',
//             to: user.email,
//             subject: 'Reset Password Link',
//             text: `http://localhost:3000/reset-password/${user._id}/${token}`
//         };

//         transporter.sendMail(mailOptions, function (error, info) {
//             if (error) {
//                 console.log(error);
//             } else {
//                 return res.send({ Status: "Success" });
//             }
//         });
//     });
// });


// app.post('/reset-password/:id/:token', (req, res) => {
//     const {id, token} = req.params
//     const {password} = req.body

//     jwt.verify(token, "jwt_secret_key", (err, decoded) => {
//         if(err) {
//             return res.json({Status: "Error with token"})
//         } else {
//             bcrypt.hash(password, 20)
//             .then(hash => {
//                 customerModel.findByIdAndUpdate({_id: id}, {password: hash})
//                 .then(user => res.send({Status: "Success"}))
//                 .catch(err => res.send({Status: err}))
//             })
//             .catch(err => res.send({Status: err}))
//         }
//     })
// })
app.post('/forgot-password', (req, res) => {
    const { email } = req.body;
    customerModel.findOne({ email: email })
    .then(user => {
        if (!user) {
            return res.send({ Status: "user not existed" });
        }

        const token = jwt.sign({ id: user._id }, "jwt_secret_key", { expiresIn: "1d" });
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            port: 465,
            auth: {
                user: 'bizcartforalll@gmail.com',
                pass: 'qmcxxtmoetijstty'
            }
        });

        var mailOptions = {
            from: 'bizcartforalll@gmail.com',
            to: user.email,
            subject: 'Reset Password Link',
            text: `http://localhost:3000/reset-password/${user._id}/${token}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                return res.send({ Status: "Success" });
            }
        });
    })
    .catch(err => console.log(err));
});

app.post('/reset-password/:id/:token', (req, res) => {
    const {id, token} = req.params;
    const {password} = req.body;

    jwt.verify(token, "jwt_secret_key", (err, decoded) => {
        if(err) {
            return res.json({Status: "Error with token"});
        } else {
            bcrypt.hash(password, 10) // Reduce salt rounds to 10
            .then(hash => {
                customerModel.findByIdAndUpdate(id, { password: hash })
                .then(user => {
                    if (!user) {
                        return res.send({ Status: "User not found" });
                    }
                    res.send({ Status: "Success" });
                })
                .catch(err => {
                    console.log("Error updating password:", err);
                    res.send({ Status: err.message });
                });
            })
            .catch(err => {
                console.log("Error hashing password:", err);
                res.send({ Status: err.message });
            });
        }
    });
});


const port = process.env.PORT
dbConnect()
server.listen(port, () => console.log(`Server is running on port ${port}`))