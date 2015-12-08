module.exports = function(sequelize, DataTypes) {
    var Payment = sequelize.define("Payment", {
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0
        }
    }, 
    {
        underscored: true,
        tableName: 'payment',
        instanceMethods: {
        },
        classMethods: {
            associate: function(models) {
                Payment.belongsTo(models.Order)
            }
        },
        hooks: {
        }
    });

    return Payment;
};