module.exports = function(sequelize, DataTypes) {
    var Role = sequelize.define("Role", {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        description: DataTypes.TEXT
    }, 
    {
        underscored: true,
        tableName: 'role',
        instanceMethods: {
        },
        classMethods: {
            associate: function(models) {
            }
        },
        hooks: {
        }
    });

    return Role;
};