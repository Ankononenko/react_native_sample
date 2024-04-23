import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import { DeviceEventEmitter } from 'react-native';
import Pushwoosh from 'pushwoosh-react-native-plugin';

Pushwoosh.init({ 
  // Add your app code and Firebase sender ID here
  "pw_appid" : "2D44A-2842E",
  "project_number" : "104623367221"
});
Pushwoosh.register();

DeviceEventEmitter.addListener('pushReceived', (e) => {
  console.warn("pushReceived: " + JSON.stringify(e));
});

DeviceEventEmitter.addListener('pushOpened', (e) => {
  console.warn("pushOpened: " + JSON.stringify(e));
  // Handle the push notification opened event
});

AppRegistry.registerComponent(appName, () => App);

