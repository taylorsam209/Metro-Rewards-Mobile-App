const axios = require('axios');

module.exports = {

    getAllUsers: (req, res) => {
      const db = req.app.get('db');
      db.admin.get_all_users()
        .then(users => res.status(200).send(users))
        .catch(() => res.status(500).send());
    },
    getAllAdmins: (req, res) => {
      const db = req.app.get('db');
      db.admin.get_all_admins()
        .then(admins => res.status(200).send(admins))
        .catch(() => res.status(500).send());
    },
    getAllCoupons: (req, res) => {
      const db = req.app.get('db');
      db.admin.get_all_coupons()
        .then(coupons => res.status(200).send(coupons))
        .catch(() => res.status(500).send());
    },
    getDummyData: (req, res) => {
        const db = req.app.get('db');
        const { params } = req;
        console.log('hitting server [getRimasDummyData]')
        db.admin.get_dummydata([params.control_number])
        .then(data => {
            let pointVal = data[0].tier_level * parseInt(data[0].transaction_total.split('$').join(''))
            let body = {
                "user_id": data[0].loyalty_id,
                "points": pointVal
            }
            axios.put(`${process.env.BASEURL}/api/user/assign/points`, body)
            .then(pointInfo =>{
                let allData = [
                    pointInfo.data[0],
                    {
                        "points": body.points
                    }
                ]
                res.status(200).send(allData)
            })
            .catch((err) => res.status(500).send(err));
        }).catch((err) => res.status(500).send(console.log('err:',err)));
    },
    
    
    assignPoints: (req, res) => {
        const db = req.app.get('db');
        console.log('hitting server [getRimasDummyData]')
        db.admin.assign_points([req.body.user_id, req.body.points])
        .then(pointData => res.status(200).send(pointData))
        .catch(() => res.status(500).send());
    },
    getNewUserCount: (req, res) => {
      const db = req.app.get('db');
      db.admin.chart_data.new_users_count()
        .then(users => res.status(200).send(users))
        .catch(() => res.status(500).send());
    },
    scanCoupon: (req, res) => {
        const db = req.app.get('db');
        const { params } = req;
        db.admin.getCoupon([params.userId,params.couponId])
        .then(user => {res.status(200).send(user[0])})
        .catch(() => res.status(500).send());
      },
      updateRole: (req, res) => {
          const db = req.app.get('db');
          const { user_id, user_role } = req.body;
          db.admin.update_roll([user_id, user_role])
          .then(admin => res.status(200).send(admin))
          .catch(() => res.status(500).send());
      }
};
