import React from "react";
import "./successPage.css";

const SuccessPage = () => {
  return (
    <div className="success-container">
      <div className="success-summary">
        <h2>Reserva concluída!</h2>
        <p className="success-message">
          A lua já sabe que você vem. Prepare-se para um banho de estrelas.
        </p>
        <a href="/" className="back-button">Voltar para o início</a>
      </div>
    </div>
  );
};

export default SuccessPage;
