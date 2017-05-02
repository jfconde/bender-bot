let Sequelize = require('sequelize'),
    fs = require('fs'),
    dbConfigPath = 'config/database.json';

module.exports = (function () {
    var parseDatabaseConfigurationFn = function (config) {
        var sequelizeObj, db;
        try {
            sequelizeObj = new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
                host: config.dbHost,
                dialect: config.dialect,

                pool: {
                    max: config.pool_max || 10,
                    min: config.pool_min || 0,
                    idle: config.pool_idle || 10000
                },

                // SQLite only
                storage: config.path
            });
        }
        catch (err)  {
            Log.error('wrong database configuration. Sequelize initialization failed.');
        }

        db = {
            Sequelize: Sequelize,
            instance: sequelizeObj,
            // Models
            user: sequelizeObj.import(__dirname + '/model/user/user.js'),
            role: sequelizeObj.import(__dirname + '/model/security/role.js'),
        }

        // Additional FKs
        db.user.belongsToMany(db.role, { through: 'user_roles'});
        db.role.belongsToMany(db.user, { through: 'user_roles'});

        return db;
    };

    try {
        var databaseConfig = JSON.parse(fs.readFileSync(dbConfigPath, 'utf8'));
    }
    catch (err) {
        Log.error('could not open database configuration file (%s).', dbConfigPath);
        return;
    }

    if (!databaseConfig || !databaseConfig.db) {
        Log.error('wrong database configuration.');
        return;
    }

    return parseDatabaseConfigurationFn(databaseConfig.db);
}());