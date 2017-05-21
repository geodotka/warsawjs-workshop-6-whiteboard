import { Mongo } from 'meteor/mongo';   // jeśli jest meteor/, szuka w swoich wtyczkach

const Objects = new Mongo.Collection('objects');

export default Objects;
