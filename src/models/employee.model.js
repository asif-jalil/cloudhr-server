module.exports = (sequelize, datatype) => {
	const Employee = sequelize.define(
		'employee',
		{
			firstName: {
				type: datatype.STRING,
				allowNull: false
			},
			lastName: {
				type: datatype.STRING,
				allowNull: false
			},
			email: {
				type: datatype.STRING,
				allowNull: false
			}
		},
		{
			tableName: 'employees'
		}
	);

	return Employee;
};
