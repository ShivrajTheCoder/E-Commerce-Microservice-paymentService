import { Request, Response } from "express";
import Razorpay = require("razorpay");
// type Env = {
//     key_id: string;
//     key_secret: string;
// }
var instance = new Razorpay({
    key_id:"rzp_test_sFSldafHF33EGU",
    key_secret:"ttTPZrZ1DokL2filJLeJgwOd",
});
export const NewPayement = async (req: Request, res: Response) => {
  console.log(req.body);
  let {amount}=req.body;
  var options = {
      amount,  // amount in the smallest currency unit
      currency: "INR",
    };
    instance.orders.create(options, function(err, order) {
      console.log(order);
      if(err){
          console.log(err);
          return res.status(500).json({
            error:err,
          })
      }
      return res.status(200).json({
        order
      })
    });
}

export const SuccessPayment = async (_req: Request, res: Response) => {
  // console.log(req.body);
  return res.status(200).json({
    message: "ok"
  })
}