import React, { Component } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Switch, Alert } from "react-native";
import LogoutB from '../../../common/LogoutB';
import arrow from "../../../../assets/arrow.png";
import settingsBackground from "../../../../assets/settingsBackground.png";
import editIcon from "../../../../assets/editIcon.png";
import { connect } from 'react-redux';
import { logOut } from '../../../../ducks/reducer';

class Settings extends Component {

  state = {
    loading: false
  }

  photoAlert() {
    Alert.alert(
      'Edit Profile Photo',
      'Select Method',
      [
        {text: 'Camera Roll', onPress: () => this.props.navigation.navigate('CameraRollPics')},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Take Photo', onPress: () => this.props.navigation.navigate('Camera')},
      ],
      { cancelable: false }
    )
  }

  render() {
    console.log(this.props.user.userinfo[0])
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const newDate = new Date(this.props.user.userinfo[0].Birthday.replace(/-/gi, '/').slice(0, 10).split('-').join(',')).toLocaleDateString('en-us', options)
    return (
      <ScrollView
        style={{
          width: "100%",
          height: "100%",
          flex: 1,
          backgroundColor: "#393939"
        }}
        contentContainerStyle={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.activityWrapper}>
          <Image style={{ width: '100%', height: 240 }} source={settingsBackground} />
          <View style={styles.profilePicWrapper} >
                <View style={{position: 'relative', height: 80, width: 80,}} >  
                  <TouchableOpacity style={{
                  width: 40, 
                  height: 40, 
                  top: 50, 
                  left: 43, 
                  borderRadius: 20,
                  position: 'absolute',
                  zIndex: 5
                  }}  onPress={() => this.photoAlert()} >
                  <Image source={editIcon} />
                  </TouchableOpacity>
                <View style={styles.profilePicCircle} >
                    {/* <Image source={chandler} /> */}
                {/* <TouchableOpacity  onPress={() => this.photoAlert()} > */}
                    {/* <Image source={editIcon}
                    
                    style={{ flex: 1, width: 40, height: 40, position: 'absolute', top: -29, right: -15, overlayColor: '#393939'}}
                     /> */}
                {/* </TouchableOpacity> */}
                </View>
                </View>
                <View style={{
                  width: 'auto',
                  position: 'relative',
                  flexDirection: 'row',
                  alignItems: 'stretch',
                }} >
                    <Text style={{color: 'white', fontSize: 30, marginTop: 10, fontWeight: '300'}} >
                        {this.props.user.userinfo[0].Name}
                    </Text>
                </View>

          </View>
          <View style={styles.detailWrapper}>
            <View style={styles.titleView}>
              <View style={styles.titleBorder}>
                <Text style={styles.title}>USER INFORMATION</Text>
                <TouchableOpacity style={{ marginLeft: 5 }} onPress={() => this.props.navigation.navigate('UpdateUser')} >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.shippingWrapper}>
                <View style={styles.innerWrapper}>
                  <Text style={styles.keyText}>Email</Text>
                  <View style={styles.editView}>
                    <Text style={styles.valueText}>{this.props.user.userinfo[0].Email}</Text>
                  </View>
                </View>

                <View style={styles.innerWrapper}>
                  <Text style={styles.keyText}>Mobile Number</Text>
                  <Text style={styles.valueText}>{this.props.user.userinfo[0].Phone}</Text>
                </View>

                <View style={styles.innerWrapper}>
                  <View>
                    <Text style={styles.keyText}>Birthday</Text>
                    <Text style={styles.smallText}>
                      We’ll send you special gifts for your birthday
                    </Text>
                  </View>
                  <Text style={styles.valueText}>{newDate}</Text>
                </View>

                <TouchableOpacity
                  style={styles.innerWrapper}
                  onPress={() => this.props.navigation.navigate("ReferAFriend")}>
                  <View>
                    <Text style={styles.keyText}>Refer A Friend</Text>
                    <Text style={styles.smallText}>
                      Refer a friend to earn an extra bonus!
                    </Text>
                  </View>
                  <Image source={arrow} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.innerWrapper}
                  onPress={() => this.props.navigation.navigate("ChangePassword")}>
                  <View>
                    <Text style={styles.keyText}>Change Password</Text>
                  </View>
                  <Image source={arrow} />
                </TouchableOpacity>

              </View>
            </View>
          </View>

          <View style={styles.titleView2}>
            <View style={styles.titleBorder}>
              <Text style={styles.title}>SETTINGS</Text>
            </View>
            <View style={styles.shippingWrapper}>

              <View style={styles.innerWrapper}>
                <View>
                  <Text style={styles.keyText}>Account Alerts</Text>
                  <Text style={styles.smallText}>
                    Recieve Notifications About Coupons, Exclusive Offers, & More
                    </Text>
                </View>
                <Switch
                  value={true} />
              </View>


              <TouchableOpacity
                style={styles.innerWrapper}
                onPress={() => this.props.navigation.navigate("CouponPreferences")}>
                <View>
                  <Text style={styles.keyText}>Coupon Preferences</Text>
                  <Text style={styles.smallText}>
                    Update which metals you recycle the most
                  </Text>
                </View>
                <Image source={arrow} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.innerWrapper}
                onPress={() =>
                  this.props.navigation.navigate("ShippingAddress")}>
                <View>
                  <Text style={styles.keyText}>Shipping Address</Text>
                  <Text style={styles.smallText}>
                    Address we use to send your redeemed rewards
                  </Text>
                </View>
                <Image source={arrow} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.innerWrapper}
                onPress={() => this.props.navigation.navigate("About")}>
                <View>
                  <Text style={styles.keyText}>About</Text>
                  <Text style={styles.smallText}>A little info about us</Text>
                </View>
                <Image source={arrow} />
              </TouchableOpacity>

            </View>
          </View>
          <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 30, width: '100%' }}>
            <LogoutB onPress={() => {
              this.props.logOut,
                this.props.navigation.navigate("Login")
            }}>Sign Off</LogoutB>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  activityWrapper: {
    width: "100%",
    height: "auto",
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20
  },
  profilePicWrapper: {
    position: 'absolute',
    width: '100%',
    top: 60,
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  profilePicCircle: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderColor: 'white',
    borderWidth: 2,
    position: 'relative',
  },
  detailWrapper: {
    width: "100%",
    height: "auto",
    marginTop: 25,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 5
  },
  titleView: {
    width: "100%"
  },
  titleView2: {
    width: "100%",
    marginTop: 25
  },
  titleBorder: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "white",
    marginRight: 5,
    paddingRight: 5,
    display: "flex",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5
  },
  title: {
    color: "#00A863",
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 5,
    fontSize: 17
  },
  shippingWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  innerWrapper: {
    width: "98%",
    borderBottomWidth: 1,
    borderBottomColor: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10
  },
  editView: {
    flexWrap: "nowrap",
    display: "flex",
    flexDirection: "row"
  },
  keyText: {
    color: "white",
    // fontWeight: "700"
  },
  valueText: {
    color: "white"
  },
  buttonText: {
    color: "#00A863"
  },
  smallText: {
    color: "white",
    fontSize: 9
  }
};

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { logOut })(Settings);
