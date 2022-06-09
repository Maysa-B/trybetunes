import React from 'react';
import '../style/notFound.css';

class NotFound extends React.Component {
  render() {
    return (
      <section className="not-found-page" data-testid="page-not-found">
        <h1>Ops...</h1>
        <p>
          A página que você
          está procurando
          não foi encontrada.
        </p>
      </section>
    );
  }
}

export default NotFound;
