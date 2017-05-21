import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Tracker } from 'meteor/tracker';

Template.Board.onCreated(function() {
    this.boardId = new ReactiveVar();

    Tracker.autorun(() => {
        // funkcja autorun automatycznie usuwa starą subskrybcję
        const boardId = FlowRouter.getParam('id');  // zmieni się na każdą zmianę id w urlu
        this.boardId.set(boardId);  // chcemy zapisać parametr na później

        this.subscribe('boardById', boardId);   // subskrybcje są reaktywne automatycznie
        this.subscribe('objectsByBoardId', boardId);
    });
});
