// models/index.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import Sequelize from 'sequelize';
import process from 'process';

// Define __filename e __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

// Importe o arquivo de configuração; ajuste conforme a forma como ele é exportado
import configModule from '../config/config.js';
const config = configModule[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  if (config.dialect === 'sqlite') {
    sequelize = new Sequelize(config);
  } else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
  }
}

// Carrega os modelos dinamicamente
const modelFiles = fs
  .readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
  );

await Promise.all(
  modelFiles.map(async (file) => {
    const modelPath = path.join(__dirname, file);
    // Converte o caminho absoluto para um URL file://
    const modelUrl = pathToFileURL(modelPath).href;
    const modelModule = await import(modelUrl);
    // Supondo que cada modelo seja exportado como default (função que recebe (sequelize, DataTypes))
    const model = modelModule.default(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  })
);

// Executa as associações (se definidas)
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
