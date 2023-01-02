const examResult = async (req, res, next) => {
	const data = res.data || null

	const response = []

	data.forEach((result) => {
		const studentResult = result.result ? "Pass" : "Fail"
		const tempObj = {
			userId: result.user_id,
			paperSetId: result.paper_set_id,
			startTime: result.start_time,
			submitTime: result.submit_time,
			totalQuestions: result.total_questions,
			totalQuestionAttempted: result.total_question_attempted,
			totalCorrectAnswers: result.total_correct_answers,
			totalMarksObtained: result.total_marks_obtained,
			result: studentResult,
		}
		response.push(tempObj)
	})
	res.data = response
	next()
}

const examQuestionAnswer = async (req, res, next) => {
	const data = res.data || null
	const response = []

	data.forEach((questionAnswer) => {
		const answers = []

		questionAnswer.answers.forEach((answer) => {
			const tempObj = {
				id: answer.id,
				answerDescription: answer.answer_description,
			}
			answers.push(tempObj)
		})

		const tempObj = {
			id: questionAnswer.id,
			questionDescription: questionAnswer.question_description,
			paperSetId: questionAnswer.paper_set_id,
			answers: answers,
		}

		response.push(tempObj)
	})

	res.data = response
	next()
}

module.exports = {
	examResult,
	examQuestionAnswer,
}
