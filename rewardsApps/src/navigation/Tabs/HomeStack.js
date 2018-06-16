import React from 'react';
import { Image, Button, View, Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Home from '../../components/Tabs/Home/screens/Home';
import ScanReceipt from '../../components/Tabs/Home/screens/ScanReceipt';
import RewardsMarketplace from '../../components/Tabs/Home/screens/RewardsMarketplace';
import RewardDetails from '../../components/Tabs/Home/screens/RewardDetails';


export const HomeStack = StackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            title: 'Home',
            header: null,
            tabBarLabel: 'Home',
        },
    },
    ScanReceipt: {
      screen: ScanReceipt,
      navigationOptions: ({ navigation }) => {
        return {
          title: "",
          headerStyle: {
            ...Platform.select({
              android: {
                shadowColor: 'transparent',
                shadowOpacity: 0,
                shadowRadius: 0,
                shadowOffset: {
                  height: 0,
                  width: 0,
                },
                elevation: 0,
              }
            }),
            backgroundColor: 'transparent',
            position: 'absolute',
            zIndex: 100,
            top: 0,
            left: 0,
            right: 0,
            borderBottomWidth: 0,
          },
          // headerLeft: (
          //   <Button
          //     onPress={() => navigation.navigate("EarnPoints")}
          //     title={"<"}
          //     color="white"
          //   />
          // ),
        };
      }

    },
    RewardsMarketplace: {
      screen: RewardsMarketplace,
      navigationOptions: ({ navigation }) => {
        return {
          title: "",
          headerStyle: {
            ...Platform.select({
              android: {
                shadowColor: 'transparent',
                shadowOpacity: 0,
                shadowRadius: 0,
                shadowOffset: {
                  height: 0,
                  width: 0,
                },
                elevation: 0,
              }
            }),
            backgroundColor: 'transparent',
            position: 'absolute',
            zIndex: 100,
            top: 0,
            left: 0,
            right: 0,
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
            alignSelf: 'center',
            flex: 1,
          },
    
          // headerLeft: (
          //   <Button
          //     onPress={() => navigation.navigate("Home")}
          //     title={"<"}
          //     color="white"
          //   />
          // ),
        };
      }
    },
    RewardDetails: {
      screen: RewardDetails,
      navigationOptions: ({ navigation }) => {
        return {
          title: "Reward Details",
          // headerLeft: (
          //   <Button
          //     onPress={() => navigation.navigate("RewardsMarketplace")}
          //     title={"<"}
          //     color="white"
          //   />
          // ),
          headerRight: <View/>,
        };
      }
    }
},
{
    initialRouteName: 'Home',
    /* The header config from HomeScreen is now here */
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#2e6fce',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
        flex: 1
      },
    },
  });

