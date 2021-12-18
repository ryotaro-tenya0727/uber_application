import React, { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { fetchFoods } from '../apis/foods';

const Foods = () => {
  let { restaurantsId } = useParams();
  useEffect(() => {
    fetchFoods(1).then((data) => console.log(data));
  }, []);
  return (
    <Fragment>
      フード一覧
      <p>restaurantsIdは {restaurantsId} です</p>
    </Fragment>
  );
};

export default Foods;
