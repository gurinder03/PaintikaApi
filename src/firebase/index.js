
const admin = require('firebase-admin');

module.exports = (userAgent) => {
    let FB;
    console.log("==============", userAgent);
    const serviceAccount = userAgent == 'web' ? require('./web') : require('./mobile')
    FB = admin.initializeApp({
        credential: admin.credential.cert({
            projectId: serviceAccount.project_id, // I get no error here
            clientEmail: serviceAccount.client_email, // I get no error here
            privateKey: serviceAccount.private_key.replace(/\\n/g, '\n') // NOW THIS WORKS!!!
        })
    }, "FB");
    return FB;
}

