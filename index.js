const express = require('express');
const { connexioDatabse } = require('./bd/sequelize');
const cors = require('cors');
const paiement = require('./middleware/paiement');
const app = express()
const port = process.env.PORT || 3000;

app.use(express.static('./public'))
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors())

// connexion to database;
connexioDatabse()
app.get('/test', (req, res) =>{
    res.json("Couture app is running perfectly")
})
app.listen(port, () => {
    console.log(`Couture app is running perfectly: ${port}`);
    console.log(`path: ${__dirname}`);
});
//  dressMaker route
require('./routes/dressMaker/create')(app)
require('./routes/dressMaker/edit')(app)

// clients routes
require('./routes/client/create')(app)
require('./routes/client/getAll')(app)
require('./routes/client/getOne')(app)
require('./routes/client/delete')(app)

// commande routes

require('./routes/dress/create')(app);
require('./routes/dress/update')(app);
require('./routes/dress/getAll')(app);
require('./routes/dress/getOne')(app);
require('./routes/dress/payement')(app);

// login 
require('./routes/login/authification')(app);
require('./routes/login/forgot_pw')(app);
require('./routes/login/new_pw')(app);

// catalogue
require('./routes/catalogue/create')(app);
require('./routes/catalogue/getAll')(app);
require('./routes/catalogue/delete')(app);

// dressTYpe

require('./routes/dresstype/create')(app);
// require('./routes/dresstype/')(app);


// custom dressTYpe

require('./routes/dressCustomType/create')(app);
require('./routes/dressCustomType/update')(app);
require('./routes/dressCustomType/getAll')(app);
require('./routes/dressCustomType/delete')(app);

// subscription type

require('./routes/subscription_type/create')(app);
require('./routes/subscription_type/update')(app);
require('./routes/subscription_type/delete')(app);
require('./routes/subscription_type/getAll')(app);

// subscriptions

require('./routes/suscription/create')(app);
require('./routes/suscription/getAll')(app);
require('./routes/suscription/get_all_by_id')(app);
require('./routes/suscription/findOne')(app);
require('./routes/suscription/subscribe')(app);
