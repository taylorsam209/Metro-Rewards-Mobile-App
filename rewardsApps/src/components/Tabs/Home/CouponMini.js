import React from 'react';
import { View, Text } from 'react-native';
import LinearGradient from "react-native-linear-gradient";

const CouponMini = (props) => {
    return (
        <View style={styles.couponContainer}>
            <LinearGradient
                start={props.start}
                end={props.end}
                colors={props.colors}
                style={styles.linearGradient}
            >
                <View style={styles.contentContainer}>
                    <Text style={styles.name}>{props.name}</Text>
                    <Text style={styles.multiplier}>{props.multiplier}/lb</Text>
                    <Text style={styles.expire}>EXP {props.expire.split('-').slice(0, 2).reverse().join('/')}</Text>
                </View>
                <Text style={styles.bigText}>{props.name.split("", 3).join('')}</Text>
            </LinearGradient>
        </View>
    )
}

const styles = {
    couponContainer: {
        width: '30%',
        height: 125,
    },
    linearGradient: {
        borderRadius: 15,
        height: '100%',
        shadowColor: "rgba(0, 0, 0, 0.4)",
        shadowOffset: {
          width: 0,
          height: 2.5
        },
        shadowRadius: 2,
        shadowOpacity: 1
    },
    contentContainer: {
        justifyContent: 'space-between',
        height: '100%',
        paddingTop: 5,
        paddingBottom: 7,
    },
    name: {
        color: 'white',
        paddingLeft: 5
    },
    multiplier: {
        color: 'white',
        fontSize: 20,
        paddingLeft: 5
    },
    expire: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 9
    },
    bigText: {
        position:'absolute',
        left: 0,
        bottom: 0,
        color: 'white',
        opacity: 0.1,
        fontSize: 55,
        fontWeight: 'bold',
        marginBottom: -10
    }
}

export default CouponMini;