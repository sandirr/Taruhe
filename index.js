/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';
import { setCustomText } from 'react-native-global-props';

const customTextProps = {
    style: {
        fontFamily: 'Poppins-Regular'
    }
}
setCustomText(customTextProps)
AppRegistry.registerComponent(appName, () => App);
