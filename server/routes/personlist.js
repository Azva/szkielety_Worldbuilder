const router = require("express").Router()
const Person = require("../models/person")
const Project = require("../models/project")

router.get("/", async (req, res) => {
    try{
        const data = await Person.find({"project":req.projectid})
        res.status(200).send(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get Person by ID
router.get('/:id', async (req, res) => {
    try{
        const data = await Person.findById(req.params.id)
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Post new Person
router.post("/post", async (req, res) => {
    if(req.body.project == "" || req.body.name == "" || 
        req.body.race == "" || req.body.classs == "" ||
        req.body.age == /^(\d)+$/){
        res.status(400).json("Bledne dane")
        return
    }
    const data = new Person({
        project: req.body.project,
        name: req.body.name,
        race: req.body.race,
        classs: req.body.classs,
        age: req.body.age,
        personality: req.body.personality,
        special: req.body.special
    })
    try {
        const dataToSave = await data.save()
        const project = await Project.findById({_id: data.project})
        project.containedPersons.push(data);
        await project.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Update Person by ID
router.get('/update/:id', async (req, res) => {
    try{
        const data = await Person.findById(req.params.id)
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post("/update/:id", async (req, res) => {
    if(req.body.name == "" || 
        req.body.race == "" || req.body.classs == "" ||
        req.body.age == /^(\d)+$/){
        res.status(400).json("Bledne dane")
        return
    }
    try{
        const data = await Person.findById(req.params.id)
        data.name = req.body.name
        data.race = req.body.race
        data.classs = req.body.classs
        data.age = req.body.age
        data.personality = req.body.personality
        data.special = req.body.special
        await data.save()
        res.status(201).json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Delete Person by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Person.findByIdAndDelete(id)
        await Project.findOneAndUpdate(
            {
                "_id": data.project,
            },
            {
                $pull: {
                    "containedPersons": data._id,
                },
            }
        )
        res.send(`Person ${data.name} has been deleted.`)
    }
    catch (error) {
        res.status(400).json({message: error.message })
    }
})

module.exports = router
