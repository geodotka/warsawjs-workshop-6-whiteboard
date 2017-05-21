import { Mongo } from 'meteor/mongo';   // jeśli jest meteor/, szuka w swoich wtyczkach

const Boards = new Mongo.Collection('boards');

export default Boards;
