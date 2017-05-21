// importy statyczne
import { } from ''


// importy dynamiczne
function async() {
    var module = await import('react')  // nie zablokuje przeglądarki
}

var Posts = new Mongo.Collection('test');

if (Meteor.isClient) {
    // w ten sposób możemy zdefiniować tylko coś, co się wykona po stronie klienta
}
