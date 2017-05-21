import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});


Posts.allow({
    insert(userId, doc) {
//        return true;     // umożliwiamy wszystkim inserty
        var user = Users.findOne(userId);
        if (userId) {
            return true;
        }
    },
    update(){

    }
});

