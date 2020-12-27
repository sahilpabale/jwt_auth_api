const HomePage = require("../controllers/HomePage");

const router = require("express").Router();
const homePage = require("../controllers/HomePage");
const register = require("../controllers/Register");
const login = require("../controllers/Login");
const dashboard = require("../controllers/Dashboard");
const verifyEmail = require("../controllers/VerifyEmail");

// import checkauth middleware
const checkAuth = require("../middlewares/checkAuth");

// routes
router.get("/", homePage);

router.post("/login", login);

router.post("/register", register);

router.get("/verify/:token", verifyEmail);

router.get("/dashboard", checkAuth, dashboard); // protected route

module.exports = router;
