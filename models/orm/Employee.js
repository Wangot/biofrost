module.exports = function(sequelize, DataTypes) {
    var Employee = sequelize.define("Employee", {
        ref_id: {
            type: DataTypes.INTEGER
        },
        company_type: {
            type: DataTypes.ENUM('MERCHANT', 'CLIENT')
        },
        first_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        last_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        middle_name: {
            type: DataTypes.STRING(100)
        },
        birthday: {
            type:  DataTypes.DATE
        },
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
        tableName: 'employee',
        instanceMethods: {
        },
        classMethods: {
            associate: function(models) {
                Employee.belongsTo(models.Merchant, {constraints: false, foreignKey: 'ref_id'}),
                Employee.belongsTo(models.Client, {constraints: false, foreignKey: 'ref_id'})
            }
        },
        hooks: {
        }
    });

    return Employee;
};