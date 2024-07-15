const nodemailer = require ('nodemailer');
const dotenv = require ('dotenv');
dotenv.config();
const Passkey = process.env.SMTP_PASSWORD;
const Id = process.env.SMTP_EMAIL
const Gmail = process.env.SMTP_SERVICE
const  smtpPort = process.env.SMTP_PORT

const Transporter = nodemailer.createTransport({
    service: Gmail,
    secure:false,
    port:smtpPort,
    auth:{
         user: Id,
         pass: Passkey,
    }
});

Transporter.verify((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Ready to Send");
    }
  });

const sendEmail = async(req,res)=>{
   const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
    const mailOptions = {
       from : name,
       to : Id,
       subject : "This email comes from your Portfolio",
       html : `
             <p>Name: ${name}</p>
             <p>Email:${email} </p>
             <p>Message:${message}</p>
       `,
    }
Transporter.sendMail(mailOptions, (error)=>{
    if (error) {
        return res.status(400).json({
            success:false,
            msg:"Email is not send!", 
            console:console.log("Email is not send!")
        });
            
    } else {
        return res.status(201).json({
            success:true,
            msg:"Email is sent successfully!",
            console:console.log("Email is sent successfully!"),

        })
    }
   });


   const mailOptionsCustomer = {
    from : "AB-DEVELOPERS",
    to : email,
    subject : "Thank You for contact us",
    html : `
          <p><b style="color: blue";>AB-DEVELOPERS</b>: <span style="color:#0066ff";>This email is send by us.</span></p>
          <p><span style="color:#0066ff";>You send us this message:</span><span style="color: #00ff00";> ${message}</span> </p>
          <p style="color: green";>Thank You for contacting us. We will get back to you shortly.</p>
          <img src="https://cdn.create.vista.com/api/media/medium/448491818/stock-photo-rendering-cute-robot-artificial-intelligence-robot-cartoon-character-greeting?token=" alt="Robot" width="200px" height="200px">
    `,
 }
Transporter.sendMail(mailOptionsCustomer, (error)=>{
 if (error) {
     return res.status(400).json({
         success:false,
         msg:"Email is not send!", 
         console:console.log("Email is not send!")
     });
         
 } else {
     return res.status(201).json({
         success:true,
         msg:"Email is sent successfully!",
         console:console.log("Email is sent successfully!"),

     })
 }
});
};

module.exports = sendEmail