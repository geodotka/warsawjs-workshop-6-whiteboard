// potrzebujemy 2 routów:

// 1. główny
// nie importujemy, bo cały katalog będzie importowany do klienta, ma to być zmienione w przyszłości
// w tym momencie zmienne są ładowane globalnie
FlowRouter.route('/', {
    action() {
        Meteor.call('createBoard', (err, boardId) => {
            // callback function
            if (err) {
                alert(err.message);
            } else {
                FlowRouter.go(`/boards/${boardId}`);
            }
        });
    }
});
