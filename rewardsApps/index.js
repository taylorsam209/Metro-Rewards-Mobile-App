import { AppRegistry } from 'react-native';
import App from './src/App'

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

AppRegistry.registerComponent('rewardsApp', () => App);
