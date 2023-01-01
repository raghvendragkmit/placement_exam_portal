const createUser = async (req, res, next) => {
	const data = res.data || null

	const response = {
		id: data.id,
		firstName: data.first_name,
		lastName: data.last_name,
		email: data.email,
		role: data.role,
		organization: data.organization,
		contactNumber: data.contactNumber,
	}

	res.data = response
	next()
}

module.exports = {
	createUser,
}
