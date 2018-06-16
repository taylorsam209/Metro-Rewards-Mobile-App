import React from "react";
import { Image, Button, View, Platform } from "react-native";
import { StackNavigator } from "react-navigation";
import PriceQuote from "../../components/Tabs/PriceQuote/screens/PriceQuote";
import PQCamera from "../../components/Tabs/PriceQuote/screens/PQCamera";
import PQDetails from "../../components/Tabs/PriceQuote/screens/PQDetails";
import PQConfirm from "../../components/Tabs/PriceQuote/screens/PQConfirm";


export const PriceQuoteStack = StackNavigator(
  {
    PQDetails: {
      screen: PQDetails,
      navigationOptions: ({ navigation }) => {
        return {
          title: "Material Details",
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

          // header: null,
          // headerLeft: (
          //   <Button
          //     onPress={() => navigation.navigate("PQCamera")}
          //     title={"<"}
          //     color="white"
          //   />
          // ),
        };
      }
    },
    PQConfirm: {
      screen: PQConfirm,
      navigationOptions: ({ navigation }) => {
        return {
          title: 'Confirm Your Details',
          // headerLeft: (
          //   <Button
          //     onPress={() => navigation.navigate("PQDetails")}
          //     title={"<"}
          //     color="white"
          //   />
          // ),
          headerRight: <View />,
        };
      }
    }
  },
  {
    initialRouteName: "PQDetails",
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
    }
  }
);
