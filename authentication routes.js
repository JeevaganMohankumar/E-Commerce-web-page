const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {

    const hashedPassword =
        await bcrypt.hash(req.body.password, 10);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    await user.save();

    res.json("User Registered");
});

router.post("/login", async (req, res) => {

    const user = await User.findOne({
        email: req.body.email
    });

    if (!user)
        return res.status(404).json("User Not Found");

    const valid =
        await bcrypt.compare(
            req.body.password,
            user.password
        );

    if (!valid)
        return res.status(400).json("Invalid Password");

    const token = jwt.sign(
        { id: user._id, role: user.role },
        "secretkey"
    );

    res.json({ token });
});

module.exports = router;
