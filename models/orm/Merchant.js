module.exports = function(sequelize, DataTypes) {
    var Merchant = sequelize.define("Merchant", {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        description: DataTypes.TEXT,
        email: {
            type:  DataTypes.STRING(100),
            validate: {
                isEmail: true
            }
        },
        telephone: DataTypes.STRING(100),
        mobile: DataTypes.STRING(100),
        address: DataTypes.STRING,
        city: DataTypes.STRING(100),
        zip_code: DataTypes.STRING(10)
    }, 
    {
        underscored: true,
        tableName: 'merchant',
        instanceMethods: {
        },
        classMethods: {
            associate: function(models) {
                Merchant.hasMany(models.Employee, {constraints: false, foreignKey: 'ref_id', scope: {company_type: 'MERCHANT'}})
            }
        },
        hooks: {
        }
    });

    return Merchant;
};