const request = require('supertest');
const app = require('../server.js');
describe('User API', () => {
    it('should return all products', () => {
        const res = request(app).get('/api/products');
        expect(res.statusCode).toEqual(200);
    });

    it('should return a product', () => {
        const res = request(app).get('/api/products/1');
        expect(res.statusCode).toEqual(200);
    });

    it('should create a new product', () => {
        const res = request(app)
            .post('/api/products')
            .send({
                name: 'Pen',
                price: 10
            })
        expect(res.statusCode).toEqual(201)
    })

    it('should delete a user', () => {
        const res = request(app)
            .del('/api/products/3')
        expect(res.statusCode).toEqual(204)
    })

});
