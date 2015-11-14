"use strict";

module.exports = function(sequelize, DataTypes) {
    var QuestionResponse = sequelize.define('QuestionResponse', {
        Id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        ResponseText: {
            type: DataTypes.STRING,
            field: 'ResponseText'
        }
    }, {
        freezeTableName: true,
        name: {
            singular: 'QuestionResponse',
            plural: 'QuestionResponses'
        },
        classMethods: {
            associate: function (models) {

                //this response is associated with one overall place feedback
                QuestionResponse.belongsTo(models.PlaceFeedback);

                //This is a response to one specific question
                QuestionResponse.belongsTo(models.Question);

                //The question response can be in the form of multiple options selected
                QuestionResponse.belongsToMany(models.QuestionOption, {through:models.QuestionResponse_Option, as:"ResponseOptions"});
            }
        }
    });

    return QuestionResponse;
};