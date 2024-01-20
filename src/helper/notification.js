
const mongoose = require('mongoose');
const { admin } = require('../firebase');
const notificationModel = require('../modules/notification/model/notification.model');


module.exports = {

    sendPushNotificationUser: async(notifyData,next) => {     
        var payload = {
                notification: {
                    title: notifyData.title,
                    body: notifyData.body,
                    sound: "default"
                },
                data:{
                    type: notifyData.type,
                    title: notifyData.title,
                    body: notifyData.body
                }
            }

          


        await notificationModel.addNotification(notifyData);
        if(notifyData && notifyData.firebase_token){
        admin.messaging().sendToDevice(notifyData.firebaseToken, payload)
            .then((response) => {
                console.log('Firebase sent message:', response);
                next();
            })
            .catch((error) => {
                console.log('Firebase Error sending message:', error);
                next();
            });
        }
    },


    sendPushNotificationPainter: async(notifyData,next) => {
        let userData = await userModel.findOne({_id: notifyData.artist_id}).select('firebase_token');
        var payload = {
                notification: {
                    title: notifyData.title,
                    body: notifyData.body,
                    sound: "default"
                },
                data:{
                    type: "1",
                    title: notifyData.title,
                    body: notifyData.body
                }
            }
         await notificationModel.addNotification(notifyData);
         if(userData && userData.firebase_token){
            admin.messaging().sendToDevice(userData.firebaseToken, payload)
            .then((response) => {
                console.log('Firebase sent message:', response);
            })
            .catch((error) => {
                console.log('Firebase Error sending message:', error);
                next();
            });
        } 

    }
}








