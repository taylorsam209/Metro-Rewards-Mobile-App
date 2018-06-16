const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const async = require('async');
const crypto = require('crypto');
const axios = require('axios');

module.exports = {
    registerUser: (req, res, next) => {
        const db = req.app.get('db');
        console.log("Incoming Register Data::", req.body);
        const { username, password, name, birthday, phone, licenseNumber } = req.body;
        db.auth.find_user(username).then(user => {
            if (user[0]) {
                res.status(409).send("Username already exists. Please try again.");
            } else {
                const saltRounds = 10;
                bcrypt.genSalt(saltRounds, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hashPassword) => {
                        bcrypt.genSalt(saltRounds, (err, salt) => {
                            bcrypt.hash(licenseNumber, salt, (err, hashLicense) => {
                                db.auth.create_user(username, hashPassword, name, birthday, phone, hashLicense)
                                    .then(response => {
                                        next();
                                        // res.status(200).send("Successfully created User.");
                                        // axios.post(`${process.env.BASEURL}/login`, { username, password })
                                        //     .then(resp => {
                                        //         res.status(200).send(resp.data)
                                        //     })
                                        //     .catch(error => res.status(500).send(error));
                                    }).catch(error => res.status(500).send(error));
                            })
                        })
                    })
                })
            }
        }).catch(error => res.status(500).send(error));
    },
    registerUser2: (req, res) => {
        const { username, password } = req.body;
        axios.post(`${process.env.BASEURL}/login`, { username, password })
            .then(resp => {
                res.status(200).send(resp.data)
            })
            .catch(error => res.status(500).send(error));
    },
    checkEmail: (req, res) => {
        const db = req.app.get('db');
        const { email } = req.params;
        db.auth.find_user(email).then(user => {
            if (user[0]) {
                res.status(200).send(true);
            } else {
                res.status(200).send(false);
            }
        }).catch(error => res.status(500).send(error));
    },
    forgotPassword: (req, res, next) => {
        const { email } = req.params;
        const db = req.app.get("db");
        async.waterfall([
            function (done) {
                crypto.randomBytes(20, (err, buf) => {
                    const token = buf.toString('hex');
                    done(null, token);
                });
            },
            function (token, done) {
                db.auth.find_user(email).then(user => {
                    if (!user[0]) {
                        console.log('No account with that email address exists.');
                        return res.status(409).send('no email found');
                    }
                    token = `${user[0].user_id}.${token}`;
                    console.log("token", token)
                    const resetPasswordExpires = Date.now() + 3600000;
                    db.auth.update_password_token(email, token, resetPasswordExpires).then(response => {
                        console.log("updating token");
                        done(null, token, user);
                    }).catch(error => res.status(500).send(console.log(error)));
                }).catch(error => res.status(500).send(console.log(error)));
            },
            function (token, user, done) {
                console.log("hit nodemailer function");
                let transporter = nodemailer.createTransport({
                    host: 'box5026.bluehost.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: 'rewards@mynextdev.com',
                        pass: '+QRst]}<YBQmP2'
                    }
                });
                let mailOptions = {
                    to: 'taylorsam209@gmail.com', //should be user[0].email in production
                    from: 'rewards@mynextdev.com',
                    subject: 'Node.js Password Reset',
                    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                        'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                };
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        return console.log(err);
                    }
                    console.log('Message sent:', info.messageId)
                    res.status(200).send('An e-mail has been sent to ' + user[0].username + ' with further instructions.');
                    done(null, 'done');
                });
            }
        ], function (err, result) {
            console.log('last function', err, result)
            if (err) return next(err);
            res.redirect('/forgot');
        });
    },
    confirmPasswordToken: (req, res) => {
        const db = req.app.get('db');
        const { token } = req.params;
        console.log(token);
        db.auth.find_user_by_token(token).then(user => {
            if (!user[0]) {
                console.log('No account exists.');
                return res.status(500).send('no user found'); //should return user to forgot password screen, need to implement
            }
            else if (Date.now() < user[0].password_refresh_timeout) {
                // continue on.
                res.status(200).send(user[0]); //UI should render the enter new passwords field, need to implement.

            } else {
                console.log("Invalid refresh token or token has expired.", err)
                res.status(500).send("Invalid token or time has expired.") //should return user to forgot password screen, need to implement.
            }
        }).catch(err => res.status(500).send(err));
    },
    confirmPassword: (req, res) => {
        const db = req.app.get('db');
        const { username, password } = req.body;
        db.auth.find_user(username)
            .then(user => {
                bcrypt.compare(password, user[0].password, (err, resp) => {
                    return resp ? res.status(200).send(true) : res.status(200).send(false)
                })
            }).catch(err => res.status(500).send(err))
    },
    changePassword: (req, res) => {
        const db = req.app.get('db');
        const { id, password } = req.body;
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(password, salt, (err, hashPassword) => {
                db.auth.change_password(id, hashPassword)
                    .then(user => res.status(200).send("Password change successful."))
                    .catch(err => res.status(500).send(err))
            })
        })
    },
    nodemailerTest: (req, res) => {
        console.log("hit nodemailer function");
        let transporter = nodemailer.createTransport({
            host: 'box5026.bluehost.com',
            port: 465,
            secure: true,
            auth: {
                user: 'rewards@mynextdev.com',
                pass: '+QRst]}<YBQmP2'
            }
        });
        let mailOptions = {
            to: 'taylorsam209@gmail.com', //should be user[0].email in production
            from: 'rewards@mynextdev.com',
            subject: 'Node.js Password Reset',
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://' + req.headers.host + '/reset/' + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return console.log(err);
            }
            console.log('Message sent:', info.messageId)
            res.status(200).send('An e-mail has been sent to ' + ' with further instructions.');
        });
    }
};