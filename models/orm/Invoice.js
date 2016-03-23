module.exports = function(sequelize, DataTypes) {
    var Invoice = sequelize.define("Invoice", {
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
        },
        amount_paid: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0
        },
        total_cost: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0
        }
    }, 
    {
        underscored: true,
        tableName: 'invoice',
        instanceMethods: {
        },
        classMethods: {
            associate: function(models) {
                Invoice.belongsTo(models.Client),
                Invoice.hasMany(models.Payment),
                Invoice.belongsToMany(models.Item, {through: models.InvoiceItems}),
                Invoice.belongsToMany(models.Delivery, {through: 'delivery_invoices'})
            }
        },
        hooks: {
        }
    });

    return Invoice;
};