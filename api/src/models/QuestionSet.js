"use strict";

module.exports = function(sequelize, DataTypes) {
    var QuestionSet = sequelize.define('QuestionSet', {
        Id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        Name: {
            type: DataTypes.STRING,
            unique:true,
            field: 'Name'
        }
    }, {
        freezeTableName: true,
        name: {
            singular: 'QuestionSet',
            plural: 'QuestionSets'
        },
        classMethods: {
            associate: function (models) {

                //A single question set can be used with many places
                QuestionSet.hasMany(models.Place);

                //A single question set has many questions
                QuestionSet.hasMany(models.Question);

                //A question set can have a lot of feedback. Though it will be for multiple places so maybe not valuable
                QuestionSet.hasMany(models.PlaceFeedback);
            }
        }
    });

    return QuestionSet;
};