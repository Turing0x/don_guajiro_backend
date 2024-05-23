const mongoose = require('mongoose')

export const dbConnection = async () => {
  try {
    mongoose.set('strictQuery', true)

    mongoose.connect(process.env.MONGO_URL)
    console.clear()
    console.log('Base de datos Online')
  } catch (error) {
    throw new Error('Error en la base de datos')
  }
}

module.exports = {
  dbConnection
}
