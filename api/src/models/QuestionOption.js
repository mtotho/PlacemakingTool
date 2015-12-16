"use strict";

module.exports = function(sequelize, DataTypes) {
    var QuestionOption = sequelize.define('QuestionOption', {
        Id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        OptionText: {
            type: DataTypes.STRING,
            unique:true,
            field: 'OptionText'
        },
        OptionValue: {
            type: DataTypes.STRING,
            field: 'OptionValue'
        },
        OptionImage: {
            type: DataTypes.STRING,
            field: 'OptionImage'
        }
    }, {
        freezeTableName: true,
        name: {
            singular: 'QuestionOption',
            plural: 'QuestionOptions'
        },
        classMethods: {
            associate: function (models) {

                //An option for one question
                QuestionOption.belongsTo(models.Question);
            }
        }
    });

    return QuestionOption;
};