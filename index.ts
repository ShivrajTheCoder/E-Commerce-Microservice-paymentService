import express from "express";
import dotenv from "dotenv";
import paymentRoutes from "./Routes/paymentRoutes"
import { connectToDatabase } from "./db_connection";
import cors from "cors";
import { listenForMessages } from "./listenForMessages";
import Razorpay = require("razorpay");
import { sendMessageToQueue } from "./sendRzOrder";
const app = express();
dotenv.config();
type Env = {
    port: string;
}
var instance = new Razorpay({
    key_id: "rzp_test_sFSldafHF33EGU",
    key_secret: "ttTPZrZ1DokL2filJLeJgwOd",
});
(async () => {
    await connectToDatabase().then(() => {

        console.log('Connected to the database successfully!');
    })
        .catch(err => {
            console.log(err);
        })
})();
app.use(cors());
app.use(express.json());
listenForMessages('rz-order', async (content: any) => {
    console.log('Received message:', content);
    // Process the message as needed
    const detials = JSON.parse(content);
    // console.log(detials);
    let { amount } = detials;
    amount=amount*100;
    console.log(amount,"amount received in queue");
    var options = {
        amount,  // amount in the smallest currency unit
        currency: "INR",
    };
    instance.orders.create(options, function (err, order) {
        console.log(order);
        if (!err) {
            // console.log(err);
            sendMessageToQueue("razorpay-order", JSON.stringify(order));
        }
    });
});
app.use("/payment", paymentRoutes);
app.listen(process.env["PORT" as keyof Env], () => {
    console.log(`listening on port ${process.env["PORT" as keyof Env]}`);
})