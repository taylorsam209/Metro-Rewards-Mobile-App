import React from "react";
import { Image, Button, View } from "react-native";
import { StackNavigator } from "react-navigation";
import Coupons from "../../components/Tabs/Coupons/screens/Coupons";
import CpnRedeem from "../../components/Tabs/Coupons/screens/CpnRedeem";
import CpnModal from "../../components/Tabs/Coupons/CpnModal";
import CouponNotRedeemed from "../../components/Tabs/Coupons/CouponNotRedeemed";

export const CouponsStack = StackNavigator(
  {
    Coupons: {
      screen: Coupons,
      navigationOptions:({navigation})=> {
        return {
          title: "Coupons",
          //  headerLeft: (
          //   <Button
          //   onPress={() => navigation.navigate("Coupons")}
          //   title={"<"}
          //   color="white"
          //   fontSize={20}
          //   titleStyle={{ fontSize: 30, fontWeight: '900' }}
          // />
          // ),
          // headerLeft: null,
          // tabBarLabel: "Coupons",
          // tabBarIcon: ({ tintColor }) => <Image source={couponLogo} />
        };
      }
    },
    CpnRedeem: {
      screen: CpnRedeem,
       },
     CouponNotRedeemed:{
       screen: CouponNotRedeemed
     },
      CpnModal: {
       screen:CpnModal
     },
  },
  // { 
  //   mode: 'modal'
  // },
  {
    initialRouteName: "Coupons",
    /* The header config from HomeScreen is now here */
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#2e6fce"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: 'center',
        alignSelf: 'center',
        flex: 1
      },
    },
  });
