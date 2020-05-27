'use strict';
module.exports = (sequelize, DataTypes) => {
  const track = sequelize.define('track', {
    track_name: DataTypes.STRING,
    track_duration: DataTypes.NUMBER,
    album_id: DataTypes.INTEGER,
    artist_id: DataTypes.INTEGER
  }, {});
  track.associate = function(models) {
    // associations can be defined here
  };
  return track;
};