"use strict";

module.exports = function(sequelize, DataTypes) {
    var PlaceFeedback = sequelize.define('PlaceFeedback', {
        Id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        IPAddress: {
            type: DataTypes.STRING,
            field: 'IPAddress'
        }
    }, {
        freezeTableName: true,
        name: {
            singular: 'PlaceFeedback',
            plural: 'PlaceFeedbacks'
        },
        classMethods: {
            associate: function (models) {

                //Feedback for one place
                PlaceFeedback.belongsTo(models.Place);

                //feedback for one set
                PlaceFeedback.belongsTo(models.QuestionSet);

                //Feedback has as many question responses as there are questions in the set
                PlaceFeedback.hasMany(models.QuestionResponse);
            }
        }
    });

    return PlaceFeedback;
};