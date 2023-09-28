const express = require("express");
const User = require("./user");

const router = express.Router();

router.get("/", async (req,res) => {
    try{
        res.json({success: true});
    }catch(error){
        res.status(500).send(error.message);
    }
});

//Create a new User
router.post("/users", async (req,res) => {
    try {
        const {name,role} = req.body;
        const user = new User({name,role});
        await user.save();
        res.json({success:true});
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//Retrieves all users
router.get("/users", async (req,res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//Update a user
router.put("/users/:id", async (req,res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{
            new : true
        });
        if(!user) throw new Error("User not found");
        res.json({success: true});
    } catch (error) {
       res.status(500).send(error.message); 
    }
});

//Delete a user
router.delete("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user) throw new Error("User not found");
        res.json({success:true})
    } catch (error) {
        res.status(500).send(error.message);
    }
    
});

module.exports = router;