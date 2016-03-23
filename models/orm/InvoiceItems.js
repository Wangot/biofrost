module.exports = function(sequelize, DataTypes) {
    var InvoiceItems = sequelize.define("InvoiceItems", {
        description: DataTypes.TEXT,
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        price: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, 
    {
        underscored: true,
        tableName: 'invoice_items',
        instanceMethods: {
        },
        classMethods: {
            associate: function(models) {
                InvoiceItems.belongsTo(models.Invoice)
            }
        },
        hooks: {
        }
    });

    return InvoiceItems;
};