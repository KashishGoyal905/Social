module.exports.home = function (req, res) {
    // from browser sending
    console.log(req.cookies);
    // from codeial_development
    res.cookie('user_id', 20); 

    return res.render('home', {
        title: "Home"
    });
}

// module.exports.actionName = function(req, res){}