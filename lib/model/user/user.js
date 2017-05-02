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
        },

        userName: {
            type: DataTypes.STRING
        },

        firstName: {
            type: DataTypes.STRING
        },

        lastName: {
            type: DataTypes.STRING
        }
    }, {
            instanceMethods: {
                hasPermission: function (roleNames, includeSuperAdmin = true) {
                    let me = this;
                    return new Promise((resolve) => {
                        if (typeof (roleNames) !== 'object' || !roleNames.hasOwnProperty('length')) {
                            roleNames = [roleNames];
                        }

                        me.getRoles({
                            where: {
                                name: {
                                    $in: includeSuperAdmin ? roleNames.concat('*') : roleNames
                                }
                            }
                        }).then(matchingRoles => {
                            resolve(!!(matchingRoles && matchingRoles.length));
                        })
                    });
                },

                addRoleByName: function (roleName) {
                    let me = this;
                    return new Promise((resolve, reject) => {
                        me.hasPermission(roleName).then(userHasPermission => {
                            if (userHasPermission, false) {
                                resolve(true);
                            } else {
                                DB.role.find({
                                    where: {
                                        name: roleName
                                    }
                                }).then(role => {
                                    if (role) {
                                        me.addRole(role.get('id')).then(newRole => {
                                            resolve(true, newRole);
                                        }).error(() => reject());
                                    } else {
                                        reject();
                                    }
                                }).error(() => reject());
                            }
                        });
                    });
                }
            }
        }
    );
};