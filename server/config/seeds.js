const db = require('./connection');
const { User, Exercises } = require('../models');

db.once('open', async () => {
    await User.deleteMany();

    await User.create({
        username: 'Jeff',
        email: 'Jeff@email.com',
        password: 'password123'
    });

    await User.create({
        username: 'Genevieve',
        email: 'Genevieve@email.com',
        password: 'password123'
    });
    await User.create({
        username: 'katelynking',
        email: 'katelynking112@gmail.com',
        password: 'password'
    });

    console.log('users seeded');
    
});