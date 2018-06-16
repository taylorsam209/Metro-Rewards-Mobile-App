import React, { Component } from 'react';
import axios from 'axios';
import { View, Text, ScrollView, Alert } from 'react-native';
import { GrayBackground, InnerWrapper } from "../../../common/StyledViews";
import { HalfButtonPush, HalfButtonText, TwoButtonContainer } from "../../../common/StyledButtons";
import { SignUpInput } from "../../../common/Inputs";
import InputHeader from "../../../SignUp/InputHeader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import NextButton from '../../../common/NextButton';
import { connect } from 'react-redux';
import { updateUser, getUserInfo } from '../../../../ducks/reducer';
import { BASEURL } from '../../../../secrets';

class UpdateUser extends Component {

  state = {
    id: this.props.user.userinfo[0].User_Id,
    name: this.props.user.userinfo[0].Name,
    email: this.props.user.userinfo[0].Email,
    phone: this.props.user.userinfo[0].Phone,
    birthday: this.props.user.userinfo[0].Birthday.split('-').concat(this.props.user.userinfo[0].Birthday.split('-').shift().split()).splice(1).join('/')
  }

  checkEmailExist() {
    const { email } = this.state;
    console.log("checking email +")
    if (email !== this.props.user.userinfo[0].Email) {
      console.log("running axios +")
      axios.get(`${BASEURL}/api/checkemail/${email.toString().toLowerCase()}`)
        .then(res => {
          console.log("+ axios returned:", res.data)
          if (res.data) {
            Alert.alert("Email already used.", "Please choose another email.")
            this.setState({ email: this.props.user.userinfo[0].Email })
          }
        }).catch(err => console.log(err));
    }
  }

  validatePhone(phone) {
    return phone.length === 10 ? true : false;
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validateBirthdate(birthdate) {
    const re = new RegExp("^(0[1-9]|1[012])[-/.](0[1-9]|[12][0-9]|3[01])[-/.](19|20)\\d\\d$"); //format is /mm/dd/yyyy
    return re.test(birthdate);
  }

  handleSubmit() {
    const { name, phone, email, birthday } = this.state;
    if (!name || !phone || !email || !birthday) {
      return Alert.alert("Please fill out all required fields.");
    } else if (!this.validateEmail(email)) {
      return Alert.alert("Please enter a valid email.");
    } else if (!this.validatePhone(phone)) {
      return Alert.alert("Please enter a valid phone number in digits only.");
    } else if (!this.validateBirthdate(birthday)) {
      return Alert.alert("Birthday was not a valid format.", "Enter mm/dd/yyyy")
    } else {
      Alert.alert("Update information?", null,
        [{
          text: 'Cancel',
          onPress: () => console.log('Cancel pressed')
        },
        {
          text: 'Confirm',
          onPress: () => this.saveUser()
        }])
    }
  }

  saveUser() {
    const profileInfo = {
      id: this.state.id,
      name: this.state.name,
      email: this.state.email.toString().toLowerCase(),
      phone: this.state.phone,
      birthday: this.state.birthday
    };
    this.props.updateUser(profileInfo)
      .then(resp => {
        console.log('promise of update')
        this.props.getUserInfo(this.props.user.userinfo[0].User_Id)
          .then(resp => {
            console.log("returned")
            Alert.alert("Updated profile!", null, [{ text: 'OK', onPress: () => this.props.navigation.pop() }])
          })
      })
  }

  render() {
    console.log(this.state)
    return (
      <ScrollView style={{ backgroundColor: "#393939", width: "100%" }}>
        <GrayBackground>
          <InnerWrapper style={{ flex: 1, marginTop: 52, marginBottom: 38 }}>
            <KeyboardAwareScrollView
              style={{ backgroundColor: "#393939", width: "100%" }}
              resetScrollToCoords={{ x: 0, y: 0 }}
              enableOnAndroid={true}
              contentContainerStyle={styles.keyboard}
              scrollEnabled={false}
            >
              <View style={styles.titleBorder}>
                <Text style={styles.title}>USER INFORMATION</Text>
              </View>
              <View style={{ width: "100%", marginTop: 15 }}>
                <InputHeader text="Name" />
                <SignUpInput
                  underlineColorAndroid="transparent"
                  value={this.state.name}
                  onChangeText={(val) => this.setState({ name: val })}
                  type="text"
                  autoCorrect={false}
                />
                <InputHeader text="Email" />
                <SignUpInput
                  underlineColorAndroid="transparent"
                  value={this.state.email}
                  onChangeText={(val) => this.setState({ email: val })}
                  type="text"
                  autoCorrect={false}
                  onBlur={() => this.checkEmailExist()}
                />
                <InputHeader text="Phone Number" />
                <SignUpInput
                  underlineColorAndroid="transparent"
                  value={this.state.phone}
                  onChangeText={(val) => this.setState({ phone: val })}
                  type="text"
                  autoCorrect={false}
                />
                <InputHeader text="Birthday" />
                <SignUpInput
                  underlineColorAndroid="transparent"
                  value={this.state.birthday}
                  onChangeText={(val) => this.setState({ birthday: val })}
                  type="text"
                  autoCorrect={false}
                />
              </View>
            </KeyboardAwareScrollView>
            <TwoButtonContainer style={{ marginTop: 40 }}>
              <HalfButtonPush
                onPress={() => this.props.navigation.pop()}
              >
                <HalfButtonText>Cancel</HalfButtonText>
              </HalfButtonPush>
              <NextButton onPress={() => { this.handleSubmit() }} >
                Update
            </NextButton>
            </TwoButtonContainer>
          </InnerWrapper>
        </GrayBackground>
      </ScrollView>
    )
  }
}

const styles = {
  detailWrapper: {
    width: "100%",
    height: "50%",
    marginTop: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 5
  },
  titleView: {
    width: "100%"
  },
  titleBorder: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "white",
    marginRight: 5,
    paddingRight: 5
  },
  title: {
    color: "#00A863",
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 5,
    marginLeft: 10,
    fontSize: 17
  },
  shippingWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  innerWrapper: {
    width: "95%",
    borderBottomWidth: 1,
    borderBottomColor: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10
  },
  innerWrapper2: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginLeft: 25
  },
  editView: {
    flexWrap: "nowrap",
    display: "flex",
    flexDirection: "row"
  },
  keyText: {
    color: "white",
  },
  keyText2: {
    color: "white",
    marginLeft: 20
  },
  buttonText: {
    color: "#00A863"
  }
};

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { updateUser, getUserInfo })(UpdateUser);