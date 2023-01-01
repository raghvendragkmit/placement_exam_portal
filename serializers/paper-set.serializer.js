const createPaperSet = async (req, res, next) => {
	const data = res.data || null

	const response = {
		id: data.id,
		subjectId: data.subject_id,
		paperSetName: data.paper_set_name,
		marksPerQuestion: data.marks_per_question,
	}

	res.data = response
	next()
}

const getALlPaperSet = async (req, res, next) => {
	const data = res.data || null

	const response = []

	data.forEach((obj) => {
		const tempObj = {
			id: obj.id,
			subjectId: obj.subjects.id,
			subjectName: obj.subjects.subject_name,
			paperSetName: obj.paper_set_name,
			marksPerQuestion: obj.marks_per_question,
		}
		response.push(tempObj)
	})

	res.data = response
	next()
}

module.exports = {
	createPaperSet,
	getALlPaperSet,
}
