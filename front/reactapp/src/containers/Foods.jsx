import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';

export const Foods = () => {
  let { restaurantsId } = useParams();
  return (
    <Fragment>
      フード一覧
      <p>restaurantsIdは {restaurantsId} です</p>
    </Fragment>
  );
};

export default Foods;
