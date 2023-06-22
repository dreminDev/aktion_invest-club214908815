const { handleKeksikDeposit } = require("../../../internal/domain/user/service/service");

require("dotenv").config();

const KEKSIK_VERIFICATION_CODE = process.env.KEKSIK_VERIFICATION_CODE;



module.exports = async (req, res) => {
    try {
        if (req.body.type === "confirmation") {
            return req.send(
                JSON.stringify({ status: "ok", code: KEKSIK_VERIFICATION_CODE })
            );
        };

        res.send(
            JSON.stringify({ status: "ok" })
        );

        const { user, amount } = req.body.donate;

        const validatedData = {
            userId: user,
            amount: amount,
        };

        handleKeksikDeposit(validatedData)

    } catch (err) {
        res.send(JSON.stringify({ status: err }));
    };
};