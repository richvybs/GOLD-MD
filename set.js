const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEVOZU9JQzQ0VTF6M1Q0dlBDa0ZiWlI4YnJla0lDbTcrRjdUaTlKQWNtYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaHFmSGtUQkY3eURURWo1OElqRk1VOFlkejdOcG1HNmc0TVRlYmJFK0d6RT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnRCswRkFkcGYvN2QzNitodzJLRmk4L2ZBY3k2KzVxTCs0S09yenpEVFdFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJOWVpzbW9zZEpSZld6eEQ3bExxL01OeGVOVVJSemdxcHQ4Q1kzdlcrQlEwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9GTnRzczhPYzBlRktwVkhmZm00Zk5pV1NaeTNiTHZvRVloTC9mbzREM0E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZMbkF0c0RvMWg5Zm9WTFBNUmhDTzRpd1NZRW1jemEyRHZwK2ROZHB4MlE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEFFaTh0djRCUUlsZ09IZGUrZmFqSUtJOFlXZ3B6VDk1YUtYWVFYVEhrZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidGRYR1Q1eXJQeU4ybWExZ3ZodytjcWdYRC9uQmtMS3NqR3lQdDNBR0pUcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlQzNXhnY1ZSQk92TnZqSUI4c0N2SkI5cVRMY1NJbmZmdWxrcXpKd2hHYVp0b0YvM2ZybTVHZmF3V0dKcjk5TGllZ1dsazdPallQbzlzNWFSM1VHMUJnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg2LCJhZHZTZWNyZXRLZXkiOiI2WDFHd29QOS9CanAvamMxRXlWaGU1WjlnRTBNWXJNRnhvRis3VWoxNlhFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzMzIwMTgxNzk1OUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJFQjA5RTlFRUE5RjkyNURFNEFGOTdCMjRENjI0NEY1RSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzE1MDE3ODc3fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzMyMDE4MTc5NTlAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiM0ZGOUZDQTg5NjE4RTU5NEFFQThERDY3RTg2RjMzQjEifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcxNTAxNzg3N31dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoibFR4VnFsNjZTb2lSMUlhQUdFYU1XUSIsInBob25lSWQiOiIxODQzZmIxZS01ZmNlLTRlNWQtYmQ1Ny1mNmViNmE4YmJhOTkiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQjEvc3p3WndhV2ZtWk9QY29pZGZtMmZ3WG1NPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImhodER0dFFKeXU0bTVJVlI3RlFVZllibUVvUT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJKNkVIV00yNiIsIm1lIjp7ImlkIjoiMjMzMjAxODE3OTU5OjFAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiVU1FUiBGQVJPT1EifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0tEOXNySUZFSVd4NUxFR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Im9xWktoZjhId2Z0M1VGYnh0TEF0NGVVOTFTcStVcXk0R0hPY1A0S0E2Vmc9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlNoeFZUYjErN1hQSndyTitJRGd5R08ybUtHOVN1RVpJSFZzQWxQa3p0VWtNeVQ0b1lMaWRDYWxIa3VtQTMwc3h3RlhZUlhYZFh5YTF5R3p2eCtiTERRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJZeGFOcE9NUndEMlR1R1liaEdUM0FSd29nSDNvNWs4OTk1UEMzMHZtQklkZVEvdWM1Q3BZdnZCM3VKK2hkZnNUS3ZjNi9UbUZ0NHc3ZGozcUlNOTNDdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzMzIwMTgxNzk1OToxQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmFLbVNvWC9COEg3ZDFCVzhiU3dMZUhsUGRVcXZsS3N1Qmh6bkQrQ2dPbFkifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MTUwMTc4NzQsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQnRDIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "UMAR",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "923158930864",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "oui",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '',
    URL : process.env.BOT_MENU_LINKS || 'https://i.postimg.cc/1XQq5DzP/pictures-white949544-GOjsnnsnznznzbzbbzbz7777-GOLDLD-PIC.png',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
