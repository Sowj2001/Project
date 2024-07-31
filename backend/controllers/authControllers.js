const adminModel = require('../models/adminModel')
const sellerModel = require('../models/sellerModel')
const sellerCustomerModel  = require('../models/chat/sellerCustomerModel')
const { responseReturn } = require('../utiles/response')
const bcrpty = require('bcrypt')
const { createToken } = require('../utiles/tokenCreate')
const cloudinary = require('cloudinary').v2
const formidable = require("formidable")
const bcrypt = require('bcrypt');


class authControllers{
   
    admin_login = async(req,res) => {
        const {email,password} = req.body
        try {
            const admin = await adminModel.findOne({email}).select('+password')
            // console.log(admin)
            if (admin) {
                const match = await bcrpty.compare(password, admin.password)
                // console.log(match)
                if (match) {
                    const token = await createToken({
                        id : admin.id,
                        role : admin.role
                    })
                    res.cookie('accessToken',token,{
                        expires : new Date(Date.now() + 7*24*60*60*1000 )
                    }) 
                    responseReturn(res,200,{token,message: "Login Success"})
                } else {
                    responseReturn(res,404,{error: "Password Wrong"})
                }



                 
            } else {
                responseReturn(res,404,{error: "Email not Found"})
            }
            
        } catch (error) {
            responseReturn(res,500,{error: error.message})
        }
 
    }
    // End Method 


    seller_login = async(req,res) => {
        const {email,password} = req.body
        try {
            const seller = await sellerModel.findOne({email}).select('+password')
            // console.log(admin)
            if (seller) {
                const match = await bcrpty.compare(password, seller.password)
                // console.log(match)
                if (match) {
                    const token = await createToken({
                        id : seller.id,
                        role : seller.role
                    })
                    res.cookie('accessToken',token,{
                        expires : new Date(Date.now() + 7*24*60*60*1000 )
                    }) 
                    responseReturn(res,200,{token,message: "Login Success"})
                } else {
                    responseReturn(res,404,{error: "Password Wrong"})
                }
 
                 
            } else {
                responseReturn(res,404,{error: "Email not Found"})
            }
            
        } catch (error) {
            responseReturn(res,500,{error: error.message})
        }
 
    }
    // End Method 


    // seller_register = async(req, res) => {
    //      const {email,name,password} = req.body
    //      try {
    //         const getUser = await sellerModel.findOne({email})
    //         if (getUser) {
    //             responseReturn(res,404,{error: 'Email Already Exit'})
    //         }else{
    //             const seller = await sellerModel.create({
    //                 name,
    //                 email,
    //                 password: await bcrpty.hash(password, 10),
    //                 method : 'menualy',
    //                 shopInfo: {}
    //             })
    //            await sellerCustomerModel.create({
    //                  myId: seller.id
    //            })

    //            const token = await createToken({ id : seller.id, role: seller.role })
    //            res.cookie('accessToken',token, {
    //             expires : new Date(Date.now() + 7*24*60*60*1000 )
    //            })

    //            responseReturn(res,201,{token,message: 'Register Success'})
    //         }
    //      } catch (error) {
    //         responseReturn(res,500,{error: 'Internal Server Error'})
    //      }
    // }
    // End Method 

    seller_register = async (req, res) => {
        const { email, name, password } = req.body;
        try {
            // Check if the email already exists
            const existingSeller = await sellerModel.findOne({ email });
            if (existingSeller) {
                return responseReturn(res, 400, { error: 'Email Already Exists' });
            }
    
            // Create a new seller
            const hashedPassword = await bcrypt.hash(password, 10);
            const seller = await sellerModel.create({
                name,
                email,
                password: hashedPassword,
                method: 'manual',
                shopInfo: {} // Initialize shopInfo as an empty object
            });
    
            // Create a corresponding entry in sellerCustomerModel
            await sellerCustomerModel.create({ myId: seller.id });
    
            // Generate a token and set it in cookies
            const token = await createToken({ id: seller.id, role: seller.role });
            res.cookie('accessToken', token, {
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                httpOnly: true
            });
    
            // Send success response
            responseReturn(res, 201, { token, message: 'Register Success' });
        } catch (error) {
            console.error('Registration Error:', error); // Detailed logging
            responseReturn(res, 500, { error: 'Internal Server Error' });
        }
    };

