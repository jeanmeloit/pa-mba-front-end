import { DefaultConfiguration } from '@config/configuration'

/**
 * @license
 * Copyright Panther DS. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
export const environment = {
  firebase: {
    projectId: 'panther-checkin-control',
    appId: '1:839922541958:web:da9052720d506b5a35f807',
    databaseURL: 'https://panther-checkin-control-default-rtdb.firebaseio.com',
    storageBucket: 'panther-checkin-control.appspot.com',
    locationId: 'southamerica-east1',
    apiKey: 'AIzaSyAaZoF0HzZuGnb_WhdE765l9jGvXWFGjkE',
    authDomain: 'panther-checkin-control.firebaseapp.com',
    messagingSenderId: '839922541958',
    measurementId: 'G-PDY25XP7WX',
  },
  production: true,
  url: DefaultConfiguration.enviroment.homolog,
  backoOfficeUrl: DefaultConfiguration.backoffice.homolog,
}
