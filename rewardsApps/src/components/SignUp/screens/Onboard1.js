import React, { Component } from "react";
import { View, Text, Image, ActivityIndicator, Alert } from "react-native";
import { GrayBackground, InnerWrapper } from "../../common/StyledViews";
import redwood2 from "../../../assets/redwood2.png";
import padlock from "../../../assets/padlock.png";
import { LoginInput } from "../../common/Inputs";
import { HalfButtonPush, HalfButtonText, TwoButtonContainer } from "../../common/StyledButtons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import NextButton from '../../common/NextButton';
import { registerUserInfo } from '../../../ducks/reducer';
import { connect } from 'react-redux';

class Onboard1 extends Component {
  state = {
    licenseNumber: '',
    loading: false
  }

  handleRegisterUser() {
    const { email, password, name, birthday, phone, referralCode } = this.props.navigation.state.params;
    const registerInfo = {
      username: email.toString().toLowerCase(),
      password: password,
      name: name,
      birthday: birthday,
      phone: phone,
      licenseNumber: this.state.licenseNumber
    }
    this.setState({loading: true}, ()=> {
      this.props.registerUserInfo(registerInfo)
        .then(resp => {
          this.setState({ loading: false }, () => {
            console.log(resp.value)
            return resp.value ? this.props.navigation.navigate("Onboard2", { name: this.props.navigation.state.params.name })
             : Alert.alert("Unable to register user, please try again", null, [{ text: 'OK', onPress: () => this.props.navigation.pop() }])
          })
        })
    })
  }

  handleButtonRender() {
    return !this.state.loading ?
      <TwoButtonContainer>
        <HalfButtonPush onPress={() => this.props.navigation.pop()}>
          <HalfButtonText>Cancel</HalfButtonText>
        </HalfButtonPush>
        <NextButton onPress={() => this.handleRegisterUser()} >Next</NextButton>
      </TwoButtonContainer>
      : <ActivityIndicator style={{ marginTop: 20 }} size='large' />
  }

  render() {
    return (
      <GrayBackground>
        <InnerWrapper>
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            style={{ backgroundColor: "#393939" }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.keyboard}
            scrollEnabled={false}
          >
            <View style={styles.imageWrapper}><Image source={redwood2} /></View>

            <View><Image source={padlock} style={{ marginLeft: 40 }} /></View>

            <View style={{ width: "75%" }}>
              <Text style={styles.idDescriptionText}>
                State law requires us to have a valid form of identification on
                file. This can either be a Drivers License Number or government
                issued ID.
              </Text>
              <Text style={styles.idDescriptionText}>Please enter it below</Text>
            </View>

            <View style={{ width: "100%", marginTop: 30 }}>
              <View style={{ width: "90%", alignSelf: "flex-start" }}>
                <Text style={styles.inputTitle}>DL or STATE ISSUED ID #</Text>
              </View>
              <LoginInput
                placeholder="DL or STATE ISSUED ID #"
                placeholderTextColor="white"
                type="text"
                autoCorrect={false}
                style={{ width: 350 }}
                value={this.state.licenseNumber}
                onChangeText={(val) => this.setState({ licenseNumber: val })}
              />
            </View>
          </KeyboardAwareScrollView>
          {this.handleButtonRender()}
        </InnerWrapper>
      </GrayBackground>
    );
  }
}

const styles = {
  keyboard: {
    width: "100%",
    height: "80%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20
  },
  imageWrapper: {
    width: "80%",
    display: "flex",
    alignItems: "center"
  },
  idDescriptionText: {
    color: "white",
    textAlign: "center",
    marginTop: 5,
    fontSize: 14
  },
  inputTitle: {
    color: "white",
    fontSize: 12,
    alignSelf: "flex-start"
  }
};

export default connect(null, { registerUserInfo })(Onboard1);