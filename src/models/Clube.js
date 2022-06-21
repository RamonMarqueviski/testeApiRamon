const { Model, DataTypes } = require('sequelize');

class Clubes extends Model {
  static init(sequelize) {
    super.init({
      cnpj: DataTypes.STRING,
      sigla: DataTypes.STRING,
      nome: DataTypes.STRING,
      cidade: DataTypes.STRING,
    }, {
      sequelize
    })
  }

  static associate(models){
    this.hasMany(models.Atletas, { foreignKey: 'clube_id', as: 'atletas' })
  }
}

module.exports = Clubes;