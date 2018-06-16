import React from "react";
import { View } from "react-native";
import { StackNavigator, HeaderBackButton } from "react-navigation";
import Activity from "../../components/Tabs/Activity/screens/Activity";
import ActivityDetails from "../../components/Tabs/Activity/screens/ActivityDetails";

export const ActivityStack = StackNavigator(
  {
    Activity: {
      screen: Activity,
      navigationOptions: ({ navigation }) => {
        return {
          title: "Activity",
          headerLeft: null
        };
      }
    },
    ActivityDetails: {
      screen: ActivityDetails,
      navigationOptions: ({ navigation }) => {
        return {
          title: "Activity Details",
          headerLeft: <HeaderBackButton  tintColor='white' onPress={() => navigation.navigate(navigation.state.params.prevRoute)}/>,
          headerRight: <View />
        };
      }
    }
  },
  {
    initialRouteName: "Activity",
    /* The header config from HomeScreen is now here */
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#2e6fce"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
        flex: 1
      },
    },
  });
