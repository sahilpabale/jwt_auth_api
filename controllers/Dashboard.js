const Dashboard = (req, res) => {
    if (req.user !== undefined) {
        res.send(`Welcome to Dashboard ${req.user.full_name}`);
    } else {
        res.status(404).json({
            status: "failed",
            message: "User not Authenticated!",
        });
    }
};

module.exports = Dashboard;
