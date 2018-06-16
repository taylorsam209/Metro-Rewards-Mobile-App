import React, { Component } from 'react';
import { Animated } from 'react-native';
import { LineChart } from 'react-native-svg-charts';
import { Line } from 'react-native-svg';

class Chart extends Component {
    state = { fadeAnim: new Animated.Value(0) }

    componentDidMount() {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true
            }
        ).start();
    }

    render() {

        const HorizontalLine = (({ y }) => (
            <Line
                key={'zero-axis'}
                x1={'0%'}
                x2={'100%'}
                y1={y(0)}
                y2={y(0)}
                stroke={'grey'}
                // strokeDasharray={[4, 8]}
                strokeWidth={2}
            />
        ))
        return (
            <Animated.View
                style={{ opacity: this.state.fadeAnim }}>
                <LineChart
                    style={{ height: 150 }}
                    data={this.props.data}
                    svg={{ stroke: '#00ffcc', strokeWidth: 3 }}
                    contentInset={{ top: 20, bottom: 20 }}
                    gridMin={0}
                >
                    <HorizontalLine />
                </LineChart>
            </Animated.View>
        )
    }
}

export default Chart;
