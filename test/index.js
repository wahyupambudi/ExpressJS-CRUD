const chai = require('chai')
var expect = chai.expect;
const chaiHttp = require('chai-http')
const app = require('../app')

chai.use(chaiHttp)


var token = ''
describe('Users', () => {
	it('Should be Login and Get Token', (done) => {
		chai.request(app)
		.post('/users/login')
		.send({username: 'citra', password: 'admin'})
		.end((err, res) => {
			expect(res).to.have.status(200)
			expect(res).to.be.json
			expect(res).to.have.property('message')
			expect(res.body.message).to.equal('Success Login')
			expect(res).to.have.property('data')
			expect(res.body.data).to.have.property('token')
			token = res.body.data.token
			done()
		})
	})
	it('Should give error when username or password wrong',() => {
		chai.request(app)
		.post('/users/Login')
		.send({username: 'citra', password: 'admsin'})
		.end((err, res) => {
			expect(res).to.have.status(403)
			expect(res).to.be.json
			expect(res).to.have.property('message')
			expect(res.body.message).to.equal('Invalid Login')
		})
	})
})

describe('Crud Siswa', () => {
	it('Should get Data Siswa', () => {
		chai.request(app)
		.get('/siswas')
		.set('token', token)
		.end((err, res) => {
			expect(res).to.have.status(200)
			expect(res).to.be.json
			expect(res).to.have.property('message')
			expect(res.body.message).to.equal('Read data Siswa')
			expect(res).to.have.property('data')
			expect(res.body.data).to.be('array')
		})
	})
})
// describe('Perhitungan', () => {
// 	it('Perhitungan Pertambahan', () => {
// 		const hasil = 6*2;
// 		expect(hasil).to.equal(12)
// 	})
// })