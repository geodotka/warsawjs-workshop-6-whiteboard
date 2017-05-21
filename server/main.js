import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});


// meteor zaleca używać coś na wzór restowego api
Meteor.methods({
    // możęmy stworzyć metody, które będą odpowiadać konkretnym operacjom
    createPost(doc) {
        Posts.insert(doc);
    }
});
