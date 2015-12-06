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
        City: {
            type: DataTypes.STRING,
            field: 'City'
        },
        State: {
            type: DataTypes.STRING,
            field: 'State'
        },
        PostalCode: {
            type: DataTypes.STRING,
            field: 'PostalCode'
        },
        CountryCode: {
            type: DataTypes.STRING,
            field: 'CountryCode'
        },
        Latitude: {
            type: DataTypes.DECIMAL(10,8),
            field: 'Latitude'
        },
        Longitude: {
            type: DataTypes.DECIMAL(11,8),
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

                //A place has one or many feedbacks
                Place.hasMany(models.PlaceFeedback);

            }
        }
    });

    return Place;
};