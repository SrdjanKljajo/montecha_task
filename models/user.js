'use strict'
const { SequelizeSlugify } = require('sequelize-slugify')
const { Model } = require('sequelize')
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // fields to not return
    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        password: undefined,
        email: undefined,
      }
    }
  }

  User.init(
    {
      slug: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a name' },
          len: {
            args: [2, 32],
            msg: 'Name must have 2 - 32 caracters.',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a password' },
          len: {
            args: [6, 255],
            msg: 'The password length should be min 6 characters.',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a email' },
          isEmail: { msg: 'Must be a valid email address' },
        },
      },
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'User',
    }
  )

  SequelizeSlugify.slugifyModel(User, {
    source: ['name'],
    overwrite: false,
  })

  User.beforeSave(user => {
    if (user.changed('password')) {
      user.password = bcrypt.hashSync(
        user.password,
        bcrypt.genSaltSync(10),
        null
      )
    }
  })

  User.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
  }

  return User
}
