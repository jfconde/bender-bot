let Sequelize = require('sequelize'),
    fs = require('fs'),
    dbConfigPath = 'config/database.json',
    dbEncoding = 'utf8';

module.exports = (function () {
    var parseDatabaseConfigurationFn = function (config) {
        var sequelizeObj;
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

        return sequelizeObj;
    };

    try {
        var databaseConfig = JSON.parse(fs.readFileSync(dbConfigPath, dbEncoding));
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