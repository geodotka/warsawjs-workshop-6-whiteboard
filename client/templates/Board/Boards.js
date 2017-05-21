import { fabric } from 'fabric';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { Random } from 'meteor/random';
import Objects from '/imports/collections/Objects';

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
    });

    canvas.on('object:added', (e) => {
        const fabricObject = e.target;
        if (fabricObject.id) {
            // Object was added by someone else and the "object:added" event was
            // called or we just refreshed page and objects are being added to the
            // canvas. In both situations we just stop here to not allow reinserting
            // an object.
            return;
        }
        // Convert fabric object to JSON.
        const object = fabricObject.toObject();
        // We have to generate id by ourself because we can't use id returned by
        // Object.insert. Before Object.insert returns the "added" event is already
        // called and we need to set id on the fabricObject before that.
        object._id = fabricObject.id = Random.id();
        object.boardId = fabricObject.boardId = this.boardId.get();
        fabricObject.userId = Meteor.userId();
        Meteor.call('insertObject', object, (err) => {
            if (err) {
            alert(err.message);
            canvas.remove(fabricObject);
            }
        });
        console.log('canvas:object:added', fabricObject.id);
    });

    this.autorun(() => {
        Objects.find().observeChanges({
            added(id, doc) {
            console.log('observeChanges.added', id, doc);
            const fabricObject = canvas.getObjectById(id);
            if (fabricObject) {
                // Object is already drawn on canvas so we stop here to not draw
                // duplicate.
                return;
            }
            // Create fabric objects from JSON.
            fabric.util.enlivenObjects([doc], ([fabricObject]) => {
                fabricObject.id = id;
                canvas.add(fabricObject);
            });
            },
            changed(id, fields) {
            console.log('observeChanges.changed', id, fields);
            const fabricObject = canvas.getObjectById(id);
            if (!fabricObject) {
                // We can't update object that does not exist on the canvas.
                return;
            }
            fabricObject.set(fields);
            canvas.renderAll();
            },
            removed(id) {
            console.log('observeChanges.removed', id);
            const fabricObject = canvas.getObjectById(id);
            if (!fabricObject) {
                // Object was already removed or does not exist so we have nothing
                // to do here.
                return;
            }
            canvas.remove(fabricObject);
            }
        });
    });
});


Template.Board.onDestroyed(function() {
   window.removeEventListener('resize', this.resizeHandler)
});
