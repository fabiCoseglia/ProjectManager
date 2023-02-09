const createError = require('http-errors');
const errorResponse = require('../helpers/errorResponse');
const User = require('../database/models/User');
const generatorToken = require('../helpers/generatorToken');
const jsonWebTokenGenerator = require('../helpers/jsonWebTokenGenerator');
const { confirmRegister, forgotPassword } = require('../helpers/sendMails');

module.exports = {
    register : async (req,res) => {
        try {

            const {name,email,password} = req.body;

            if([name,email,password].includes("")){
                throw createError(400,"All fields are required");
            };

            let user = await User.findOne({
                email
            });

            if(user){
                throw createError(400,"This email is already registered");
            };

            const token=generatorToken();

            user = new User(req.body);
            user.token = token;

            const userStore = await user.save();
            //send email to confirm

            await confirmRegister({
                name: userStore.name,
                email: userStore.email,
                token: userStore.token
            })
            // console.log('--------->',generatorToken());

            return res.status(201).json({
                ok : true,
                msg :'Registered user',
                user: userStore
            })
        } catch (error) {
           return errorResponse(res,error,'REGISTER')
        }
       
    },
    login : async (req,res) => {
       
        try {

            const {email,password} = req.body;

            if([email,password].includes("")){
                throw createError(400,"All fields are required");
            };

            let user = await User.findOne({email});

            if (!user) throw createError(403, "invalid credentials");

            if (!user.checked) throw createError(403, "Your account has not been confirmed");

            if (!(await user.checkedPassword(password))) throw createError(403, "invalid credentials");

            
            return res.status(200).json({
                ok : true,
                msg :'Usuario Logueado',
                user: {
                    name: user.name,
                    _id: user._id,
                },
                token: jsonWebTokenGenerator({
                    id: user._id
                })
            });

        } catch (error) {
            return errorResponse(res,error,'LOGIN');
        }
       
    },
    checked : async (req,res) => {

        const {token} = req.query; // http://localhost:4000/api/auth/checked?token=asdsadass3rr4sd

        try {
            if(!token) {
                throw createError(400, "The token doesn't exist");}

            let user = await User.findOne({
                token
            });
            
            if(!user) throw createError(400, "Invalid Token");


            user.checked = true;
            user.token ="";

            await user.save();

            return res.status(201).json({
                ok : true,
                msg :'Registration completed successfully'
            });

        } catch (error) {
            return errorResponse(res,error,'CHECKED');
        }
       
    },
    sendToken : async (req,res) => {

        const {email} = req.body;
        try {

            let user= await User.findOne({
                email
            });

            if(!user) throw createError(400,'The email is not registered');

            const token = generatorToken()
            user.token = token;
            await user.save();

            // send email to change forgoten password
            await forgotPassword({
                name: user.name,
                email: user.email,
                token: user.token
            })

            return res.status(200).json({
                ok : true,
                msg :'Token sent to the email'
            })
        } catch (error) {
            return errorResponse(res,error,'SEND-TOKEN');
        }
    },
    verifyToken : async (req,res) => {
        try {
            const {token} = req.query;
            
            if(!token) throw createError(400,'There is no token in the request');

            const user= await User.findOne({token});

            if(!user) throw createError(400,'Invalid Token');

            return res.status(200).json({
                ok : true,
                msg :'Checked Token'
            })
        } catch (error) {
            return errorResponse(res,error,'VERIFY-TOKEN');
        }
    },
    changePassword : async (req,res) => {
        try {
            const {token}= req.query;
            const {password}= req.body;

            if(!password) throw createError(400,'The password is required');

            const user = await User.findOne({token});

            if(!user) throw createError(400,'Invalid Token');

            user.password= password;
            user.token= "";
            await user.save();

            return res.status(200).json({
                ok : true,
                msg :'updated password'
            })
        } catch (error) {
            return errorResponse(res,error,'CHANGE-PASSWORD');
        }
    },
}