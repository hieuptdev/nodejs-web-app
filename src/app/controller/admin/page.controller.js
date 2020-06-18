const User = mongoose.model('User')
modules.exports.navbar = function (req, res) {
    // const users = req.session.user.user_full
    res.render('/admin/layout/nav-bar', {
        users
    })
}