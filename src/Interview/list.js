import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useHistory } from 'react-router-dom';

import { interviewActions } from './interview.actions';

import './list.css';

export default function List({ match }) {
  const { path } = match;
  const dispatch = useDispatch();
  const { interviews = [], isLoading } = useSelector(
    state => state.interviewReducer
  );

  useEffect(() => {
    dispatch(interviewActions.get());
  }, []);
  return (
    <>
      <Link to={`${path}/create`} className="btn btn-sm btn-success m-0">
        Add
      </Link>
      {isLoading ? 'Loading...' : null}
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-6">Skils</div>
            <div className="col-5">Time Slots</div>
            <div className="col-1">Accept</div>
          </div>
          {interviews.map((interview, index) => (
            <div className="row" key={index}>
              <div className="col-6">
                {interview.selected.map(s => s.name).join(', ')}
              </div>
              <div className="col">
                {interview.slots
                  .map(s => `${s.date} ${s['start-time']}:${s['end-time']}`)
                  .join(', ')}
              </div>
              <div className="col-1">
                <label class="switch">
                  <input type="checkbox" />
                  <span class="slider round" />
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
