import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { GrayBackground, InnerWrapper } from "../../common/StyledViews";
import redwood2 from "../../../assets/redwood2.png";
import plus from "../../../assets/plus.png";
import { TwoButtonContainer } from "../../common/StyledButtons";
import NextButton from '../../common/NextButton';


class Onboard2 extends Component {
  render() {
    return (
      <GrayBackground>
        <InnerWrapper>
          <View style={styles.imageWrapper}><Image source={redwood2} /></View>

          <View><Text style={styles.hiText} >Hi, {this.props.navigation.state.params.name}!</Text></View>

          <View style={{ display: 'none' }} >
            <View style={styles.profileView} ><Image source={plus} /></View>
            <Text style={styles.addPicText} >Add a profile picture</Text>
          </View>

          <View style={{ width: '75%' }} >
            <Text style={styles.metalText} >Tell us what metals you recycle the most and we will send you cool offers!</Text>
          </View>

          <TwoButtonContainer>
            <NextButton onPress={() => this.props.navigation.navigate("Onboard3")} >Start</NextButton>
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
  hiText: {
    color: 'white',
    fontSize: 40,
    marginTop: -50,
  },
  profileView: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderColor: 'white',
    borderWidth: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -40,
  },
  addPicText: {
    alignSelf: 'center',
    color: '#8b8b8b',
    marginTop: 7,
  },
  metalText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
};

export default Onboard2;
