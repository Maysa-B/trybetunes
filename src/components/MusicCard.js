import React from 'react';
import '../style/musicCard.css';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  handleInputChange = () => {
    const { clickSave, clickDelete, obj: { checked }, obj } = this.props;
    if (checked) {
      clickDelete(obj);
    } else {
      clickSave(obj);
    }
  }

  render() {
    const { obj: { trackName, previewUrl, trackId, checked } } = this.props;

    return (
      <section className="music-card">
        <h3>{trackName}</h3>
        <div className="audio-fav">
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
          <label htmlFor={ `fav${trackId}` }>
            <p hidden>Favorita</p>
            <input
              className="form-check-input"
              onChange={ this.handleInputChange }
              checked={ checked }
              id={ `fav${trackId}` }
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
            />
          </label>
        </div>
      </section>
    );
  }
}

MusicCard.propTypes = {
  obj: PropTypes.objectOf(PropTypes.string).isRequired,
  clickSave: PropTypes.func.isRequired,
  clickDelete: PropTypes.func.isRequired,
};

export default MusicCard;
