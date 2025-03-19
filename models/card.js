module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('Card', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: { // <-- Ajuste o nome para "titulo"
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: { // <-- Ajuste o nome para "descricao"
      type: DataTypes.TEXT,
      allowNull: true,
    },
    imageurl: { // Caso a tabela tenha essa coluna
      type: DataTypes.STRING,
      allowNull: true,
    },
    data_criacao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    data_modificacao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'cards',
    timestamps: false,
  });

  return Card;
};
