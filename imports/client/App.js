import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { LoginButtons } from 'meteor/okgrow:accounts-ui-react';
import Item from './Item';


import Items from '../api/Items';

class App extends Component {
  addItems(e){
    e.preventDefault();
    const itemOne = this.refs.itemOne.value.trim();
    const itemTwo = this.refs.itemTwo.value.trim();
    if (itemOne != '' && itemTwo != '') {
      Meteor.call('insertNewItem', itemOne, itemTwo, (err, res) => {
        if(!err) {
          this.refs.itemOne.value = '';
          this.refs.itemTwo.value = '';
        }
      });
    }
  }

  render() {
    if (!this.props.ready) {
      return <div>Loading</div>
    }

    return (
      <div>
        <header>
          <h1>GetEm Voting</h1>
          <LoginButtons />
        </header>
        <main>
          <form className='new-items' onSubmit={this.addItems.bind(this)}>
            <input type='text' ref='itemOne'/>
            <input type='text' ref='itemTwo'/>
            <button type='submit'>Add Items</button>
            {this.props.items.map((item) => {
              return <Item item={item} key={item._id}/>
            })}
          </form>
        </main>
      </div>
    );
  }
}

export default createContainer(() => {
  //to put items in pur devtool
  let itemsSub = Meteor.subscribe('allItems');
  return {
    ready: itemsSub.ready(),
    items: Items.find({}).fetch()
  }
}, App);

