module.exports = function(sequelize, DataTypes) {
    var Truck = sequelize.define("Truck", {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        plate_number: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        description: DataTypes.TEXT
    }, 
    {
        underscored: true,
        tableName: 'truck',
        instanceMethods: {
        },
        classMethods: {
            associate: function(models) {
                Truck.hasMany(models.Delivery)
            }
        },
        hooks: {
        }
    });

    return Truck;
};