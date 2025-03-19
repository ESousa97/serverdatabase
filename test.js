const { sequelize, Project, Card } = require('./models');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão estabelecida com sucesso.');

    // Testa Project
    const projects = await Project.findAll();
    console.log('Projects:', projects);

    // Testa Card
    const cards = await Card.findAll();
    console.log('Cards:', cards);

  } catch (error) {
    console.error('Erro na conexão ou consulta:', error);
  } finally {
    await sequelize.close();
  }
})();
