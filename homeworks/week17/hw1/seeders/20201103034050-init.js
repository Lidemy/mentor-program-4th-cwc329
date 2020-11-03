
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', [
      {
        username: 'admin',
        nickname: 'admin',
        password: await bcrypt.hash('admin', 10),
        groupNo: 1,
        userType: 99,
      },
    ]);

    await queryInterface.bulkInsert('Categories', [
      { name: 'Sports' },
      { name: 'Diary' },
      { name: 'News' },
    ], { validate: true });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
