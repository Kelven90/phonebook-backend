const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb://laikelven90_db_user:${password}@ac-ej3z5vc-shard-00-00.0cvyluu.mongodb.net:27017,ac-ej3z5vc-shard-00-01.0cvyluu.mongodb.net:27017,ac-ej3z5vc-shard-00-02.0cvyluu.mongodb.net:27017/?ssl=true&replicaSet=atlas-3zqv9k-shard-0&authSource=admin&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    Person.find({}).then(persons => {
        console.log('phonebook:')
        persons.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })

        mongoose.connection.close()
    })
} else if (process.argv.length === 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })

    person.save().then(() => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
    })
} else {
    console.log('Usage:')
    console.log('node mongo.js <password>')
    console.log('node mongo.js <password> <name> <number>')
    mongoose.connection.close()
}