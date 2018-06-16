import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const CardDetail = props => {
  return (
    <View style={styles.cardWrapper}>
      <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={props.earned ? ["#38EF7D", "#11998E"] : ["#E43A15", "#841006"]}
        style={styles.dateView}
        >
        <Text style={styles.dayText}>{props.day}</Text>
        <Text style={styles.monthText}>{props.month}</Text>
      </LinearGradient>
      <TouchableOpacity 
      onPress={props.onPress}
      style={styles.descriptionWrapper}>
        <View style={styles.messageView}>
          <Text style={styles.messageText}>{props.message}</Text>
          {/* <Text style={styles.descriptionText}>
            {props.purchaseDescription}
            {props.redemptionDescription}
          </Text> */}
        </View>
        <View style={styles.pointsView}>
          <Text style={props.earned ? styles.pointsText : styles.pointsRedText}>
            {props.points}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.gradientLine}>
        <LinearGradient
          colors={
            props.earned ? ["#38EF7D", "#A4E375"] : ["#E43A15", "#841006"]
          }
          style={{ width: 5, height: "100%" }}
        />
      </View>
    </View>
  );
};

const styles = {
  cardWrapper: {
    flex: 1,
    width: "100%",
    height: 60,
    flexDirection: "row",
    padding: 3
  },
  dateView: {
    width: "18%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderRadius: 4
  },
  dayText: {
    color: "white",
    fontSize: 13
  },
  monthText: {
    color: "white",
    fontSize: 15
  },
  descriptionWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minWidth: "80%",
    maxWidth: "80%",
    borderTopColor: "#9b9b9b",
    borderTopWidth: 1,
    borderBottomColor: "#9b9b9b",
    borderBottomWidth: 1
  },
  messageView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 5,
    marginLeft: 3
  },
  messageText: {
    color: "white",
    fontSize: 18
  },
  descriptionText: {
    color: "#9b9b9b",
    fontSize: 12
  },
  pointsView: {
    width: 70,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 5
  },
  pointsText: {
    color: "#a4e375",
    marginRight: 20
  },
  pointsRedText: {
    color: "red",
    marginRight: 20
  },
  gradientLine: {
    width: 5,
    height: "100%",
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    overflow: "hidden"
  }
};

export default CardDetail;
