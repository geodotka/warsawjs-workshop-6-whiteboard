import { Meteor } from 'meteor/meteor';
import Boards from '/imports/collections/Boards'  // import meteorowy, zaczyna się od slasha, szuka w katalogu głównym

Meteor.methods({
   createBoard() {
       return Boards.insert({});
   }
});
