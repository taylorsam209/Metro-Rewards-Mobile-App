import React from 'react';
import { Text, View } from 'react-native';

const ActivityDetails = (props) => {
    console.log(props.navigation.state)
    return(
        <View style={styles.activityWrapper} >
            <View style={styles.detailWrapper} >
                <View style={styles.titleView} >
                    <View style={styles.titleBorder} >
                        <Text style={styles.title} >
                            Transaction Details
                        </Text>
                    </View>
                <View style={styles.transactionWrapper} >    
                    <View style={styles.innerWrapper} >

    {/* ------------ transcaction ID might need to be changed for cases of REDEMPTION of points ------- */}

                        <Text style={styles.keyText} >{props.navigation.state.params.paid ? 'Transaction ID' : 'Award Received'}</Text>
                        <Text style={styles.valueText} >{props.navigation.state.params.paid ?`${props.navigation.state.params.transactionId}` : `${props.navigation.state.params.description}`}</Text>
                    </View>
                    <View style={styles.innerWrapper} >
                        <Text style={styles.keyText} >{props.navigation.state.params.paid ? 'Transaction Date' : 'Redemption Date'}</Text>
                        <Text style={styles.valueText} >{props.navigation.state.params.date}</Text>
                    </View>

        {/* -------- Chandler said we no longer need to display the paid amount below -------- */}
        
                    {/* <View style={styles.innerWrapper} >
                        <Text style={styles.keyText} >{props.navigation.state.params.paid ? 'Amount Paid' : 'Cashed-in Reward' }</Text>
                        <Text style={styles.valueTextGreen} >{props.navigation.state.params.paid ? `$${props.navigation.state.params.paid}` : `${props.navigation.state.params.description}`}</Text>
                    </View> */}

                    <View style={styles.lastInnerWrapper} >
                        <Text style={styles.keyText} >{props.navigation.state.params.paid ? 'Points Earned' : 'Points Redeemed'}</Text>
                        <Text style={styles.valueTextGreen} >{`${props.navigation.state.params.points} pts`}</Text>
                    </View>
                </View>
                </View>
            </View>
        </View>
    )
}

const styles = {
    activityWrapper: {
        width: '100%',
        height: '100%',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#393939'
    },
    detailWrapper: {
        width: '100%',
        height: '50%',
        marginTop: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 5
    },
    titleView: {
        width: '100%',
    },
    titleBorder: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        marginRight: 5,
        paddingRight: 5
    },
    title: {
        color: '#a4e375',
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 5,
        marginLeft: 10,
        fontSize: 17
    },
    transactionWrapper: {
        width: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    innerWrapper: {
        width: '95%',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    lastInnerWrapper: {
        width: '95%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    keyText: {
        color: 'white',
        fontWeight: '700',
    },
    valueText: {
        color: 'white',
    },
    valueTextGreen: {
        color: '#a4e375',
        fontWeight: '300'
    }
}

export default ActivityDetails;