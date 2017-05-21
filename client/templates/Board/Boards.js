import { fabric } from 'fabric';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

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


Template.Board.onRendered(function() {
    // canvas już istnieje
    const canvasElement = this.find('canvas');

    // create new fabric canvas
    const canvas = this.canvas = new fabric.Canvas(canvasElement, {
        // disable group selection
        selection: false
    });

    // nie możemy zrobić tego stylami
    const resizeCanvas = function() {
        canvas.setHeight(window.innerHeight);
        canvas.setWidth(window.innerWidth);
        canvas.renderAll();
       };
    resizeCanvas();
    this.resizeHandler = window.addEventListener('resize', () => {
        resizeCanvas();
    });

    this.autorun(() => {
        canvas.isDrawingMode = Session.get('isDrawingMode');
        canvas.freeDrawingBrush.color = Session.get('color');
    })
});


Template.Board.onDestroyed(function() {
   window.removeEventListener('resize', this.resizeHandler)
});
