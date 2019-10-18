import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Items = new Mongo.Collection('items');

const ItemsSchema = new SimpleSchema({
  itemOne: Object,
    'itemOne.text': String,
    'itemOne.value': SimpleSchema.Integer,
  itemTwo: Object,
    'itemTwo.text': String,
    'itemTwo.value': SimpleSchema.Integer,
  lastUpdated: {
    type: Date, // when defining an optional param we will need the type
    optional: true
  }
});

Items.attachSchema(ItemsSchema);



if (Meteor.isServer) {

  Meteor.publish('allItems', function() {
    return Items.find({}, {
      limit: 50,
      sort: { lastUpdated: 1 }
    });
  });


  Meteor.methods({
    insertNewItem(itemOne, itemTwo) {
      Items.insert({
        itemOne: {
          text: itemOne,
          value: 0,
        },
        itemTwo: {
          text: itemTwo,
          value: 0,
        }
      });
    },

    voteOnItem(item, position) {
      check(item, Object);
      let lastUpdated = new Date();
      if(Meteor.userId()) {
        if(position === 'itemOne') {
          Items.update(item._id, {
            $inc: {
              'itemOne.value': 1
            },
            $set: {
              lastUpdated
            }
          })
        } else {
          Items.update(item._id, {
            $inc: {
              'itemTwo.value': 1
            },
            $set: {
              lastUpdated
            }
          })
        }
      }
    }
  });
}



export default Items;