require("dotenv").config()

module.exports = {
    client:"mysql",
    connection:{
    host:  process.env.HOST,
    port: process.env.PORT || 3306,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    },
    migrations:{
        tableName: "knex_migrations"
    }
}