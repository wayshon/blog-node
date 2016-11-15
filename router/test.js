module.exports = function (test) {
    test.get("/", function (req, res) {
        res.render("404")
    })
}