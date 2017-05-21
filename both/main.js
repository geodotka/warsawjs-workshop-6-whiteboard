import { Meteor } from 'meteor/meteor';


Posts = new Mongo.Collection('test');   // bec var będzie globalnie


// meteor zaleca używać coś na wzór restowego api
Meteor.methods({
    // możemy stworzyć metody, które będą odpowiadać konkretnym operacjom
    createPost(doc) {
        return Posts.insert(doc);   // jeśli damy return, to id z inserta wróci do klienta (id jest ustawiane po srtronie clienta i tak wysyłane do serwera)
    }
});

// wywołujemy: Meteor.call('createPost', {title: 'xxx'}, function(err, result)) na końcu jest calback, jeśli chcemy poczekać na odpowiedź serwera
