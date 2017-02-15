import LoginRoute from 'routes/Login'

describe('(Route) Login', () => {
  let _route

  beforeEach(() => {
    _route = LoginRoute({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof _route).to.equal('object')
  })

  it('Configuration should contain path `login`', () => {
    expect(_route.path).to.equal('login')
  })
})
