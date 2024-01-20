
const mongoose = require('mongoose');

module.exports.artistOrder = async (artistItems, payload, user_order_id, tax) => {
    try {
        let artistItemsList = [];
        if (artistItems.length > 0) {
            await Promise.all(
                artistItems.map(async (artist) => {
                    let items = artist.items;
                    for (const item of items) {
                        artist.order_sub_total = artist.order_sub_total + (item.quantity * item.price);
                    }
                    let creator_data = await mongoose.model('users').findOne({ _id: artist.artist_id }).select('artist_comission');
                    artist.artist_earning = Number((artist.order_sub_total * creator_data.artist_comission / 100).toFixed(2));
                    artist.admin_earning = Number((artist.order_sub_total - artist.artist_earning).toFixed(2));
                    artist.tax = artist.order_sub_total * tax/100;
                    artist.order_total = artist.order_sub_total + artist.tax;
                    artistItemsList.push({
                        artist_id:artist.artist_id,
                        items:items,
                        tax: artist.tax,
                        artist_earning: artist.artist_earning,
                        admin_earning: artist.admin_earning,
                        order_total:artist.order_total,
                        order_sub_total: artist.order_sub_total
                    })
                })
            )

        }
      
        for(let i = 0; i < artistItemsList.length; i++){
            let artist = artistItemsList[i];
            await asyncOperationArtistOrder(artist)
        }
        
        function asyncOperationArtistOrder(artist) {
            return new Promise(async(resolve, reject) => {
                let items = artist.items;
                payload.artist_earning = artist.artist_earning;
                payload.admin_earning = artist.admin_earning;
                payload.order_sub_total = artist.order_sub_total;
                payload.order_total = artist.order_total;
                payload.tax = artist.tax;
                let orderCount = await mongoose.model("order_count").findOneAndUpdate({ name: "order" }, { $inc: { number: 1 } }, { upsert: true, new: true });
                payload.order_number = `#${orderCount.number}`;
                payload.payment_status = "SUCCESS";
                payload.items = items;
                payload.user_order = user_order_id;
                payload.artist_id = artist.artist_id;
               let order_data =  await mongoose.model("artist_orders").create(payload);
               await mongoose.model("orders").findOneAndUpdate({_id: user_order_id},{$addToSet:{artist_order: order_data._id}},{new: true})
               resolve(order_data);
            });
          }    

    } catch (err) {
        return err;
    }

}