import { DefaultConfiguration } from '../configuration'

/**
 * @license
 * Copyright Panther DS. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  url: DefaultConfiguration.enviroment.dev,
  backoOfficeUrl: DefaultConfiguration.backoffice.dev,
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
}
