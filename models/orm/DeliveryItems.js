module.exports = function(sequelize, DataTypes) {
    var DeliveryItems = sequelize.define("DeliveryItems", {
        description: DataTypes.TEXT,
        quantity: DataTypes.INTEGER
    }, 
    {
        underscored: true,
        tableName: 'delivery_items',
        instanceMethods: {
        },
        classMethods: {
            associate: function(models) {
                DeliveryItems.belongsTo(models.Delivery)
            }
        },
        hooks: {
        }
    });

    return DeliveryItems;
};