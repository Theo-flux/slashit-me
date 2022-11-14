import React from 'react';
import { useSelector } from 'react-redux';

function Success(props) {
  const anyAction = useSelector((state) => state.helper.anyAction);

  return (
    <>
      {/* {TODO - Show Cancel button} props.resetBox() on button click */}
      {/* {TODO - Show Checkmark} */}
      {/* {TODO - Show anyAction?.message} */}
      {/* {TODO - Pay another} props.resetBox() on button click*/}
    </>
  );
}

export default Success;
