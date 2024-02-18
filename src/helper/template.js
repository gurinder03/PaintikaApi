'use strict';
const fs = require('fs');
const ejs = require('ejs');
const twilio = require('twilio');
const config = require('../config/config');
const api_key = config.SEND_GRID_API_KEY;
const from = config.SEND_GRID_FROM;


module.exports.emailTemplate = async (order, to) => {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(api_key);
    let compiled = ejs.compile(fs.readFileSync(__dirname + '/../templates/order_template.html', 'utf8'));

    let items = order.items;;
    if (items.length > 0) {
        await Promise.all(
            items.map((item) => {
                item.price = item.quantity * item.price;
            })
        )
    }
    let html = compiled({
        title: 'order Placed',
        text: 'Order',
        order_number: order.order_number,
        created_at: order.created_at,
        order_sub_total: order.order_sub_total,
        order_total: order.order_total,
        tax: order.tax,
        items: items
    });

    let temp_data = {
        to: to,
        from: from,
        subject: "Your order placed.",
        message: 'Order',
        html: html,
        order_number: order.order_number,
        type: "order_placed"
    }
    sgMail.send(temp_data)
        .then(() => {
            console.log('Email sent successfully');
            return true;
        })
        .catch((error) => {
            console.error('Error sending email', error);
            return true;
        });
}

module.exports.mobileTemplate = async (order, phone) => {
    let msg = `Your order placed : OTP is ${order.order_number}`;
    let from = config.TWILLIO_FROM;
    let accountSid = config.TWILLIO_ACCOUNT_SID;
    let authToken = config.TWILLIO_AUTHTOKEN;
    let client = new twilio(accountSid, authToken);
    try {
        return await client.messages.create({
            from: from,
            to: "+91" + phone,
            body: msg,
            autoRetry: true,
            maxRetries: 3
        });
    } catch (err) {
        console.log("Twilio error ", err);
        return err;
    }


}



