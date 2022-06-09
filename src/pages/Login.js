import React from 'react';
import '../style/Login.css';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    nameInput: '',
    disabled: true,
    loading: false,
    APIResult: '',
  }

  ableOrNot = () => {
    const { nameInput } = this.state;
    const MIN_LENGTH = 3;
    if (nameInput.length >= MIN_LENGTH) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.ableOrNot());
  }

  handleEntrarClick = async () => {
    this.setState({ loading: true });
    const { nameInput } = this.state;
    await createUser({ name: nameInput });
    this.setState({ loading: false, APIResult: true });
  }

  render() {
    const { disabled, nameInput, loading, APIResult } = this.state;

    return (
      <div className="login-page" data-testid="page-login">
        { loading ? (
          <Loading />
        ) : (
          <>
            <input
              className="form-control"
              name="nameInput"
              value={ nameInput }
              onChange={ this.handleInputChange }
              type="text"
              data-testid="login-name-input"
            />
            <button
              className="btn btn-secondary"
              onClick={ this.handleEntrarClick }
              disabled={ disabled }
              type="button"
              data-testid="login-submit-button"
            >
              Entrar
            </button>
          </>
        )}
        { APIResult && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
