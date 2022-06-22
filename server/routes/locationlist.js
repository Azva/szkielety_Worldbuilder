const router = require("express").Router()
const Location = require("../models/location")
const Project = require("../models/project")

router.get("/", async (req, res) => {
    try{
        const data = await Location.find({"project":req.projectid})
        res.status(200).send(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get Location by ID
router.get('/:id', async (req, res) => {
    try{
        const data = await Location.findById(req.params.id)
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Post new Location
router.post("/post", async (req, res) => {
    if(req.body.project == "" || req.body.name == "" || 
        req.body.type == ""){
        res.status(400).json("Bledne dane")
        return
    }
    const data = new Location({
        project: req.body.project,
        name: req.body.name,
        type: req.body.type,
        closeTo: req.body.closeTo,
        notes: req.body.notes
    })
    try {
        const dataToSave = await data.save()
        const project = await Project.findById({_id: data.project})
        project.containedLocations.push(data);
        await project.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Update Location by ID
router.get('/update/:id', async (req, res) => {
    try{
        const data = await Location.findById(req.params.id)
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post("/update/:id", async (req, res) => {
    if(req.body.name == "" || req.body.type == ""){
        res.status(400).json("Bledne dane")
        return
    }
    try{
        const data = await Location.findById(req.params.id)
        data.name = req.body.name
        data.type = req.body.type
        data.closeTo = req.body.closeTo
        data.notes = req.body.notes
        await data.save()
        res.status(201).json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Delete Location by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Location.findByIdAndDelete(id)
        await Project.findOneAndUpdate(
            {
                "_id": data.project,
            },
            {
                $pull: {
                    "containedLocations": data._id,
                },
            }
        )
        res.send(`Location ${data.name} has been deleted.`)
    }
    catch (error) {
        res.status(400).json({message: error.message })
    }
})

module.exports = router
