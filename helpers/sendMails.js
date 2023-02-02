const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

module.exports={
    confirmRegister : async(data) =>{
        const {name, email, token} = data;
        try {
             await transport.sendMail({
                from: 'Projects Manager <email del protyec>',
                to: email,
                subject: 'Confirm your account',
                text: 'Please, confirm your account in Projects Manager',
                html: `
                <p> Hi ${name}!, Click to confirm your account<p/>
                <a href= "${process.env.URL_FRONT}/confirm/${token}">Confirm account<a/>
                ` 
            })
        } catch (error) {
            console.log(error)
        }      
    },
    forgotPassword : async(data) =>{
        const {name, email, token} = data;
        try {
             await transport.sendMail({
                from: 'Projects Manager <email del protyec>',
                to: email,
                subject: 'Reste your Password',
                text: 'Please, confirm to reset your password',
                html: `
                <p> Hi ${name}!, Click to recover your password<p/>
                <a href= "${process.env.URL_FRONT}/recover-password/${token}">Change Password<a/>
                ` 
            })
        } catch (error) {
            console.log(error)
        }      
    }
}