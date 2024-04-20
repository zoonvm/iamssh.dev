import { withIronSessionApiRoute } from "iron-session/next";
import  bkfd2Password  from "pbkdf2-password";
import { sessionOptions } from "lib/session";

var adminUser = {
    soon : {name: 'soon', password: process.env.ADMIN_PASSWORD, isLogin: false}
}

var hash = bkfd2Password();
hash({ password: adminUser.soon.password }, function (err, pass, salt, hash){
    if (err) throw err;
    adminUser.soon.salt = salt;
    adminUser.soon.hash = hash;
});

// Authenticate using our plain-object database of doom!
function authenticate(name, pass, fn) {
    if (!module.parent) console.log('authenticating %s:%s', name, pass);
    var user = adminUser[name];
    // query the db for the given username
    if (!user) return fn(new Error('Cannot find user.'))
    // apply the same algorithm to the POSTed password, applying
    // the hash against the pass / salt, if there is a match we
    // found the user
    hash({ password: pass, salt: user.salt }, function (err, pass, salt, hash) {
      if (err) return fn(err);
      if (hash === user.hash) return fn(null, user)
      fn(new Error("Invalid Password."))
    });
}


export default withIronSessionApiRoute(
    async function loginRoute(req, res){
        const { username , password } = req.body;
        if (!username || !password){
            return res.status(428).json({text: "username or password required", user: null});
        }
        
        authenticate(username, password, async function(err, user) {
            if (user) {
                const loginUser = { isLoggedIn: true, username: user.name};
                req.session.user = loginUser
                await req.session.save();
                res.status(200).json(loginUser);
            }
            if (err) return res.status(401).json({text: "fail", user: null});
        })
    },
    sessionOptions
);