"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("Albums", "album_id", {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: "Albums",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Albums", "album_id");
  },
};
