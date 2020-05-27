"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("album", "id_artist", {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: "artist",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Albums", "artist_id");
  },
};
