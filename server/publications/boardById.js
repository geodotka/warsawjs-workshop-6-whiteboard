import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import Boards from '/imports/collections/Boards'

Meteor.publish('boardById', function(boardId) {
    check(boardId, String); // sprawdzi, czy boardId jest stringiem, jeśli nie, wywali nam błąd

    if (!this.userId || !boardId) {
        return;
    }

    // tu mamy kontekst reaktywny, na zmianę zostanie wysłany do każdego klienta, który subskrybuje tę publikację
    return Boards.find({
        _id: boardId
    });
    // funckja Boards.findOne nie jest reaktywna, zwraca nam zwykły obiekt, a Boards.find zwróci nam kursor
    // publikacja musi zwrócić kursor
    // funkcja fetch na kursorze zwróci nam listę danych
});
