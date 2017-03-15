module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : "Oracle",
      script    : "index.js",
      env: {
        COMMON_VARIABLE: "true"
      },
      env_production : {
        NODE_ENV: "production"
      }
    },
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : "ash",
      host : "121.40.197.93",
      ref  : "origin/master",
      repo : "git@github.com:ashnorseman/oracle-bone.git",
      path : "/home/ash/oracle",
      "post-deploy" : "npm install && npm run build && pm2 startOrRestart ecosystem.config.js --env production"
    }
  }
};
