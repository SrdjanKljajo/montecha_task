const createTokenUser = user => {
  return {
    name: user.name,
    email: user.email,
    slug: user.slug,
  }
}

module.exports = createTokenUser
