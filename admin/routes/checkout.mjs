import { Router } from "express";
import Stripe from "stripe";

const router = Router();
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
console.log("StripeSecretKey", stripeSecretKey);


const DOMAIN = "http://localhost:5173"

router.post("/checkout", async (req, res)=>{
    const stripe = new Stripe(stripeSecretKey, {apiVersion: "2024-06-20"})
    try {
        const {items, email} = await req.body;
        console.log("item", JSON.stringify(items));
        const extractingItems = await items.map((item)=>({
            quantity: item.quantity,
            price_data: {
                currency: "usd",
                unit_amount: item.discountedPrice * 100,
                product_data: {
                    name : item.name,
                    description: item.description,
                    images: item.images,
                },
            },
        }));
    
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: extractingItems,
            mode: "payment",
            success_url: `${DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${DOMAIN}/cancel`,
            metadata: {
                email,
            }
        });
    
        res.json({
            message: "Server is connected",
            success: true,
            id: session.id
        })
    } catch (error) {
        res.status(500).json({error: error})
    }
});

export default router;