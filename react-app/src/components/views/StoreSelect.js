import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function StoreSelect() {
  const navigate = useNavigate();

  const validateUser = async () => {
      navigate('/barselect');
  };

  useEffect(() => {
    validateUser();
  }, []);

  return (
    <></>
  );
}