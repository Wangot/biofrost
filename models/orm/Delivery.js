module.exports = function(sequelize, DataTypes) {
    var Delivery = sequelize.define("Delivery", {
        description: DataTypes.TEXT
    }, 
    {
        underscored: true,
        tableName: 'delivery',
        instanceMethods: {
        },
        classMethods: {
            associate: function(models) {
                Delivery.belongsTo(models.Truck),
                Delivery.belongsToMany(models.Item, {through: models.DeliveryItems}),
                Delivery.belongsToMany(models.Employee, {through: 'delivery_employees'})
            }
        },
        hooks: {
        }
    });

    return Delivery;
};