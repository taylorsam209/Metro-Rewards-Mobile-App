import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { GrayBackground, InnerWrapper } from '../../../common/StyledViews';
import redwood2 from "../../../../assets/redwood2.png";
import { HalfButtonPush, HalfButtonText, TwoButtonContainer } from "../../../common/StyledButtons";
import MetalPicker from '../../../SignUp/MetalPicker';
import NextButton from '../../../common/NextButton';
import { saveUsersCommodities } from '../../../../ducks/reducer.js';
import { connect } from 'react-redux';


class CouponPreferences extends Component {

  savePreferedCommodities() {
    console.log('sent to redux')
    let selected = this.props.commodities
    const body = {
      "user_id": this.props.user.userinfo[0].User_Id,
      "commodity_id1": selected[0] === 0 ? 0 : !selected[0] ? 0 : selected[0],
      "commodity_id2": selected[1] === 0 ? 0 : !selected[1] ? 0 : selected[1],
      "commodity_id3": selected[2] === 0 ? 0 : !selected[2] ? 0 : selected[2]
    }
    console.log('USER_ID:', this.props.user.userinfo[0].user_id, )
    this.props.saveUsersCommodities(body).then(_ => {
      console.log('navigating')
      this.props.navigation.pop();
    })
  }

  render() {
    return (
      <GrayBackground>
        <InnerWrapper>
          <View style={styles.imageWrapper}>
            <Image source={redwood2} />
          </View>
          <Text style={styles.titleText}>Please Choose 3 Metals You Recyle The Most</Text>
          <MetalPicker />


          <TwoButtonContainer>
            <HalfButtonPush
              onPress={() => this.props.navigation.pop()}
            >
              <HalfButtonText >Cancel</HalfButtonText>
            </HalfButtonPush>
            <NextButton onPress={() => this.savePreferedCommodities()} >
              Update
              </NextButton>
          </TwoButtonContainer>
        </InnerWrapper>
      </GrayBackground>
    );
  }
}

const styles = {
  imageWrapper: {
    width: "80%",
    display: "flex",
    alignItems: "center"
  },
  loginInput: {
    marginTop: 10,
    height: 45,
    alignSelf: "stretch",
    width: "90%",
    backgroundColor: "#3c3c3d",
    opacity: 0.8,
    borderRadius: 5,
    borderWidth: 1,
    overflow: "hidden",
    borderColor: "white",
    color: "white",
    opacity: 0.8,
    fontSize: 14,
    padding: 10,
    alignSelf: "center"
  },
  titleText: {
    fontSize: 20,
    color: 'white',
    // alignItems: "center",
    // alignSelf: 'center',
    textAlign: 'center',
    width: '80%'
  }
};

function mapStateToProps(state) {
  return {
    user: state.user,
    commodities: state.commodities,
    updateUsersCommStatus: state.updateUsersCommStatus
  }
}


export default connect(mapStateToProps, { saveUsersCommodities })(CouponPreferences);