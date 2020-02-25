require('dotenv').config();
const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('GET /movie', () => {
    it('should return a filtered movie list passed a good param', () => {
        return supertest(app)
            .get('/movie')
            .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
            .query({'genre' : 'horror'})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf.at.least(1);
                const movie = res.body[0];

                expect(movie).to.include.all.keys(
                    'year', 'director', 'genre', 'country', 'avg_vote'
                );
            })
    });

    // it('Should throw error on bad param term', () => {
    //     return supertest(app)
    //         .get('/movie')
    //         .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
    //         .query({foo : 'bar'})
    //         .expect(400, 'bad param, need to be genre:str, country:str, or avg_vote:num');
    // });

});
