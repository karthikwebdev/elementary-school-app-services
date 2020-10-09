const express = require('express');
const router = express.Router();
const Parent = require('../models/parents');

router.post('/add',(req,res)=>{
    const parent = new Parent(req.body)
    parent.save((err,docs)=>{
        if(err){
            console.log(err)
            return res.status(400).json({
                error:'Something went wrong'
            })
        }
        return res.json({
            message:'parent added successfully',
            docs
        })
    })
})



module.exports = router; 