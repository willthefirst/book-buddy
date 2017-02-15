import React from 'react'
import { bindActionCreators } from 'redux'
import { Login } from 'routes/Login/components/Login'
import { shallow } from 'enzyme'

describe('(Component) Login', () => {
  let _props, _spies, _wrapper
  beforeEach(() => {
    _spies = {}
    _props = {
      ...bindActionCreators({
        handleLogin : (_spies.handleLogin = sinon.spy()),
        handleSubmit : (_spies.handleSubmit = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }
    _wrapper = shallow(<Login {..._props} />)
  })

  it('Should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

  it('Should render exactly one form.', () => {
    expect(_wrapper.find('Form')).to.have.length(1)
  })

  describe('Login submit button', () => {
    let _button

    beforeEach(() => {
      _button = _wrapper.find('Button').filterWhere(button => button.props().type === 'submit')
    })

    it('Should dispatch a `handleSubmit` action when clicked', () => {
      _spies.dispatch.should.have.not.been.called

      _button.simulate('click')

      _spies.dispatch.should.have.been.called
      _spies.handleSubmit.should.have.been.called
      // // _spies.handleLogin.should.have.been.called
    })
  })

})
