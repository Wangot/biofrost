var path = require('path');
// var passwordHelper = require(path.resolve('./models/helpers/password'));

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: {
            type:  DataTypes.STRING(100),
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type:  DataTypes.STRING(100),
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true
            }
        },
        password: DataTypes.STRING(100),
        password_reset_token: DataTypes.STRING(100),
        password_reset_requested_at: DataTypes.DATE,
        status: {
            type: DataTypes.ENUM('ACTIVE', 'INACTIVE'),
            defaultValue: 'ACTIVE'
        }
    },
    {
        underscored: true,
        tableName: 'user',
        instanceMethods: {
        },
        classMethods: {
        associate: function(models) {
                // User.belongsTo(models.Profile),
                User.belongsToMany(models.Role, {through: 'user_roles'})
            }
        },
        hooks: {
            beforeCreate: function(user, options, fn){
                user.password = passwordHelper.hash(user.password);
                fn(null, user);
            },
            beforeUpdate: function(user, options, fn){
                if(user.password && user.password != ''){
                    user.password = passwordHelper.hash(user.password);
                }

                fn(null, user);
            }
        }
    });

    return User;
};