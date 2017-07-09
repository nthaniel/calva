const pgp = require('pg-promise')();
const connectionString = 'postgres://localhost:5432/calva';
const db = pgp(connectionString);

const seedData = require('./seedData.js');

db.none('insert into users(name, email)' +
    'values(${name}, ${email})',
    { 
        name: 'Doug Edwards',
        email: 'dedwards@gmail.com'
    });

const artistNames = {};
const sellerNames = {};

const artists = [];
const sellers = [];
const art_objects = [];
const promises = [];

seedData.forEach((row) => {
    if (!artistNames[row['Artist']]) {
        artistNames[row['Artist']] = true;
        artists.push({
            name: row['Artist'] || null,
            address: row["Artist address"] || null,
            bio: row["Artist bio"] || null,
            email: row["Artist email"] || null,
            nationality: row["Artist nationality"] || null,
            website: row["Artist website"] || null,
        });
    }

    if (!sellerNames[row['Seller name']]) {
        sellerNames[row['Seller name']] = true;
        sellers.push({
            address: row["Seller address"] || null,
            email: row["Seller email"] || null,
            name: row["Seller name"] || null,
            notes: row["Seller notes"] || null,
            phone: row["Seller phone number"] || null,
            website: row["Seller website"] || null,
        });
    }

    const art = {
        title: row["Title"] || null,
        user: 1,
        value: row["Value"] || 0,
        art_type: row["Art type"] || null,
        cost: row["Cost"] || 0,
        date_created: row["Date created"] || null,
        date_purchased: row["Date purchased"] || null,
        description: row["Description"] || null,
        history: row["History"] || null,
        location: row["Location"] || null,
        medium: row["Medium"] || null,
        notes: row["Notes"] || null,
        place_created: row["Place created"] || null,
        price: row["Price"] || 0,
        subject: row["Subject"] || null
    };

    if (row.subject){
        const tags = row.subject.toLowerCase().trim();
        tags.replace(', and ', ' ');
        tags.replace(' and ', ', ');
        tags.replace(' - ', ', ');
        if (tags.contains(', ') || tags.split(' ').length <= 3) {
            tags = tags.split(', ');
        }
        
        tags = JSON.stringify(tags);

        art.tags = tags;
    }

    art_objects.push(art);

});

artists.forEach((artist) => {
    if (artist.name) {
        promises.push(
            db.none(`insert into artists(${Object.keys(artist).join(', ')}) 
                values(${Object.keys(artist).map(key => '${' + key + '}').join(', ')})`,
                artist)
        );

    }
});

sellers.forEach((seller) => {
    if (seller.name) {
        promises.push(
            db.none(`insert into sellers(${Object.keys(seller).join(', ')}) 
                values(${Object.keys(seller).map(key => '${' + key + '}').join(', ')})`,
                seller)
        );
    }
});

function formatDate(date) {
    if (date && date.length === 4) {
        date = '1/1/' + date;
    }
    return date;
}

Promise.all(promises)
    .then(() => {
        console.log('hooray!');
        seedData.forEach((row) => {
            Promise.all([
                db.oneOrNone('select id from artists where name=${name}', { name: row['Artist'] }),
                db.oneOrNone('select id from sellers where name=${name}', { name: row['Seller name'] })
            ]).then((results) => {
                const art_object = {
                    title: row["Title"] || 'untitled',
                    user_id: 1,
                    artist_id: results[0] ? results[0].id : null,
                    seller_id: results[1] ? results[1].id : null,
                    value: row["Value"] || 0,
                    art_type: row["Art type"] || null,
                    cost: row["Cost"] || 0,
                    date_created: formatDate(row["Date created"] + '') || null,
                    date_purchased: formatDate(row["Date purchased"] + '') || null,
                    description: row["Description"] || null,
                    history: row["History"] || null,
                    location: row["Location"] || null,
                    medium: row["Medium"] || null,
                    notes: row["Notes"] || null,
                    place_created: row["Place created"] || null,
                    price: row["Price"] || 0,
                    subject: row["Subject"] || null
                };

                if (art_object.subject){
                    let tags = art_object.subject.toLowerCase().trim();
                    tags.replace(', and ', ' ');
                    tags.replace(' and ', ', ');
                    tags.replace(' - ', ', ');
                    if (tags.includes(', ') || tags.split(' ').length <= 3) {
                        tags = tags.split(', ');
                    }
                    
                    tags = JSON.stringify(tags);

                    art_object.tags = tags;
                }

                db.none(`insert into art_objects(${Object.keys(art_object).join(', ')}) 
                    values(${Object.keys(art_object).map(key => '${' + key + '}').join(', ')})`,
                    art_object);
            }).catch(err => console.error(err));
        });
    })
    .catch(err => console.error(err));
