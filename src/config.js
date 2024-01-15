import dotenv from 'dotenv'

dotenv.config();

export default {
    mongo_uri: process.env.MONGO_URI,
    secret_jwt: process.env.SECRET_KEY_JWT,
    google_clientid: process.env.GOOGLE_CLIENT_ID,
    google_clientsecret: process.env.GOOGLE_CLIENT_SECRET,
    github_clientid: process.env.GITHUB_CLIENT_ID,
    github_clientsecret: process.env.GITHUB_CLIENT_SECRET
};
