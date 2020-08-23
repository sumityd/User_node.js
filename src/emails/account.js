const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// sgMail.send({
//     to: 'sumityadav1.2014@gmail.com',
//     from: 'sumityadav1.2014@gmail.com',
//     subject:'this is my first test mail',
//     text:'i hope this message get by you'
// })


const sendWelcomeEmail = (email,name) => {
    sgMail.send({
        to:email,
        from:"sumityadav1.2014@gmail.com",
        subject:"welcome to the app",
        text:`welcome to the app, ${name} let me you get along with the app`,
        html:''
    })
}

const sendCancelationEmail = (email,name) => {
    sgMail.send({
        to:email,
        from:"sumityadav1.2014@gmail.com",
        subject:"sorry to you go",
        text:`good bye to the app, ${name} i hope to see you back after some time`,
        html:''
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail,
}