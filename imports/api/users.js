import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const UsersWithRecipesCollection = new Mongo.Collection('UsersWithRecipesCollection');

Meteor.methods({
  'recipes.insert'(text) {
    check(text, String);

    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    UsersWithRecipesCollection.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },
  'recipes.remove'(recipeId) {
    /**check(recipeId, String);*/
    if (! Meteor.userId()) {
      console.log("not authorized");
      throw new Meteor.Error('not-authorized');
    }
    UsersWithRecipesCollection.remove(recipeId);
  },
  'recipes.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    UsersWithRecipesCollection.update(taskId, { $set: { checked: setChecked } });
  },
  'recipesLike.update'(recipesId) {
    /**check(recipesId, String);*/

    UsersWithRecipesCollection.update(recipesId, {
      $inc: { likes:1 }
    });
  },
});
