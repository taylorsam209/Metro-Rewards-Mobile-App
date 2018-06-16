import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import CardDetail from "../CardDetail";
import { connect } from 'react-redux';
import Moment from 'moment';

class Activity extends Component {

  renderActivity() {
    if (this.props.user.userinfo[0].usersorders) {
      return this.props.user.userinfo[0].usersorders.map((event, i) => {
        console.log(event.order_date)
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
    }
  }

  render() {
    return this.props.user.userinfo[0].usersorders ?
      <ScrollView contentContainerStyle={styles.activityContainer} style={{ backgroundColor: '#393939' }}>{this.renderActivity()}</ScrollView>
      : <View style={styles.placeholder}><Text style={{ color: 'white' }}>No activity found, start earning points!</Text></View>
  }
}

const styles = {
  activityContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
    paddingTop: 10,
    backgroundColor: '#393939',
  },
  placeholder: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#393939'
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Activity);