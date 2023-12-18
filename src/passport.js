import passport from "passport";
import { UserManager } from "./managers/UsersManager.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy} from "passport-google-oauth20";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { hashData, compareData } from "./utils.js";

//local
passport.use('signup', new LocalStrategy({ passReqToCallback: true, usernameField: 'email'},
    async(req, email, password, done)=> {
    const {first_name,last_name} = req.body
    if(!first_name || !last_name || !email || !password ){
        return done(null, false)
    }
    try {
        const hashedPassword = await hashData(password);
        const createdUser = await UserManager.createOne({...req.body, password: hashedPassword});
        done(null, createdUser)
    } catch (error) {
        done(error)
    }
}));

passport.use('login', new LocalStrategy({usernameField: 'email'}, async(email, password, done) =>{
    if(!email || !password){
        return done(null, false, {message: "All fields are required"})
    }
    try {
        const user = await UserManager.findByEmail(email);
        if(!user) {
            return done(null, false, { message: "Incorrect email or password." });
        }
        const isPasswordValid = await compareData(password,user.password);
        if(!isPasswordValid) {
            return done(null, false, { message: "Incorrect email or password." });
        }
        done(null, user);
    } catch (error) {
        done(error)
    }
}))

//github
passport.use('github', new GithubStrategy(
    {
        clientID: 'Iv1.7115b023640c0835',
        clientSecret: '868c48924197b3d52554fe25f5f64b468df4b917',
        callbackURL: "http://localhost:8080/api/sessions/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        try {
            const userDB = await UserManager.findByEmail(profile._json.email);
            //login
            if(userDB){
                if(userDB.isGithub){
                    return done(null, userDB)
                } else {
                    return done(null, false)
                }
            }
            //signup
            const infoUser ={
                first_name: profile._json.name.split(' ')[0],
                last_name: profile._json.name.split(' ')[1],
                email: profile._json.email,
                password: ' ',
                isGithub: true
            };
            const createdUser = await UserManager.createOne(infoUser);
            done(null, createdUser);
        } catch (error) {
            done(error)
        }
    }
))

//google
passport.use('google', new GoogleStrategy(
    {
        clientID: '884964685837-rao0ap2rage38fi1jbmg6sck00uurco7.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: "http://localhost:8080/api/sessions/auth/google/callback"
    },
    async function(accessToken, refreshToken, profile, done){
        try {
            const userDB = await UserManager.findByEmail(profile._json.email);
            //login
            if(userDB){
                if(userDB.isGoogle){
                    return done(null, userDB)
                } else {
                    return done(null, false)
                }
            }
            //signup
            const infoUser ={
                first_name: profile._json.given_name,
                last_name: profile._json.family_name,
                email: profile._json.email,
                password: ' ',
                isGoogle: true
            };
            const createdUser = await UserManager.createOne(infoUser);
            done(null, createdUser);
        } catch (error) {
            done(error)
        }
    }
  ))

const fromCookies = (req) => {
    return req.cookies.token;
}

//JWT
passport.use('jwt', new JWTStrategy({
    //jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    jwtFromRequest: ExtractJwt.fromExtractors([fromCookies]),
    secretOrKey:'secretJWT',
}, (jwt_payload, done) => {
    done(null, jwt_payload)
}))

passport.serializeUser((user, done) =>{
    // _id
    done(null, user._id);
});

passport.deserializeUser(async(id, done) =>{
    try {
        const user = await UserManager.findById(id);
        done(null,user);
    } catch (error) {
        done(error);
    }
});