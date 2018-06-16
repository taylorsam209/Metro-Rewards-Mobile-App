// --------------- IMPORTS --------------- //
require('dotenv').config();
const express = require('express')
    , cors = require('cors')
    , bodyParser = require('body-parser')
    , massive = require('massive')
    , axios = require('axios')
    , passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy
    , Auth0Strategy = require('passport-auth0')
    , session = require('express-session')
    , bcrypt = require('bcryptjs')
    , schedule = require('node-schedule');

var j = schedule.scheduleJob(' 0    0    0    1    *    *', function () {
    console.log('Time based trigger hit!')
    axios.put(`${process.env.BASEURL}/api/coupon/expire/update`)
        .then(console.log('done')
        )
});
//---------------Controllers----------------//
const user_controller = require('./controllers/user_controller.js');
const authController = require('./controllers/authController');
const admin_controller = require('./controllers/admin_controller');

// --------------- SETUP APP --------------- //
const app = express();
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../build`));
app.use(cors());

app.use(session({
    secret: 'oifdjiuwjnoniuenfrinoroijoj494jkfr4o2j',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//----------User Authentication -------------//
passport.use(new LocalStrategy(
    function (username, password, done) {
        const db = app.get("db");
        db.auth.find_user(username).then(user => {
            if (user[0]) {
                bcrypt.compare(password, user[0].password, (err, res) => {
                    return res ? done(null, user[0]) : done(null, false);
                })
            } else {
                console.log("Username not found.");
                return done(null, false);
            }
        }).catch(err => res.status(500).send(err));
    }
));

//---------------DEFAULT Auth0 Logic that should work with identities object-----------/
//-----------Admin Authentication-----------//
// passport.use(new Auth0Strategy({
//     domain: process.env.AUTH_DOMAIN,
//     clientID: process.env.AUTH_CLIENT_ID,
//     clientSecret: process.env.AUTH_CLIENT_SECRET,
//     callbackURL: process.env.CALLBACK_URL
// }, function (accessToken, refreshToken, extraParams, profile, done) {
//     const db = app.get('db');
//     console.log(profile)
//     db.admin.find_admin([profile.identities[0].user_id]).then(admin => {
//         console.log(admin)
//         if (admin[0]) {
//             console.log('admin found')
//             return done(null, admin[0])
//         } else {
//             console.log("creating a admin")
//             const admin = profile._json;
//             db.admin.create_admin([admin.name, admin.email, admin.picture, admin.identities[0].user_id])
//                 .then(admin => {
//                     return done(null, admin[0])
//                 })
//         }
//     })
// }));

//-------------------Strategy that works with no identity object on profile---------------//
passport.use(new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
}, function (accessToken, refreshToken, extraParams, profile, done) {
    const db = app.get('db');
    console.log(profile)
    db.admin.find_admin([profile.user_id]).then(admin => {
        console.log(admin)
        if (admin[0]) {
            console.log('admin found')
            return done(null, admin[0])
        } else {
            console.log("creating a admin")
            const admin = profile._json;
            db.admin.create_admin([admin.name, admin.email, admin.picture, admin.sub])
                .then(admin => {
                    return done(null, admin[0])
                })
        }
    })
}));

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: process.env.SUCCESS_REDIRECT,
    failureRedirect: process.env.FAILURE_REDIRECT
}));
app.get('/auth/me', (req, res) => {
    if (!req.user) {
        return res.status(200).send(false)
    }
    return res.status(200).send(req.user);
})

app.get('/auth/logout', (req, res) => {
    req.logOut();
    res.redirect(302, process.env.SUCCESS_REDIRECT)
})

passport.serializeUser(function (user, done) {
    console.log('serialize user', user)
    const key = {
        id: user.user_id,
        strategy: user.auth_strategy
    }
    done(null, key);
});

passport.deserializeUser(function (key, done) {
    console.log('deserialize user', key)
    const db = app.get('db');
    return key.strategy === "local" ?
        db.auth.find_user_by_id(key.id).then(user => {
            done(null, user);
        }) :
        db.admin.find_admin_by_id(key.id)
            .then(admin => {
                console.log("admin data", admin)
                done(null, admin[0]);
            })
})

// --------------- MASSIVE --------------- //
massive(process.env.CONNECTION_STRING).then(db => {
    console.log("Connected to DB");
    app.set('db', db);
});

// --------------- USER ENDPOINTS --------------- //

// --------------- Authentication--------------- //
app.post('/login', passport.authenticate('local'), (req, res) => {
    const userId = req.user['user_id'];
    axios.get(`${process.env.BASEURL}/api/user/${userId}`)
        .then(resp => {
            res.status(200).send(resp.data)
        }).catch(err => res.status(500).send(err))
});
app.post('/api/user/register', authController.registerUser); // body should include in this order: username, password, name, birthday, phone, referralCode, licenseNumber 
app.post('/api/user/register', authController.registerUser2); //invoked next()
app.get('/api/checkemail/:email', authController.checkEmail);
app.get('/logout', (req, res) => {
    req.logout();
    res.status(200).send("Logged Out");
});
app.put('/forgot/:email', authController.forgotPassword);
app.get('/reset/:token', authController.confirmPasswordToken); //body should include username/email and refreshtoken
app.post('/confirm/password', authController.confirmPassword);
app.put('/edit/password', authController.changePassword)
app.get('/api/nodemail', authController.nodemailerTest);

// --------------- User Info--------------- //
// app.get (`/api/user/activity/:userId`, user_controller. )
// app.post (`/api/user/forgot`, user_controller. )
// app.post (`/api/quote`, order_controller. )
app.get('/api/user/:id', user_controller.getUser); // get all users info along with thier order history and credentials
const companyID = process.env.COMPANY_ID
app.put('/api/user/edit/address', user_controller.updateShippingAddress)
app.put(`/api/user/edit/profile`, user_controller.editProfile)
app.post(`/api/user/commodity`, user_controller.addPreferedCommodity)
app.get(`/api/commodities`, user_controller.getCommodities)
app.get(`/api/coupon/:userId/:couponId`, user_controller.validateCoupon)
app.put(`/api/coupon/redeem`, user_controller.updateCoupon)
app.put(`/api/coupon/expire/update`, user_controller.updateCouponExpireDate)
// app.put (`/api/earn/:userid`, user_controller. )

// --------------- ADMIN ENDPOINTS --------------- //
app.get(`/api/admin/users`, admin_controller.getAllUsers)
app.get(`/api/admin/employees`, admin_controller.getAllAdmins)
app.get(`/api/admin/coupons`, admin_controller.getAllCoupons)
app.get(`/api/rimas/dummydata/:control_number`, admin_controller.getDummyData)
app.put(`/api/user/assign/points`, admin_controller.assignPoints)
app.get ( `/api/admin/coupon/:userId/:couponId`, admin_controller.scanCoupon )
app.put(`/api/admin/employees/`, admin_controller.updateRole)


// --------------- SETUP APP TO LISTEN TO PORT --------------- //
const PORT = 8080; // Deployment Port
app.listen(PORT, () => console.log(`Listening on ${PORT}`));