    getUser = async (req, res) => {
        const {id, role} = req;

        try {
            if (role === 'admin') {
                const user = await adminModel.findById(id)
                responseReturn(res, 200, {userInfo : user})
            }else {
                const seller = await sellerModel.findById(id)
                responseReturn(res, 200, {userInfo : seller})
            }
            
        } catch (error) {
            responseReturn(res,500,{error: 'Internal Server Error'})
        }


    } // End getUser Method 

    profile_image_upload = async(req, res) => {
        const {id} = req
        const form = formidable({ multiples: true })
        form.parse(req, async(err,_,files) => {
                cloudinary.config({
                cloud_name: process.env.cloud_name,
                api_key: process.env.api_key,
                api_secret: process.env.api_secret,
                secure: true
            })
            const { image } = files

            try {
                const result = await cloudinary.uploader.upload(image.filepath, { folder: 'profile'})
                if (result) {
                    await sellerModel.findByIdAndUpdate(id, {
                        image: result.url
                    }) 
                    const userInfo = await sellerModel.findById(id)
                    responseReturn(res, 201,{ message : 'Profile Image Upload Successfully',userInfo})
                } else {
                    responseReturn(res, 404,{ error : 'Image Upload Failed'})
                }
                
            } catch (error) {
                responseReturn(res, 500,{ error : error.message })
            }
 

        })
    }

    // End Method 

    // profile_info_add = async (req, res) => {
    //    const { division,district,shopName,sub_district } = req.body;
    //    const {id} = req;

    //    try {
    //     await sellerModel.findByIdAndUpdate(id, {
    //         shopInfo: {
    //             shopName,
    //             division,
    //             district,
    //             sub_district
    //         }
    //     })
    //     const userInfo = await sellerModel.findById(id)
    //     responseReturn(res, 201,{ message : 'Profile info Add Successfully',userInfo})
        
    //    } catch (error) {
    //     responseReturn(res, 500,{ error : error.message })
    //    }


    // }
// End Method 


profile_info_add = async (req, res) => {
    const { division, district, shopName, sub_district, phoneNumber, gstn } = req.body;
    const { id } = req;

    try {
        const seller = await sellerModel.findById(id);
        if (!seller) {
            return responseReturn(res, 404, { error: 'Seller Not Found' });
        }

        if (!phoneNumber || !shopName || !gstn) {
            return responseReturn(res, 400, { error: 'Please provide all required fields' });
        }

        // Check if GST number matches the expected format
        const gst = "GST";
        const phoneNumberLast3Digits = phoneNumber.slice(-3);
        const shopNameFirst3Letters = shopName.slice(0, 3).toUpperCase();
        const expectedGstn = `${gst}${phoneNumberLast3Digits}${shopNameFirst3Letters}`;

        if (gstn !== expectedGstn) {
            return responseReturn(res, 400, { error: 'Invalid GST number format' });
        }

        await sellerModel.findByIdAndUpdate(id, {
            shopInfo: {
                shopName,
                division,
                district,
                sub_district,
                phoneNumber,
                gstn
            }
        });

        const userInfo = await sellerModel.findById(id);
        responseReturn(res, 200, { message: 'Profile info added successfully', userInfo }); // Change status code to 200

    } catch (error) {
        console.error('Profile Info Error:', error);
        responseReturn(res, 500, { error: 'Internal Server Error' });
    }
};

logout = async (req, res) => {
    try {
        res.cookie('accessToken', null, {
            expires: new Date(Date.now()),
            httpOnly: true
        });
        res.status(200).json({ message: 'Logout success' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// End Method 

}

module.exports = new authControllers()