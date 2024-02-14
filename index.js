import express from 'express'
import axios from 'axios'
import bodyParser from 'body-parser'
import cors from 'cors'

// Express app
const app = express()

//Router
const router = express.Router()

//port
const port = +process.env.PORT || 3000

// JSON URL
const dataURL = 'https://maza455.github.io/LC_portfolioData/data/'

// Application Middleware
app.use(
    express.json(),
    express.urlencoded({
        extended: true
    }),
    cors(),
    router
)

router.get('^/$|/ejd', (req, res)=> {
    res.json({
        status: res.statusCode,
        msg: 'You\'re home'
    })
})

// /skills
router.get('/skills', async (req, res)=> {
    try{
    let response = await axios.get(dataURL)
    let {skills} = await response.data.
    res.json({
        status: res.statusCode,
        skills
    })
    console.log(skills);
}catch(e) {
    res.json({
        status: res.statusCode,
        msg: 'Please try again later.'
    })
}
})

// /skills/:id
router.get('/skills/:id', async (req, res)=> {
    try{
    let response = await axios.get(`${dataURL}`)
    let {skills} = await response.data.projects.filter(skull => skull.id === req.params.id)
    res.json({
        status: res.statusCode,
        skills: skills[idx]
    })
    console.log(skills)
}catch(e){
    res.json({
        status: res.statusCode,
        msg: 'Please try again lateerr.'
    })
}
})

// /projects/:id
router.get('/projects/:id', async (req, res)=> {
    try {
        let response = await axios.get(`${dataURL}`);
        let projects = response.data.projects.filter(pro => pro.id === req.params.id);
        res.json({
            status: res.statusCode,
            projects
        });
        console.log(projects);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while retrieving the project by id');
    }
});


// /projects (POST)
// router.post('/projects', async (req, res)=> {
//     let response = await axios.post(dataURL, req.body)
//     res.json({
//         status: res.statusCode,
//         projects: response.data
//     })
// })

router.post('/projects', bodyParser, async (req, res) => {
  try {
    const response = await axios.post(dataURL, req.body);
    res.status(response.status).json({
      status: response.status,
      projects: response.data
    });
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json({
        status: error.response.status,
        message: 'An error occured when adding a new data.'
      });
    } else {
      res.status(500).json({
        status: 500,
        message: 'Internal Server Error'
      });
    }
  }
});


// /projects/:id (PATCH)
router.patch('/projects/:id', async (req, res)=> {
    let response = await axios.patch(`${dataURL}${req.params.id}`, req.body)
    res.json({
        status: res.statusCode,
        projects: response.data
    })
})

// /projects/:id (DELETE)
router.delete('/projects/:id', async (req, res)=> {
    let response = await axios.delete(`${dataURL}${req.params.id}`)
    res.json({
        status: res.statusCode,
        projects: response.data
    })
})

// fetch all projects
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})