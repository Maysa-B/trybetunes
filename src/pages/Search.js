import React from 'react';
import '../style/search.css';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    artistInput: '',
    artistSearched: '',
    disabled: true,
    loading: false,
    answer: false,
    resultAPI: [],
  }

  ableOrNot = () => {
    const { artistInput } = this.state;
    const MIN_LENGTH = 2;
    if (artistInput.length >= MIN_LENGTH) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.ableOrNot());
  }

  handleSearchClick = async () => {
    const { artistInput } = this.state;
    this.setState({ artistSearched: artistInput });
    const resultAPI = await searchAlbumsAPI(artistInput);
    this.setState({ artistInput: '', answer: true, resultAPI });
  }

  render() {
    const { disabled, artistInput, answer,
      loading, artistSearched, resultAPI } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        { loading ? (
          <Loading />
        ) : (
          <section className="search-page">
            <input
              placeholder="Nome do artista"
              className="form-control"
              name="artistInput"
              value={ artistInput }
              onChange={ this.handleInputChange }
              type="text"
              data-testid="search-artist-input"
            />
            <button
              className="btn btn-secondary"
              onClick={ this.handleSearchClick }
              disabled={ disabled }
              type="button"
              data-testid="search-artist-button"
            >
              Pesquisar
            </button>
          </section>)}
        { answer && (
          <section className="section-result">
            <p>
              Resultado de álbuns de:
              {' '}
              {artistSearched}
            </p>
            <section className="container-results">
              { resultAPI.length > 0 ? (
                resultAPI.map((el) => (
                  <Link
                    className="album shadow p-3 mb-5 bg-body rounded"
                    data-testid={ `link-to-album-${el.collectionId}` }
                    key={ el.collectionId }
                    to={ `/album/${el.collectionId}` }
                  >
                    <img alt={ el.collectionName } src={ el.artworkUrl100 } />
                    <p>
                      {el.collectionName}
                    </p>
                  </Link>
                ))
              ) : (
                <p>Nenhum álbum foi encontrado</p>
              )}
            </section>
          </section>
        )}

      </div>
    );
  }
}

export default Search;
