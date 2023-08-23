import express from "express";
import { NewPayement, SuccessPayment } from "../Controllers/paymentController";
import { authenticateToken } from "../utils/userAuthMiddleware";

const router=express.Router();

router.route("/newpayment")
    .post(authenticateToken,NewPayement)

router.route("/sucesspayment")
    .post(authenticateToken,SuccessPayment)
export default router;