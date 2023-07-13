const { handleKeksikDeposit, handleKeksikChangeStatus } = require("../../../internal/domain/user/service/service");

require("dotenv").config();

const KEKSIK_VERIFICATION_CODE = process.env.KEKSIK_VERIFICATION_CODE;



module.exports = async (req, res) => {
    try {
        if (req.body.type == "confirmation") {
            return res.send(
                JSON.stringify({ status: "ok", code: KEKSIK_VERIFICATION_CODE })
            );
        };

        if (req.body.type === "payment_status") {
          await handleKeksikChangeStatus(req.body.id, req.body.status)

          res.send(
            JSON.stringify({ status: "ok" })
          );

          return 
        }

        const { user, amount, id } = req.body.donate;
        
        const validatedData = {
            userId: user,
            amount: amount,
            paymentId: id,
        };

        if (!validatedData.userId || !validatedData.amount) {
            res.status(422);
            return res.send(JSON.stringify({ status: "err",
                error: "one or more parameters were not specified"
            })
            );
        };

        res.send(
            JSON.stringify({ status: "ok" })
        );

        handleKeksikDeposit(validatedData);
    } catch (err) {
        res.send(JSON.stringify({ status: "error" }));
    };
};