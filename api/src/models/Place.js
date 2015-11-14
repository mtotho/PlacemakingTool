"use strict";

module.exports = function(sequelize, DataTypes) {
    var Place = sequelize.define('Place', {
        Id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        Name: {
            type: DataTypes.STRING,
            unique:true,
            field: 'Name'
        },
        Zoom: {
            type: DataTypes.INTEGER,
            field: 'Zoom'
        },
        Latitude: {
            type: DataTypes.FLOAT,
            field: 'Latitude'
        },
        Longitude: {
            type: DataTypes.FLOAT,
            field: 'Longitude'
        },
        IsPublic: {
            type: DataTypes.BOOLEAN,
            field: 'IsPublic'
        }
    }, {
        freezeTableName: true,
        name: {
            singular: 'Place',
            plural: 'Places'
        },
        classMethods: {
            associate: function (models) {

                //A place has one question set
                Place.belongsTo(models.QuestionSet);

            }
        }
    });

    return Place;
};