import { Meteor } from 'meteor/meteor';

import Items from '../imports/api/items';

const Tests = new Mongo.Collection('tests');

Meteor.startup(() => {
  Items.insert({
    itemOne: {
      text: 'Hi',
      value: 0
    },
    itemTwo: {
      text: 'Hello',
      value: 0
    },
  });
  // code to run on server at startup
});
