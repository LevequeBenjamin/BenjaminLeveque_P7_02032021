'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class DisLike extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			models.User.belongsToMany(models.Post, {
				through: models.DisLike,
				foreignKey: 'userId',
				otherKey: 'postId',
			});

			models.Post.belongsToMany(models.User, {
				through: models.DisLike,
				foreignKey: 'postId',
				otherKey: 'userId',
			});

			models.DisLike.belongsTo(models.User, {
				foreignKey: 'userId',
				as: 'user',
			});

			models.DisLike.belongsTo(models.Post, {
				foreignKey: 'postId',
				as: 'post',
			});
		}
	}
	DisLike.init(
		{
			userId: {
				type: DataTypes.INTEGER,
				references: {
					model: 'User',
					key: 'id',
				},
			},
			postId: {
				type: DataTypes.INTEGER,
				references: {
					model: 'Post',
					key: 'id',
				},
			},
			isDisLike: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'DisLike',
		},
	);
	return DisLike;
};
