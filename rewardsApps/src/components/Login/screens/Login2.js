import React, { Component } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert, ImageBackground, Image, ActivityIndicator} from "react-native";
import { withNavigation } from "react-navigation";
import background from "../../../assets/background.png";
import redwood from "../../../assets/redwood.png";
import LoginB from '../../common/LoginB';
import { setUserInfo } from '../../../ducks/reducer';
import { connect } from 'react-redux';

class Login2 extends Component {
  state = {
    username: "",
    password: "",
    loading: false,
    token: null,
  };

  login() {
    this.setState({ loading: true }, () => {
      let userInfo = Object.assign({}, this.state);
      this.props.setUserInfo(userInfo)
        .then(resp => {
          console.log("response", resp)
          this.setState({ loading: false }, () => {
            return resp.value ? this.props.navigation.navigate("Home") : Alert.alert("Incorrect Email or Password");
          })
        })
    })
  }

  handleButtonRender() {
    return !this.state.loading ? <LoginB onPress={() => this.login()}>Log In</LoginB> : <ActivityIndicator style={{ marginTop: 20 }} size='large' />
  }

  render() {
    console.log(this.state);
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={{ width: "auto", height: "100%" }}
          source={background}
          resizeMode='cover'
        >
          <View style={styles.MainWrapper}>
            <Image style={styles.logo} source={redwood} />
            <TextInput
              underlineColorAndroid="transparent"
              placeholder="email"
              style={styles.loginInput}
              type="text"
              autoCapitalize={"none"}
              placeholderTextColor="white"
              value={this.state.username}
              onChangeText={(val) => this.setState({ username: val })}
            />
            <TextInput
              underlineColorAndroid="transparent"
              secureTextEntry={true}
              placeholder="password"
              style={styles.loginInput}
              type="text"
              autoCapitalize={"none"}
              placeholderTextColor="white"
              value={this.state.password}
              onChangeText={(val) => this.setState({ password: val })}
            />
            {this.handleButtonRender()}
          </View>
          <View style={styles.bottomTextView}>
            <Text style={styles.bottomText}>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("SignUpForm")}>
              <Text
                style={styles.bottomTextBlue}
              >
                Sign up!
                </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = {
  MainWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "80%",
    marginBottom: 50
  },
  loginInput: {
    marginTop: 10,
    height: 45,
    alignSelf: "stretch",
    width: "90%",
    backgroundColor: "#3c3c3d",
    opacity: .8,
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
  logo: {
    marginBottom: 30
  },
  bottomTextView: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 20
  },
  bottomText: {
    fontSize: 12,
    color: "white"
  },
  bottomTextBlue: {
    fontSize: 12,
    color: "#2e6fce",
    marginLeft: 2
  }
};

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { setUserInfo })(withNavigation(Login2));
