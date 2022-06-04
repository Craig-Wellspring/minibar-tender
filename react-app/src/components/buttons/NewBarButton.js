import React from 'react';
import { useNavigate } from 'react-router';

export default function NewBarButton() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      id="newBarBtn"
      className="btn btn-success"
      onClick={() => navigate('/newbar')}
    >
      <i className="fas fa-plus" />
    </button>
  );
}
