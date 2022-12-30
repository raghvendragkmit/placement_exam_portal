
const createExam = async (payload) => {

    const subjectExist = await models.Subject.findOne({ where: { subject_name: payload.subjectName } });
    if (!subjectExist) {
        throw new Error('subject not found');
    }

    const currentTime = new Date();

    if (payload.examStartTime >= currentTime && payload.examEndTime >= currentTime) {
        throw new error('exam end time must be greater than current time');
    }

    if (payload.examStartTime >= payload.examEndTime) {
        throw new error('exam end time must be greater than start time');
    }

    const examPayload = {
        subject_id: subjectExist.id,
        exam_start_time: payload.examStartTime,
        exam_end_time: payload.examEndTime,
        exam_date:payload.exam_date,
        exam_passing_pecentage: payload.exam_passing_pecentage
    }


    const examCreated = await models.Exam.create(examPayload);

    return {
        id: examCreated.id,
        subject_id: examCreated.subject_id,
        exam_start_time: examCreated.exam_start_time,
        exam_end_time: examCreated.exam_end_time
    }
}

module.exports = {
    createExam
}