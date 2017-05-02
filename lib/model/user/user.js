module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },

        userId: {
            type: DataTypes.INTEGER,
            comment: 'This field holds the internal userId used in Telegram to uniquely specify a user.',
            unique: true
        }
    }, {
            instanceMethods: {
                hasPermission: function (roleNames) {
                    let me = this;
                    return new Promise((resolve) => {
                        if (typeof (roleNames) !== 'object' || !roleNames.hasOwnProperty('length')) {
                            roleNames = [roleNames];
                        }

                        me.getRoles({
                            where: {
                                name: {
                                    $in: roleNames.concat('*')
                                }
                            }
                        }).then(matchingRoles => {
                            resolve(!!(matchingRoles && matchingRoles.length));
                        })
                    });
                }
            }
        }
    );
};