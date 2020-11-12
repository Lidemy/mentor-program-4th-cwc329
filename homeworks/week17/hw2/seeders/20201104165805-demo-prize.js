

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
    await queryInterface.bulkInsert('Lotteries', [
      {
        prize: '頭獎',
        description: '夏威夷來回機票一張',
        image: 'https://i.imgur.com/BTXNDaz.jpg',
        rate: 0.2,
      },
      {
        prize: '二獎',
        description: '墾丁 Villa 住宿券兩張',
        image: 'https://i.imgur.com/ixDvIOe.jpg',
        rate: 0.2,
      },
      {
        prize: '三獎',
        description: '高鐵車票兩張',
        image: 'https://i.imgur.com/FoSvFvV.jpg',
        rate: 0.2,
      },
      {
        prize: '四獎',
        description: '便利商店禮券 100 元',
        image: 'https://i.imgur.com/BTilrdo.jpg',
        rate: 0.2,
      },
      {
        prize: '銘謝惠顧',
        description: '再接再厲，明天會更好',
        image: 'https://i.imgur.com/rCk10uq.jpg',
        rate: 0.2,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Lotteries', null, {});
  },
};
