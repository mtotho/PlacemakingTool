"use strict";

module.exports = function(sequelize, DataTypes) {
    var Question = sequelize.define('Question', {
        Id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        Name: {
            type: DataTypes.STRING,
            unique:true,
            field: 'Name'
        },
        Text: {
            type: DataTypes.STRING,
            field: 'Text'
        },
        Type: {
            type: DataTypes.STRING,
            field: 'Type'
        },
        IsRequired: {
            type: DataTypes.BOOLEAN,
            field: 'IsRequired'
        }

    }, {
        freezeTableName: true,
        name: {
            singular: 'Question',
            plural: 'Questions'
        },
        classMethods: {
            associate: function (models) {

                //A single question belongs to a question set
                Question.belongsTo(models.QuestionSet);

                //A question may have multiple options
                Question.hasMany(models.QuestionOption);
            }
        }
    });

    return Question;
};