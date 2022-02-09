
module.exports = {
    postgresqldb: {
        local: {
            host: process.env.PG_HOST ||'localhost', 
            user: process.env.PG_USER ||'postgres' ,
            password: process.env.PG_PASSWD ||'password', 
            database: process.env.PG_DBNAME ||'postgres' ,
            port: process.env.PG_PORT || 5432,
            connectionTimeoutMillis: process.env.PG_CONNECT_TIMEOUT || 25000,
            idleTimeoutMillis: process.env.PG_IDLE_TIMEOUT || 10000,
            max: process.env.PG_MAX_POOL || 400
        },
        db: {

        }
    }
}