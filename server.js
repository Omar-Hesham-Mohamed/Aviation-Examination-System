const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const allRoutes = require('express-list-endpoints')

// Setup express app
const app = express()

const loggerMiddleware = require('./api/middleware/logger')

const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(loggerMiddleware)

//routes
const users = require('./api/routes/user.router')
const superUser = require('./api/routes/superUser.router')

//explore
const explore = (req, res) => {
	const routes = allRoutes(app)
	const result = {
		ServiceList: [],
	}
	routes.forEach((route) => {
		const name = route.path.split('/')[4]
		result.ServiceList.push({
			Service: {
				name,
				fullUrl: route.path,
			},
		})
	})
	return res.json(result)
}

//route handle
app.use('/api/users/', users)
app.use('/api/super/', superUser)
app.use('/explore', explore)

// Configure Mongo
const db =
	'mongodb+srv://Andrew:1234512345Aa@cluster0.scgjd.mongodb.net/<dbname>?retryWrites=true&w=majority'

// Connect to Mongo with Mongoose
mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log('Mongo connected'))
	.catch((err) => console.log(err))

// Specify the Port where the backend server can be accessed and start listening on that port
const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Server up and running on port ${port}.`))
