import React from "react";
import { Image, Button, View } from "react-native";
import { StackNavigator } from "react-navigation";
import Settings from "../../components/Tabs/Settings/screens/Settings";
import ChangePassword from "../../components/Tabs/Settings/screens/ChangePassword";
import CouponPreferences from "../../components/Tabs/Settings/screens/CouponPreferences";
import About from "../../components/Tabs/Settings/screens/About";
import ReferAFriend from "../../components/Tabs/Settings/screens/ReferAFriend";
import ShippingAddress from "../../components/Tabs/Settings/screens/ShippingAddress";
import UpdateUser from "../../components/Tabs/Settings/screens/UpdateUser";
import Camera from "../../components/Tabs/Settings/screens/Camera";
import CameraRollPics from "../../components/Tabs/Settings/screens/CameraRollPics";


export const SettingsStack = StackNavigator(
  {
    Settings: {
      screen: Settings,
      navigationOptions: {
        title: "Settings",
        headerLeft: null,
      }
    },
    ChangePassword: {
      screen: ChangePassword,
      navigationOptions: ({ navigation }) => {
        return {
          title: "Change Password",
          // headerLeft: (
          //   <Button
          //     onPress={() => navigation.navigate("Settings")}
          //     title={"<"}
          //     color="white"
          //   />
          // ),
          headerRight: <View />,
        };
      }
    },
    ShippingAddress: {
      screen: ShippingAddress,
      navigationOptions: ({ navigation }) => {
        return {
          title: "Shipping Address",
          // headerLeft: (
          //   <Button
          //     onPress={() => navigation.navigate("Settings")}
          //     title={"<"}
          //     color="white"
          //   />
          // ),
          headerRight: <View />,
        };
      }
    },
    CouponPreferences: {
      screen: CouponPreferences,
      navigationOptions: ({ navigation }) => {
        return {
          title: "Coupon Preferences",
          // headerLeft: (
          //   <Button
          //     onPress={() => navigation.navigate("Settings")}
          //     title={"<"}
          //     color="white"
          //   />
          // ),
          headerRight: <View />
        };
      }
    },
    ReferAFriend: {
      screen: ReferAFriend,
      navigationOptions: ({ navigation }) => {
        return {
          title: "Refer a Friend",
          // headerLeft: (
          //   <Button
          //     onPress={() => navigation.navigate("Settings")}
          //     title={"<"}
          //     color="white"
          //   />
          // ),
          headerRight: <View />,
        };
      }
    },
    About: {
      screen: About,
      navigationOptions: ({ navigation }) => {
        return {
          title: "About",
          // headerLeft: (
          //   <Button
          //     onPress={() => navigation.navigate("Settings")}
          //     title={"<"}
          //     color="white"
          //   />
          // ),
          headerRight: <View />,
        };
      }
    },
    Camera: {
      screen: Camera,
      navigationOptions: ({ navigation }) => {
        return {
          title: "Take a Photo",
          headerRight: <View />,
        };
      }
    },
    CameraRollPics: {
      screen: CameraRollPics,
      navigationOptions: ({ navigation }) => {
        return {
          title: "Select Photo",
          headerRight: <View />,
        };
      }
    },
    UpdateUser: {
      screen: UpdateUser,
      navigationOptions: ({ navigation }) => {
        return {
          title: "Edit User Information",
          headerRight: <View />,
        };
      }
    },
  },
  {
    initialRouteName: "Settings",
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
      }
    }
  }
);
