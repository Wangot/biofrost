module.exports = function(sequelize, DataTypes) {
    var Delivery = sequelize.define("Delivery", {
        code:  DataTypes.TEXT,
        description: DataTypes.TEXT,
        delivery_date: DataTypes.DATE,
        dispatch_time: DataTypes.TIME,
        return_time: DataTypes.TIME
    }, 
    {
        underscored: true,
        tableName: 'delivery',
        instanceMethods: {
        },
        classMethods: {
            associate: function(models) {
                Delivery.belongsTo(models.Truck),
                Delivery.belongsToMany(models.Invoice, {through: 'delivery_invoices'}),
                Delivery.belongsToMany(models.Item, {through: models.DeliveryItems}),
                Delivery.belongsToMany(models.Employee, {through: 'delivery_employees'})
            }
        },
        hooks: {
        }
    });

    return Delivery;
};