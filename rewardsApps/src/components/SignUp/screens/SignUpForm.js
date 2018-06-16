import React, { Component } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from "react-native";
import axios from 'axios';
import { GrayBackground, InnerWrapper } from "../../common/StyledViews";
import redwood from "../../../assets/redwood.png";
import { HalfButtonPush, HalfButtonText, TwoButtonContainer } from "../../common/StyledButtons";
import { SignUpInput } from "../../common/Inputs";
import InputHeader from "../InputHeader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import NextButton from '../../common/NextButton';
import { BASEURL } from '../../../secrets';

class SignUpForm extends Component {
  state = {
    name: "",
    phone: "",
    email: "",
    emailInUse: false,
    password: "",
    confirmPassword: "",
    birthday: "",
    referralCode: ""
  };

  handleEmailBlur() {
      axios.get(`${BASEURL}/api/checkemail/${this.state.email.toString().toLowerCase()}`)
        .then(res => {
          this.setState({ emailInUse: res.data })
        }).catch(err => console.log(err));
  }

  validatePhone(phone) {
    return phone.length === 10 ? true : false;
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validatePassword(password, confirmPassword) {
    return password === confirmPassword ? true : false;
  }

  passwordStrength(pw) {
    const re = new RegExp("(?=.*[0-9])(?=.{6,})"); //password must contain at least 6 characters and at least 1 number
    return re.test(pw);
  }

  validateBirthdate(birthdate) {
    const re = new RegExp("^(0[1-9]|1[012])[-/.](0[1-9]|[12][0-9]|3[01])[-/.](19|20)\\d\\d$"); //format is /mm/dd/yyyy
    return re.test(birthdate);
  }

  handleSubmit() {
    const { name, phone, email, emailInUse, password, confirmPassword, birthday } = this.state;
    if (!name || !phone || !password || !confirmPassword || !birthday) {
      return Alert.alert("Please fill out all required fields.");
    } else if (!this.validatePhone(phone)) {
      return Alert.alert("Please enter a valid phone number in digits only.");
    } else if (!this.validateEmail(email)) {
      return Alert.alert("Please enter a valid email.");
    } else if (emailInUse) {
      return Alert.alert("The email entered is associated with an existing account.");
    } else if (!this.passwordStrength(password)) {
      return Alert.alert("Password must contain at least 6 characters and at least 1 number.");
    } else if (!this.validatePassword(password, confirmPassword)) {
      return Alert.alert("Passwords entered did not match one another.");
    } else if (!this.validateBirthdate(birthday)) {
      return Alert.alert("Birthday was not a valid format.")
    } else {
      this.props.navigation.navigate("Onboard1", { ...this.state });
    }
  }

  render() {
    console.log("state", this.state);
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
              <Image source={redwood} />
              <View style={{ width: "100%", marginTop: 15 }}>
                <InputHeader text="NAME" />
                <SignUpInput
                  underlineColorAndroid="transparent"
                  placeholder="Enter first and last name"
                  type="text"
                  autoCorrect={false}
                  value={this.state.name}
                  onChangeText={(val) => this.setState({ name: val })}
                />
                <InputHeader text="PHONE" />
                <SignUpInput
                  underlineColorAndroid="transparent"
                  placeholder="Enter phone number in digits only"
                  keyboardType="numeric"
                  ref="phone"
                  autoCorrect={false}
                  value={this.state.phone}
                  onChangeText={(val) => this.setState({ phone: val })}
                />
                <InputHeader text="EMAIL" />
                <SignUpInput
                  underlineColorAndroid="transparent"
                  placeholder="Enter your email address"
                  keyboardType={"email-address"}
                  type="text"
                  autoCorrect={false}
                  value={this.state.email}
                  onChangeText={(val) => this.setState({ email: val })}
                  onBlur={() => this.handleEmailBlur()}
                />
                <InputHeader text="CREATE PASSWORD" />
                <SignUpInput
                  underlineColorAndroid="transparent"
                  placeholder="Enter a password"
                  secureTextEntry={true}
                  type="text"
                  autoCorrect={false}
                  value={this.state.password}
                  onChangeText={(val) => this.setState({ password: val })}
                />
                <InputHeader text="CONFIRM PASSWORD" />
                <SignUpInput
                  underlineColorAndroid="transparent"
                  placeholder="Re-enter password"
                  secureTextEntry={true}
                  type="text"
                  autoCorrect={false}
                  value={this.state.confirmPassword}
                  onChangeText={(val) => this.setState({ confirmPassword: val })}
                />
                <View style={styles.birthdayHeader}>
                  <Text style={{ color: "white" }}>BIRTHDAY</Text>
                  <TouchableOpacity>
                    <Text style={{ color: "red" }}>
                      Why do you need my birthday?
                    </Text>
                  </TouchableOpacity>
                </View>
                <SignUpInput
                  underlineColorAndroid="transparent"
                  placeholder="Enter mm/dd/yyyy"
                  type="text"
                  autoCorrect={false}
                  value={this.state.birthday}
                  onChangeText={(val) => this.setState({ birthday: val })}
                />
                <InputHeader text="Referral Code (If applicable)" />
                <SignUpInput
                  underlineColorAndroid="transparent"
                  placeholder="Enter your referral code"
                  type="text"
                  autoCorrect={false}
                  value={this.state.referralCode}
                  onChangeText={(val) => this.setState({ referralCode: val })}
                />
              </View>
            </KeyboardAwareScrollView>
            <TwoButtonContainer style={{ marginTop: 40 }}>
              <HalfButtonPush
                onPress={() => this.props.navigation.navigate("Login")}
              >
                <HalfButtonText>Cancel</HalfButtonText>
              </HalfButtonPush>
              <NextButton onPress={() => this.handleSubmit()} >
                Next
              </NextButton>
            </TwoButtonContainer>
          </InnerWrapper>
        </GrayBackground>
      </ScrollView>
    );
  }
}

const styles = {
  keyboard: {
    width: "100%",
    height: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20
  },
  birthdayHeader: {
    marginTop: 20,
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%"
  }
};

export default SignUpForm;
