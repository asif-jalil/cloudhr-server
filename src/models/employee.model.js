module.exports = (sequelize, datatype) => {
  // Defining sequelize model here
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
				allowNull: false,
				unique: true
			}
		},
		{
			tableName: 'employees',
			indexes: [
				{
					fields: ['firstName', 'lastName']
				}
			]
		}
	);

	return Employee;
};
