import React, { Component } from 'react';
import Items from '../api/items';
import { createContainer } from 'meteor/react-meteor-data';

class App extends Component {

  render() {
    return (
        <header>
          <h1>Level Up Voting</h1>
        </header>
    );
  }
}

export default createContainer(() => {
  return {
    items: Items.find({}).fetch()
    //basic find function and call fetch to get array and pass to items
  }
}, App);