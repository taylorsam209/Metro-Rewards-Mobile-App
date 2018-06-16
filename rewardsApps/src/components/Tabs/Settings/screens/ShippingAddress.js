import React, { Component } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { GrayBackground, InnerWrapper } from "../../../common/StyledViews";
import { HalfButtonPush, HalfButtonText, TwoButtonContainer } from "../../../common/StyledButtons";
import { SignUpInput } from "../../../common/Inputs";
import InputHeader from "../../../SignUp/InputHeader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import NextButton from '../../../common/NextButton';
import { Dropdown } from "react-native-material-dropdown";
import {updateAddress, getUserInfo} from '../../../../ducks/reducer';
import {connect} from 'react-redux';

class ShippingAddress extends Component {

  state = {
    id: this.props.user.userinfo[0].User_Id,
    address1: this.props.user.userinfo[0].address_1,
    address2: this.props.user.userinfo[0].address_2,
    city: this.props.user.userinfo[0].city,
    state: this.props.user.userinfo[0].state,
    zip: this.props.user.userinfo[0].zip,
    addressType: this.props.user.userinfo[0].address_type,
  }

  handleSubmit() {
    Alert.alert("Update address?", null,
    [{
      text: 'Cancel',
      onPress: () => console.log('Cancel pressed')
    },
    {
      text: 'Confirm',
      onPress: () => this.saveAddress()
    }])
  }

  saveAddress() {
    this.props.updateAddress(this.state)
    .then(resp => {
      this.props.getUserInfo(this.state.id)
      .then(resp => {
        Alert.alert("Updated address!", null, [{ text: 'OK', onPress: () => this.props.navigation.pop() }])
      })
    })
  }

  render() {
    const addressType = [
      {
        value: "Work"
      },
      {
        value: "Home"
      },
      {
        value: "Other"
      }
    ];

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
              <Text style={styles.title}>SHIPPING ADDRESS</Text>
            </View>
            <View style={{ width: "100%", marginTop: 15 }}>
              <InputHeader text="Address Line 1" />
              <SignUpInput
                underlineColorAndroid="transparent"
                type="text"
                autoCorrect={false}
                onChangeText={(val) => this.setState({address1: val})}
                value={this.state.address1}
              />
              <InputHeader text="Address Line 2" />
              <SignUpInput
                underlineColorAndroid="transparent"
                ref="address2"
                type="text"
                autoCorrect={false}
                onChangeText={(val) => this.setState({address2: val})}
                value={this.state.address2}
              />
              <InputHeader text="City" />
              <SignUpInput
                underlineColorAndroid="transparent"
                type="text"
                autoCorrect={false}
                onChangeText={(val) => this.setState({city: val})}
                value={this.state.city}
              />
              <InputHeader text="State" />
              <SignUpInput
                underlineColorAndroid="transparent"
                type="text"
                autoCorrect={false}
                onChangeText={(val) => this.setState({state: val})}
                value={this.state.state}
              />
              <InputHeader text="Zip" />
              <SignUpInput
                underlineColorAndroid="transparent"
                keyboardType="numeric"
                type="text"
                autoCorrect={false}
                onChangeText={(val) => this.setState({zip: val})}
                value={this.state.zip}
              />
                <View style={{width: '95%' }}>
                  <Dropdown
                  width={100}
                  value={this.props.user.userinfo[0].address_type ? this.props.user.userinfo[0].address_type : "Home"}
                  baseColor='white'
                  textColor='white'
                  selectedItemColor='rgba(0, 0, 0, .87)'
                  label='Address Type'
                  labelFontSize={16}
                  fontSize={14}
                  data={ addressType }
                  containerStyle={{marginLeft: 25, marginTop: 10}}
                  onChangeText={(val) => this.setState({addressType: val})}
                  // inputContainerStyle={{ borderBottomColor: 'transparent' }}
                  />
                </View>

            </View>
          </KeyboardAwareScrollView>
          <TwoButtonContainer style={{ marginTop: 40 }}>
            <HalfButtonPush
              onPress={() => this.props.navigation.pop()}
            >
              <HalfButtonText>Cancel</HalfButtonText>
            </HalfButtonPush>
            <NextButton  onPress={()=> this.handleSubmit()}>
              Update
            </NextButton>
          </TwoButtonContainer>
        </InnerWrapper>
      </GrayBackground>
    </ScrollView>
    );
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

export default connect(mapStateToProps, {updateAddress, getUserInfo})(ShippingAddress);
