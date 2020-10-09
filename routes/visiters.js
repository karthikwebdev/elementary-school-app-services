const express = require('express');
const router = express.Router();
const Visiters = require('../models/visiters');
const Parent = require('../models/parents');

router.post('/all',(req,res)=>{
    const { date } = req.body
    Visiters.findOne({date},(err,docs) => {
        if(err){
            console.log(err)
            return res.status(500).json({
                error:'something went wrong'
            })
        }
        if(!docs){
            const visiters = new Visiters({date})
            visiters.save((err,createdDocs)=>{
                if(err){
                    console.log(err)
                    return res.status(500).json({
                        error:'something went wrong'
                    })
                }
                Parent.find({})
                    .then(docs => {
                        return res.json({
                            docs,
                            message:'parents retrieved successfully'
                        })
                    })  
                    .catch(err => {
                        console.log(err)
                        return res.status(500).json({
                            error:'something went wrong'
                        })
                    })  
            })
        }else{
            Parent.find({_id: { "$nin":docs.visiters.map(visiter => visiter.parentId) }})
                .then(data =>{
                    return res.json({
                        message:'retrieved users',
                        docs:data
                    })
                })
                .catch(err => {
                    console.log(err)
                    return res.status(500).json({
                        error:'something went wrong'
                    })
                })
        }
    })
})

router.post('/date',(req,res) => {
    const { date } = req.body
    Visiters.findOne({date})
        .then(docs => {
            if(docs){
                Parent.populate(docs,{
                    path:"visiters.parentId"
                },(err,docs) => {
                    if(err){
                        console.log(err)
                        return res.json({
                            error:'something went wrong'
                        })
                    }
                    let sortedDocs = docs.visiters.slice().sort((a,b) => a.timeStamp - b.timeStamp)
                    return res.json({
                        docs:sortedDocs
                    })
                })
            } else {
                return res.json({
                    message:'no Data on this Date'
                })
            }
        })
        .catch(err => {
            console.log(err)
            return res.json({
                error:"something went wrong"
            })
        })
})

router.post('/add/one',(req,res) => {
    const { date,parentId } = req.body
    Visiters.findOne({date})
        .then(visiters => {
            visiters.visiters.push({
                parentId,
                timeStamp:new Date()
            })
            visiters.save((err,docs) => {
                if(err){
                    console.log(err)
                    return res.status(400).json({
                        error:'parent already Added'
                    })
                }
                return res.json({
                    message:"visiter added successfully"
                })
            })
        })
        .catch(err => {
            console.log(err)
            return res.status(400).json({
                error: 'something went wrong'
            })
        })
})


module.exports = router; 