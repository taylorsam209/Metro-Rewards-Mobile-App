import React from "react";
import { AppRegistry } from "react-native";
import { TabNavigator, StackNavigator, TabBarBottom} from "react-navigation";
import { HomeStack } from "./HomeStack";
import { PriceQuoteStack } from "./PriceQuoteStack";
import { CouponsStack } from "./CouponsStack";
import { ActivityStack } from "./ActivityStack";
import { SettingsStack } from "./SettingsStack";
import { SignUpStack } from '../SignUpStack';
import Login from "../../components/Login/screens/Login";
import Login2 from "../../components/Login/screens/Login2";
import Splash from "../../components/Login/screens/Splash";
import Modal from '../../components/common/Modal';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../../config.json';
const Icon = createIconSetFromFontello(fontelloConfig);

export const Tabs = TabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        title: 'Home',
      }

    },
    Coupons: {
      screen: CouponsStack,
      navigationOptions: {
        title: 'Coupons',
      }
    },
    // PriceQuote: {
    //   screen: PriceQuoteStack,
    //   headerLeft: null,
    //   navigationOptions: {
    //     title: 'Price Quote',
    //     // tabBarIcon: () => <Image source={quoteLogo} />
    //   }
    // },
    Activity: {
      screen: ActivityStack,
      navigationOptions: {
        title: 'Activity',
      }
    },
    Settings: {
      screen: SettingsStack,
      navigationOptions: {
        title: 'Settings',
        // tabBarIcon: () => <Image source={settingsLogo} />
      }
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `homesvg${focused ? '' : '-outline'}`;
          return  <Icon name="homesvg" size={25} color={tintColor} />

        } else if (routeName === 'Coupons') {
          iconName = `couponssvg${focused ? '' : '-outline'}`;
          return  <Icon name="couponssvg" size={25} color={tintColor} />
        }
         else if (routeName === 'PriceQuote') {
          iconName = `pricequotesvg${focused ? '' : '-outline'}`;
          return  <Icon name="pricequotesvg" size={25} color={tintColor} />
        }
         else if (routeName === 'Activity') {
          iconName = `activitysvg${focused ? '' : '-outline'}`;
          return  <Icon name="activitysvg" size={25} color={tintColor} />
        }
         else if (routeName === 'Settings') {
          iconName = `settingssvg${focused ? '' : '-outline'}`;
          return  <Icon name="settingssvg" size={40} color={tintColor} />
        }

      },
    }),
    //   do we want to force the tab bar to the bottom or let android have it at the top as per default setting for android?
    // tabBarPosition: 'top',
    tabBarOptions: {
      style: {
        backgroundColor: "#2e6fce"
      },
      indicatorStyle: {
        borderBottomColor: "#ffffff",
        borderBottomWidth: 3
      },
      tabStyle: {
        // borderRightWidth: 1,
      },
      activeTintColor: "#fff",
      inactiveTintColor: "lightgray",
      activeBackgroundColor: "#083a8c",
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
  }
  // { headerMode: none }
);

export const LoginStack = StackNavigator(
  {
    Login: {
      screen: Login,
      headerMode: "none",
    },
    Login2: {
      screen: Login2,
      headerMode: 'none',
    },
    Splash: {
      screen: Splash,
      headerMode: 'none',
    },
    Tabs: {
      screen: Tabs,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    SignUpStack: {
      screen: SignUpStack,
    },
    Modal: {
      screen: Modal
    }
  },
  {
    mode: 'modal',
    headerMode: "none"
  }
);

const parentTab = StackNavigator({
  Home: { screen: HomeStack } //Default entry screen
});

AppRegistry.registerComponent("rewardsApp", () => parentTab);
