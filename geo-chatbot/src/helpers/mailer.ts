import nodemailer from 'nodemailer';
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'



export const sendEmail = async({email, emailType, userId} :any) => {
    try {

        const hashedToken = await bcryptjs.hash(userId.toString (), 10)

        console.log("MAIL",userId);
        console.log("EMAIL TYPE",emailType);
        console.log(typeof emailType);


        //TODO: configure mail for usage

        if  (emailType === "VERIFY") {
            console.log("VERIFY SECTION");
            const updateUser = await User.findByIdAndUpdate(userId,
                {$set: {
                 verifyToken: hashedToken, 
                 verifyTokenExpiry: new Date(Date.now() + 360000000)}
        });
                 console.log("Updated user for verify", updateUser);

        } else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId,
                { $set:{
                    forgotPasswordToken: hashedToken, 
                    forgotPasswordTokenExpiry: new Date(Date.now() + 360000000) }
    });

        }
        console.log("Out side if else block");
        
        // var transport = nodemailer.createTransport({
        //     host: "sandbox.smtp.mailtrap.io",
        //     port: 2525,
        //     auth: {
        //       user: "19f7fe858d7918",
        //       pass: "d0da9ef07a8383"
        //     }
        //   });
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "c6d2cf075bb3e6",
              pass: "05d14d42984ba1"
            }
          });

        const mailOptions = {
            from: 'zuveriyamunshi924@gmail.com',//sender address
            to: email,
            subject: emailType === 'VERIFY' ? "verify your email" : "Reset your password",
             html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to $
             {emailType === "VERIFY" ? "verify your email" : "reset your password"} 
            or copy and paste the link below in your browser.
           <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`,
}

       const mailResponse = await transport.sendMail(mailOptions)
       return mailResponse

    } catch (error: any) {
          throw new Error(error.message)
    }
}