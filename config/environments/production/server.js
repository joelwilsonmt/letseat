module.exports = ({ env }) =>
{
    console.log("MY_HEROKU_URL",env("MY_HEROKU_URL"));
   return { url: env("MY_HEROKU_URL"),
    proxy: true,
    app: {
      keys: env.array("APP_KEYS",['keys','keys'])
    }}
  };
