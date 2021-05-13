import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { alertActions } from '../../actions';

export default function Alert() {
  const alert = useSelector(state => state.alertReducer);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    setTimeout(clearAlert, 1000);
  }, [location]);

  function clearAlert() {
    dispatch(alertActions.clear());
  }

  // alert.message = "test";
  // alert.type = "alert-success";

  return alert.message ? (
    <div id="alert">
      <div style={{ padding: '15px' }}>
        <div className={`alert ${alert.type}`} style={{ margin: '0 auto' }}>
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            onClick={clearAlert}
          >
            &times;
          </button>
          {alert.message}
        </div>
      </div>
    </div>
  ) : null;
}
