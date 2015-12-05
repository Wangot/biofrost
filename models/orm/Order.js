module.exports = function(sequelize, DataTypes) {
    var Order = sequelize.define("Order", {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        description: DataTypes.TEXT,
        discount: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0
        }
    }, 
    {
        underscored: true,
        tableName: 'company',
        instanceMethods: {
        },
        classMethods: {
            associate: function(models) {
                // Order.hasMany(models.Employee)
            }
        },
        hooks: {
        }
    });

    return Order;
};