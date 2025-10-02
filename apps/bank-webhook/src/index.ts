import express from "express";
import db from '@repo/db/client'

const app = express();

// This webhook will update the users balance on our app, once user add the money via any bank to our bank
app.post("/hdfcWebhook",async (req, res) => {
    //TODO: Add zod validation here?
    // Check the request is came from bank and use webhook secret here.

    const paymentInformation: {
        token: string;
        userId: string;
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };

    try {
        await db.$transaction([
            db.balance.update({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        // You can also get this from your DB
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            db.onRampTransaction.update({
                where: {
                    token: paymentInformation.token
                }, 
                data: {
                    status: "Success",
                }
            })
        ]);

        res.json({
            message: "Captured"
        })
    } catch(e) {
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }


    /*
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };
    // Update balance in db, add txn
    await db.balance.update({
        where: {
            userId: paymentInformation.userId
        },
        data: {
            amount: {
                increment: paymentInformation.amount
            }
        }
    })

    await db.onRampTransaction.update({
        where: {
            token: paymentInformation.token
        },
        data: {
            status: 'Success'
        }
    })

    // In this case the bank will know that you have recieved the money.
    res.status(200).json({
        message: 'captured'
    })


    In below case if you response with status 411 or 400 series.
    Then the bank will know that there is a problem with your app and they will refund back to the user.
    res.status(411).json({
        message: 'captured'
    })
   */
})