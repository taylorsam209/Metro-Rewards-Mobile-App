import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { withNavigation } from 'react-navigation';
import LinearGradient from "react-native-linear-gradient";
import { connect } from 'react-redux';
import Chart from './Chart';

class RewardsContainer extends Component {
    state = {
        days: [""],
        data: [0, 0, 0, 0, 0]
    }

    componentDidMount() {
        this.getChartData()
    }

    getChartData() {
        const { usersorders } = this.props.user.userinfo[0];
        if (usersorders) {
            const orders = usersorders.slice(0, 5);
            const points = [];
            const date = [];
            orders.map(event => {
                points.push(event.points_earned)
                date.push(event.order_date.split('-').slice(1, 3).join('/'))
            })
            console.log(points, date)
            this.setState({ days: date.reverse(), data: points.reverse() })
        }
    }

    render() {
        const { Point_Balance } = this.props.user.userinfo[0];
        return (
            <View style={styles.rewardContainer} >
                <View style={styles.rewardHeaderContainer}>
                    <Text style={{ color: 'white', fontSize: 20 }}>Rewards</Text>
                    <TouchableOpacity><Text style={{ color: 'white' }}></Text></TouchableOpacity>
                </View>
                <Text style={{ color: 'white', fontSize: 44, marginTop: 20 }}>{Point_Balance} Points</Text>
                <Chart data={this.state.data} />
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    {this.state.days.map((day, i) => {
                        return <Text key={i} style={{ color: 'white' }}>{day}</Text>
                    })}
                </View>


                <View style={styles.rewardButtonContainer}>
                    <TouchableOpacity
                        style={styles.rewardButton}
                        onPress={() => this.props.navigation.navigate("ScanReceipt")}
                    >
                        <LinearGradient
                            start={{ x: 0.0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
                            colors={['#38f9d7', "#43e97b"]}
                            style={styles.linearGradient}
                        >
                            <Text style={styles.rewardButtonText}>Earn Points</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                        style={styles.rewardButton}
                        onPress={() => this.props.navigation.navigate("RewardsMarketplace")}>
                        <LinearGradient
                            start={{ x: 0.0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
                            colors={['#8f94fb', "#4e54c8"]}
                            style={styles.linearGradient}
                        >
                            <Text style={styles.rewardButtonText}>Redeem Points</Text>
                        </LinearGradient>
                    </TouchableOpacity> */}
                </View>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    rewardContainer: {
        backgroundColor: "#303030",
        height: 'auto',
        width: "90%",
        marginTop: -180,
        marginRight: 'auto',
        marginLeft: 'auto',
        paddingRight: 30,
        paddingLeft: 30,
        opacity: 0.85,
        borderRadius: 15,
        shadowColor: "rgba(0, 0, 0, 0.55)",
        shadowOffset: {
            width: 10,
            height: 10
        },
        shadowRadius: 4,
        shadowOpacity: 1,
    },
    rewardHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    rewardButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40,
        marginTop: 20
    },
    rewardButton: {
        width: '45%',
    },
    linearGradient: {
        height: 40,
        borderRadius: 17,
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    rewardButtonText: {
        marginTop: 'auto',
        marginBottom: 'auto',
        alignSelf: 'center',
        color: 'white',
        fontWeight: 'bold'
    },
});

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(withNavigation(RewardsContainer));