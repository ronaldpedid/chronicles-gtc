module.exports = {
    apps: [{
        name: 'www',
        script: './bin/www',
        watch: true,
        env: {
            NODE_ENV: 'production',
            MONGO_CS: 'mongodb://162.243.86.154:27017'
        },
        env_production: {
            NODE_ENV: 'production',
            MONGO_CS: 'mongodb://162.243.86.154:27017'
        }
    }]
};