const { ValidationError, UniqueConstraintError } = require("sequelize");
const { Mdress } = require("../../bd/sequelize");
const { errorServer } = require("../../common/common");
const paiement = require("../../middleware/paiement");

module.exports = (app) => {
    app.put('/api/coutre/payment',paiement, (req, res) => {
        const { clientId, dressMakerId, dressId,payment, solde_cal } = req.body;
        console.log(req.body);
        Mdress.update({paiement: payment, solde_cal}, {where: {cmd_id: dressId, DressMakerId: dressMakerId, ClientId: clientId } }).then(_ => {
            Mdress.findOne({ where: {cmd_id: dressId, DressMakerId: dressMakerId, ClientId: clientId } }).then(dresse => {
                let message = `la commande N°${dresse.cmd_id} a été régler avec succès`
                return res.json({ message, data: dresse })
            })
        }).catch((err) => {
            if (err instanceof ValidationError) {
                return res.json({ message: err.message, data: err })
            }
            if (err instanceof UniqueConstraintError) {
                return res.json({ message: err.message, data: err })

            } else {
                return res.status(401).json('errorServer')

            }
        });
    })
}