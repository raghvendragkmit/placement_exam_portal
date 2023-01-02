const services = require("../services")
const { commonErrorHandler } = require("../helpers/common-function.helper")

const createExam = async (req, res, next) => {
	try {
		const { body: payload } = req
		const response = await services.examService.createExam(payload)
		res.data = response
		next()
	} catch (error) {
		commonErrorHandler(req, res, error.message, 400, error)
	}
}

const deleteExam = async (req, res, next) => {
	try {
		const { body: payload, params } = req
		const response = await services.examService.deleteExam(payload, params)
		res.data = response
		next()
	} catch (error) {
		commonErrorHandler(req, res, error.message, 400, error)
	}
}

const getAllExam = async (req, res, next) => {
	try {
		const { body: payload } = req
		const response = await services.examService.getAllExam(payload)
		res.data = response
		next()
	} catch (error) {
		commonErrorHandler(req, res, error.message, 400, error)
	}
}

const getAllUpcomingExam = async (req, res, next) => {
	try {
		const { body: payload } = req
		const response = await services.examService.getAllUpcomingExam(payload)
		res.data = response
		next()
	} catch (error) {
		commonErrorHandler(req, res, error.message, 400, error)
	}
}

const startExam = async (req, res, next) => {
	try {
		const { body: payload, params } = req
		const response = await services.examService.startExam(payload, params)
		res.data = response
		next()
	} catch (error) {
		commonErrorHandler(req, res, error.message, 400, error)
	}
}

const submitExam = async (req, res, next) => {
	try {
		const { body: payload, params } = req
		const response = await services.examService.submitExam(payload, params)
		if (response.error) {
			throw new Error(response.error)
		}
		res.data = response.data
		next()
	} catch (error) {
		commonErrorHandler(req, res, error.message, 400, error)
	}
}

const logResponse = async (req, res, next) => {
	try {
		const { body: payload, params } = req
		const response = await services.examService.logResponse(payload, params)
		if (response.error) {
			throw new Error(response.error)
		}
		res.data = response.data
		next()
	} catch (error) {
		commonErrorHandler(req, res, error.message, 400, error)
	}
}

const examResult = async (req, res, next) => {
	try {
		const { body: payload, params } = req
		const response = await services.examService.examResult(payload, params)
		res.data = response
		next()
	} catch (error) {
		commonErrorHandler(req, res, error.message, 400, error)
	}
}

const publishResult = async (req, res, next) => {
	try {
		const { body: payload, params } = req
		const response = await services.examService.publishResult(
			payload,
			params
		)
		if (response.error) {
			throw new Error(response.error)
		}
		res.data = response.data
		next()
	} catch (error) {
		commonErrorHandler(req, res, error.message, 400, error)
	}
}


module.exports = {
	createExam,
	deleteExam,
	getAllExam,
	getAllUpcomingExam,
	startExam,
	submitExam,
	logResponse,
	examResult,
	publishResult,
	checkResult,
}
