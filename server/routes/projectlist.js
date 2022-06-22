const router = require("express").Router()
const Project = require("../models/project")
const Person = require("../models/person")
const Location = require("../models/location")

router.get("/", async (req, res) => {
    try{
        const data = await Project.find()
        res.status(200).send(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get Project by ID
router.get('/:id', async (req, res) => {
    try{
        const data = await Project.findById(req.params.id)
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Post new Project
router.post("/post", async (req, res) => {
    if(req.body.name == ""){
        res.status(400).json("Bledne dane")
        return
    }
    const data = new Project({
        name: req.body.name
    })
    try {
        const dataToSave = await data.save()
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Update Project by ID
router.get('/update/:id', async (req, res) => {
    try{
        const data = await Project.findById(req.params.id)
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post("/update/:id", async (req, res) => {
    if(req.body.name == ""){
        res.status(400).json("Bledne dane")
        return
    }
    try{
        const data = await Project.findById(req.params.id)
        data.name = req.body.name
        await data.save()
        res.status(201).json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Delete Project by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        //delete all child elements
        const pr = await Project.findById(id)
        pr.containedPersons.forEach(async el => {
            el = el.toString()
            await Person.findByIdAndDelete(el)
        })
        pr.containedLocations.forEach(async el => {
            el = el.toString()
            await Locations.findByIdAndDelete(el)
        })
        /*
        pr.containedItems.forEach(async el => {
            el = el.toString()
            await Item.findByIdAndDelete(el)
        })
        pr.containedHistoricEvents.forEach(async el => {
            el = el.toString()
            await HistoricEvent.findByIdAndDelete(el)
        })
        */

        const data = await pr.delete()
        res.send(`Project ${data.name} has been deleted.`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router
