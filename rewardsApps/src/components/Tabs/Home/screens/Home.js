import React, { Component } from "react";
import { View, Text, ImageBackground, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import Moment from 'moment'
import homeBackground2 from "../../../../assets/homeBackground2.png";
import CardDetail from '../../Activity/CardDetail';
import RewardsContainer from '../RewardsContainer';
import CouponMini from '../CouponMini';
import { connect } from 'react-redux';

class Home extends Component {

  renderCoupon() {
    const { usercoupons } = this.props.user.userinfo[0];
    if (usercoupons) {
      const coupons = usercoupons.slice(0, 3);
      return coupons.map((coupon, i) => {
        return (
          <CouponMini
            key={i}
            name={coupon.name}
            multiplier={coupon.multiplier}
            gradient={coupon.gradient}
            colors={coupon.colors}
            start={{ x: coupon.start_x, y: coupon.start_y }}
            end={{ x: coupon.end_x, y: coupon.end_y }}
            expire={coupon.expire_date}
          />
        )
      })
    }
  }

  renderActivity() {
    const { usersorders } = this.props.user.userinfo[0];
    if (usersorders) {
      const orders = usersorders.slice(0, 3);
      return orders.map((event, i) => {
        return (
          <CardDetail
            key={event.order_id}
            month={Moment(event.order_date).format('MMM')}

            day={Moment(event.order_date).format('Do')}

            // ------- not available info in current schema ----------
            // purchaseDescription={event.purchaseDescription}
            // redemptionDescription={event.redemptionDescription}
            message={event.points_earned ? 'YOU EARNED POINTS!' : 'YOU REDEEMED POINTS!'}
            points={event.points_earned ? `+${event.points_earned}` : `-${event.pointsRedeemed}`}
            earned={event.points_earned}
            onPress={() => this.props.navigation.navigate('ActivityDetails',
              {
                points: event.points_earned ? `${event.points_earned}` : `${event.pointsRedeemed}`,
                // Chandler said we no longer need the paid amount
                paid: event.points_earned,
                date: Moment(event.order_date).format('L'),
                transactionId: event.order_id,
                description: event.redemptionDescription,
                prevRoute: this.props.navigation.state.routeName
              })}
          />
        );
      });
    } else {
      return (
        <View style={styles.noActivityContainer}>
          <Text style={styles.noActivityMessage}>No activity found</Text>
        </View>
      )
    }
  }

  render() {
    const { userinfo } = this.props.user;
    console.log('redux user', this.props.user)
    return (
      this.props.user ?
        <ScrollView style={styles.homeContainer}>
          <View style={{ backgroundColor: '#393939', paddingBottom: 30 }} >
            <ImageBackground
              style={{ width: "auto", height: 400 }}
              source={homeBackground2}
            >
              <Text style={styles.welcomeText}>Welcome Back,</Text>
              <Text style={styles.welcomeText2}>{userinfo[0].Name.split(" ").slice(0, 1).join("")}!</Text>
            </ImageBackground>
            <RewardsContainer />
            <Text style={styles.contentHeader}>Your Coupons</Text>
            <View style={styles.couponsContainer}>
              {this.renderCoupon()}
            </View>
            <Text style={styles.contentHeader}>Recent Activity</Text>
            {this.renderActivity()}
          </View>
        </ScrollView>
        : <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size='large' />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    width: "100%",
    height: 400,
    backgroundColor: '#393939'
  },
  welcomeText: {
    marginTop: 80,
    marginLeft: 20,
    fontSize: 40,
    color: 'white'
  },
  welcomeText2: {
    marginLeft: 20,
    marginBottom: 20,
    fontSize: 40,
    color: 'white'
  },
  contentHeader: {
    marginLeft: 20,
    marginBottom: 15,
    marginTop: 30,
    fontSize: 34,
    fontWeight: 'bold',
    color: 'white'
  },
  couponsContainer: {
    alignSelf: 'center',
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  activityIndicatorContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  noActivityContainer: {
    marginTop: 70,
    marginBottom: 80,
    width: '90%',
    alignSelf: 'center',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noActivityMessage: {
    color: "white",
    fontSize: 18,
  }
});

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Home);