import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SuccessPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paymentReferenceId = queryParams.get("ref");

  const [paymentStatus, setPaymentStatus] = useState(null);
  const [roomData, setRoomData] = useState(null);

  useEffect(() => {
    const savedRoom = localStorage.getItem("successRoom");
    if (savedRoom) setRoomData(JSON.parse(savedRoom));
  }, []);

  useEffect(() => {
    if (!paymentReferenceId) return;

    fetch(
      `https://test-back-7vih.onrender.com//api/payments/status/${paymentReferenceId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPaymentStatus(data);
      })
      .catch((err) => console.error("Error fetching payment status:", err));
  }, [paymentReferenceId]);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Reserva concluída!</h1>
      {roomData && (
        <>
          <h2>{roomData.nome}</h2>
          <p>
            De {new Date(roomData.checkInDate).toLocaleDateString("pt-BR")} até{" "}
            {new Date(roomData.checkOutDate).toLocaleDateString("pt-BR")}
          </p>
          <p>Total pago: R$ {roomData.preco}</p>
        </>
      )}
      {paymentStatus ? (
        <p>
          Status do pagamento:{" "}
          <strong>{paymentStatus.results?.[0]?.status || "Desconhecido"}</strong>
        </p>
      ) : (
        <p>Verificando status do pagamento...</p>
      )}
    </div>
  );
};

export default SuccessPage;
