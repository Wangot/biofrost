module.exports = function(sequelize, DataTypes) {
    var Item = sequelize.define("Item", {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        description: DataTypes.TEXT,
        price: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0
        }
    }, 
    {
        underscored: true,
        tableName: 'item',
        instanceMethods: {
        },
        classMethods: {
            associate: function(models) {
                Item.belongsToMany(models.Delivery, {through: models.DeliveryItems}),
                Item.belongsToMany(models.Invoice, {through: models.InvoiceItems})
            }
        },
        hooks: {
        }
    });

    return Item;
};