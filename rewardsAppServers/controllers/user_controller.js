module.exports = {

  getUser: (req, res) => {
    const db = req.app.get('db');
    const { params } = req;
    db.users.getUser([params.id])
      .then(user => res.status(200).send(user[0]))
      .catch(() => res.status(500).send());
  },
  addPreferedCommodity: (req, res) => {
    const db = req.app.get('db');
    // var { user_id, commodity_id1, commodity_id2, commodity_id3 } = req.body;
    console.log("HEREHERE!",req.body.user_id, req.body.commodity_id1,req.body.commodity_id2,req.body.commodity_id3)
    console.log("req!",req.body)
    db.users.add_prefered_commodity([req.body.user_id, req.body.commodity_id1,req.body.commodity_id2,req.body.commodity_id3])
    
    .then(user => res.status(200).send(user[0]))
    .catch((err) => res.status(500).send(console.log('error:', err)));
  }, 
  validateCoupon: (req, res) => {
    const db = req.app.get('db');
    const { params } = req;
    db.users.getCoupon([params.userId,params.couponId])
    .then(user => {res.status(200).send(user[0])})
    .catch(() => res.status(500).send());
  },
  updateCoupon: (req, res) => {
    const db = req.app.get('db');
    db.users.redeem_coupon([ req.body.user_id, req.body.coupon_id])
    .then(user => res.status(200).send(user[0]))
    .catch((err) => res.status(500).send(console.log('error:', err)));
    
  },
  updateCouponExpireDate: (req, res) => {
    console.log('running in controller')
    const db = req.app.get('db');
    db.users.update_coupon_expire_date([])
    .then(coupon => res.status(200).send(console.log('finished updating expiration date', coupon)))
    .catch((err) => res.status(500).send(console.log('error:', err)));
    
  },
  getCommodities: (req, res) => {
    const db = req.app.get('db');
    db.users.get_commodities()
      .then(commodities => res.status(200).send(commodities))
      .catch(() => res.status(500).send());
  },
  editProfile: (req, res) => {
    const db = req.app.get('db');
    const {id, name, email, phone, birthday} = req.body;
  db.users.edit_profile(id, name, email, phone, birthday)
  .then(user => res.status(200).send("User update successful"))
  .catch(err => res.status(500).send(err))
  },
  updateShippingAddress: (req, res) => {
    const db = req.app.get('db');
    const {id, address1, address2, city, state, zip, addressType} = req.body;
    db.users.update_address(id, address1, address2, city, state, zip, addressType)
    .then(user => res.status(200).send("Address update successful"))
    .catch(err => res.status(500).send(err))
  }
};