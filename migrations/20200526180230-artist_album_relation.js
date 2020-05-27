"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("Albums", "artist_id", {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: "Artists",
        key: "xid",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Albums", "album_id");
  },
};
