var bkfd2Password = require('pbkdf2-password');
var hash = bkfd2Password();

var adminUser = {
    soon : {name: 'soon', password: 'myblog', isLogin: false}
}

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


export default function handler(req, res) {
    if (req.method === 'POST'){
        const {user, password} = req.body;
        if (!user || !password){
            return res.status(428).json({text: "username or password required", user: null});
        }
        authenticate(user, password, function(err, user) {
            if (user) return res.status(200).json({text: "success", user: user});
            if (err) return res.status(401).json({text: "fail", user: null});
        })
    } else if (req.method === "GET") {
        res.status(500).json(user)
    } else {
        res.status(500).json({text: "OTHER"})
    }
}