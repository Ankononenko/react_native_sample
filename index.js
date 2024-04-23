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

// Badge management
Pushwoosh.setApplicationIconBadgeNumber(0);

DeviceEventEmitter.addListener('pushReceived', (e) => {
  console.warn("pushReceived: " + JSON.stringify(e));

  // Badge number incremented and printed to the console
  Pushwoosh.addToApplicationIconBadgeNumber(1);
  Pushwoosh.getApplicationIconBadgeNumber((badgeNumber) => {
  console.warn("Application icon badge number = " + badgeNumber);

  // Custom tag value set and the result printed to the console.
  // Timeout is used to make sure the final result is successfully returned from the DB
  // Make sure to create the custom tag in the control panel
  Pushwoosh.setTags({ "Hello world" : "Hello"});
  setTimeout(() => {
    Pushwoosh.getTags(
      function(tags) {
        console.warn('Tags for the device: ' + JSON.stringify(tags));
      },
      function(error) {
        console.warn('getTags error: ' + JSON.stringify(error));
      }
    );
  }, 1000); 

  // Custom event sent
  // Usage: postEvent(event, attributes)
  Pushwoosh.postEvent("Hello World", { "status" : "Completed"})
});
});

DeviceEventEmitter.addListener('pushOpened', (e) => {
  console.warn("pushOpened: " + JSON.stringify(e));
  // Handle the push notification opened event
});

AppRegistry.registerComponent(appName, () => App);

