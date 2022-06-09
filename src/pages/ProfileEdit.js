import React from 'react';
import '../style/profileEdit.css';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

// fiz algumas alterações, mas a fonte do regex de verificação de email:
// https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail

class ProfileEdit extends React.Component {
  state = {
    loading: true,
    isDisabled: true,
    name: '',
    description: '',
    email: '',
    image: '',
    redirect: false,
  }

  ableOrNot = () => {
    const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
    const { description, email, image, name } = this.state;
    if (description.length === 0
      || email.length === 0 || image.length === 0
      || name.length === 0) return true;
    if (regexEmail.test(email) === false) return true;
    return false;
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    const user = await getUser();
    const { name, description, email, image } = user;
    this.setState({ name, description, email, image },
      () => this.setState({ isDisabled: this.ableOrNot() }));
    this.setState({ loading: false });
  }

  handleSave = () => {
    const { description, email, image, name } = this.state;
    const obj = { name, image, email, description };
    this.setState({ loading: true }, async () => {
      await updateUser(obj);
      this.setState({ loading: false, redirect: true });
      // this.props.history.push('/profile');
    });
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value },
      () => this.setState({ isDisabled: this.ableOrNot() }));
  }

  render() {
    const { description, email, image, name, loading,
      isDisabled, redirect } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        { redirect && <Redirect to="/profile" />}
        {(loading ? (<Loading />) : (
          <section className="edit-profile-component">
            <input
              className="form-control"
              data-testid="edit-input-name"
              type="text"
              name="name"
              placeholder="Nome"
              value={ name }
              onChange={ this.handleInputChange }
            />
            <input
              className="form-control"
              data-testid="edit-input-email"
              type="text"
              name="email"
              placeholder="Email"
              value={ email }
              onChange={ this.handleInputChange }
            />
            <textarea
              className="form-control"
              data-testid="edit-input-description"
              name="description"
              placeholder="Descrição"
              value={ description }
              onChange={ this.handleInputChange }
            />
            <input
              className="form-control"
              data-testid="edit-input-image"
              type="text"
              name="image"
              placeholder="Link para sua imagem"
              value={ image }
              onChange={ this.handleInputChange }
            />
            <button
              className="btn btn-secondary"
              onClick={ this.handleSave }
              disabled={ isDisabled }
              type="button"
              data-testid="edit-button-save"
            >
              Salvar
            </button>
          </section>
        )
        )}
      </div>
    );
  }
}

export default ProfileEdit;
