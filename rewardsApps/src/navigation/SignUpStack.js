import React from "react";
// import { Image, Button } from "react-native";
import { StackNavigator } from "react-navigation";
import SignUpForm from '../components/SignUp/screens/SignUpForm';
import Onboard1 from '../components/SignUp/screens/Onboard1';
import Onboard2 from '../components/SignUp/screens/Onboard2';
import Onboard3 from '../components/SignUp/screens/Onboard3';
import Onboard4 from '../components/SignUp/screens/Onboard4';


export const SignUpStack = StackNavigator(
  {
    SignUpForm: {
      screen: SignUpForm,
      navigationOptions: {
        headerLeft: null,
        gesturesEnabled: false,
      }
    },
    Onboard1: {
      screen: Onboard1,
      navigationOptions: {
        gesturesEnabled: false,
        swipeEnabled: false
    }

    },
    Onboard2: {
        screen: Onboard2,
    },
    Onboard3: {
        screen: Onboard3,
    },
    Onboard4: {
        screen: Onboard4,
      }
      
  }, { headerMode: 'none' }
)