// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


const SAND_API_KEY = process.env.SAND_API_KEY
import { Circle, CircleEnvironments } from "@circle-fin/circle-sdk";

export default async function  handler(req, res) {

 try {
     //check that API key is set
  const circle = new Circle(SAND_API_KEY, CircleEnvironments.sandbox);

  //testapi ping  connection
   const pingResp = await circle.health.ping();
  console.log(pingResp.data);

  //get configuration and wallet id + info
  const configResp = await circle.management.getAccountConfig();
  const masterWalletId = configResp.data.data.payments.masterWalletId;

  console.log("masterWalletId", circle)

  //make a payment to fund the wallet
  const paymentResp =  await circle.paymentIntents.createPayment({
     idempotencyKey: "5c6e9b91-6563-47ec-8c6d-0ce1103c50b1",
     amount: {
       amount: "3.14",
       currency: "USD",
     },
     settlementCurrency: "USD",
     paymentMethods: [
       {
         chain: "SOLANA",
         type: "blockchain",
       },
     ],
   });


  
  res.status(200).json(masterWalletId)
 } catch (error) {
    console.log("error", error)
    res.status(500).json({error: error})
 }
}
