import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);    // wartość reaktywna, ustawiamy ją 'set', wyciągamy 'get'
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click .create'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
  'click .remove'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() - 1);
  },
});
