'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          slug: 'test',
          name: 'Test',
          password: 'test1234',
          email: 'test@gmail.com',
          createdAt: '2021-12-22T11:10:13.294Z',
          updatedAt: '2021-12-22T11:10:13.294Z',
        },
        {
          slug: 'test-1',
          name: 'Test jedan',
          password: 'test1234',
          email: 'test1@gmail.com',
          createdAt: '2021-12-22T11:10:13.294Z',
          updatedAt: '2021-12-22T11:10:13.294Z',
        },
        {
          slug: 'test-2',
          name: 'Test dva',
          password: 'test1234',
          email: 'test2@gmail.com',
          createdAt: '2021-12-22T11:10:13.294Z',
          updatedAt: '2021-12-22T11:10:13.294Z',
        },
        {
          slug: 'test-3',
          name: 'Test tri',
          password: 'test1234',
          email: 'test3@gmail.com',
          createdAt: '2021-12-22T11:10:13.294Z',
          updatedAt: '2021-12-22T11:10:13.294Z',
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {})
  },
}
