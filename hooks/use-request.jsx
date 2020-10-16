import React, { useState } from 'react';
import axios from 'axios';

// eslint-disable-next-line object-curly-newline
const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);
      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (e) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Ooops...</h4>
          <ul className="my-0">
            {e.response.data.errors.map((error) => <li key={error.message}>{error.message}</li>)}
          </ul>
        </div>,
      );
    }

    return null;
  };

  return { doRequest, errors };
};

export default useRequest;