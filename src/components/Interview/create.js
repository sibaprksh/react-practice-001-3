import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Steps, Step } from 'react-step-builder';

//import { interviewActions } from "../../actions";

import { interviewActions } from './interview.action';

import './create.css';

const Navigation = props => {
  //console.log("Navigation");
  //console.log({ props });

  const { state, current, size } = props; // step properties

  const isInvalidSelected = current == 1 && !state.selected?.length;
  const isInvalidSlot = current == 2 && !state.slots?.length;

  return (
    <div className="pt-5">
      {current !== size ? (
        <button
          onClick={props.next}
          disabled={isInvalidSelected || isInvalidSlot}
          className="btn btn-primary"
        >
          Next
        </button>
      ) : null}
    </div>
  );
};

const Before = props => {
  return (
    <div>
      {props.current !== 1 ? (
        <button className="btn btn-warning" onClick={props.prev}>
          Back
        </button>
      ) : null}
    </div>
  );
};

const After = props => {
  return <></>;
};

const SelectStep = props => {
  //props.next(); // jump to next step

  const dispatch = useDispatch();
  //const history = useHistory();

  const [list] = useState([
    { name: 'Java' },
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Angular' },
    { name: 'ReactJs' },
    { name: 'NodeJs' },
    { name: '.NET' },
    { name: '.NET MVC' },
    { name: 'AI' },
    { name: 'Spark' }
  ]);

  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(
    props.state.selected || [
      { name: '.NET MVC' },
      { name: 'AI' },
      { name: 'Spark' }
    ]
  );

  useEffect(() => {
    props.setState('selected', [...selected]);
  }, [selected]);

  const onSelection = data => {
    const index = selected.findIndex(fn(data));
    if (index === -1) {
      setSelected(s => [...s, data]);
    } else {
      setSelected(s => {
        s.splice(index, 1);
        return [...s];
      });
    }
  };

  const fn = data => s => s.name === data.name;

  const selectedItems = selected.map((s, index) => (
    <div className="chip" key={index}>
      {/* <img src="https://www.w3schools.com/howto/img_avatar.png" /> */}
      {s.name}
      <span className="closebtn" onClick={() => onSelection(s)}>
        &times;
      </span>
    </div>
  ));

  const listItems = list
    .filter(data => data.name.toLowerCase().includes(search.toLowerCase()))
    .map((data, index) => (
      <div
        className={[
          'text-center',
          'box',
          selected.some(fn(data)) ? 'selected' : ''
        ]
          .filter(Boolean)
          .join(' ')}
        key={index}
        onClick={() => onSelection(data)}
      >
        {data.name}
      </div>
    ));

  return (
    <>
      <div className="pt-0">
        <div className="text-center pb-3">
          <h4>Select Skills!</h4>
        </div>
        <div className="form-group has-search">
          <span className="fa fa-search form-control-feedback" />
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            name="search"
            value={search}
            onChange={({ target: { value } }) => setSearch(value)}
          />
        </div>
        <div>{selectedItems}</div>
        <div className="grid-container pt-5">{listItems}</div>
      </div>
    </>
  );
};

const TimeStep = props => {
  //props.next(); // jump to next Step

  const slotTemplate = {
    date: '2021-05-07',
    'start-time': '10:00',
    'end-time': '23:00'
  };

  const [slots, setSlots] = useState(
    props.state?.slots?.length ? props.state.slots : [slotTemplate]
  );

  useEffect(() => {
    const s = slots.filter(s => s.date); // filter out invalid dates
    props.setState('slots', s);
  }, [slots]);

  const handleChange = index => e => {
    const {
      target: { name, value }
    } = e;
    setSlots(
      slots.map((item, i) => (i === index ? { ...item, [name]: value } : item))
    );
  };

  return (
    <>
      <div className="text-center pb-3">
        <h4>Add Time Slots!</h4>
      </div>
      {slots.map((slot, index) => {
        return (
          <div className="slot-container pb-2 pt-2" key={index}>
            <input
              type="date"
              placeholder="Date"
              name="date"
              value={slot.date}
              className="form-control"
              onChange={handleChange(index)}
            />
            <input
              type="time"
              name="start-time"
              value={slot['start-time']}
              className="form-control"
              onChange={handleChange(index)}
            />
            <input
              type="time"
              name="end-time"
              value={slot['end-time']}
              className="form-control"
              onChange={handleChange(index)}
            />
            {slots.length != 1 ? (
              <button
                className="btn btn-danger"
                onClick={() =>
                  setSlots(s => {
                    s.splice(index, 1);
                    return [...s];
                  })
                }
              >
                Remove
              </button>
            ) : null}
          </div>
        );
      })}

      <button
        className="mb-2 btn btn-primary"
        onClick={() => setSlots(s => [...s, slotTemplate])}
      >
        Add
      </button>
    </>
  );
};

const FinalStep = props => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    console.log(props.state);
    dispatch(interviewActions.create(props.state, history));
  };

  return (
    <div>
      <div className="text-center pb-3">
        <h4>Preview!</h4>
      </div>
      <b>Skils:</b>
      <ol>
        {props.state.selected.map((s, index) => (
          <li key={index}>{s.name}</li>
        ))}
      </ol>
      <b>Slots:</b>
      <ol>
        {props.state.slots?.map((s, index) => (
          <li key={index}>
            {s.date} : {s['start-time']} - {s['end-time']}
          </li>
        ))}
      </ol>
      <button
        type="button"
        onClick={handleSubmit}
        className="btn btn-primary mt-5"
      >
        Submit
      </button>
    </div>
  );
};

export default function Create() {
  const config = {
    before: Before,
    after: After,
    navigation: {
      component: Navigation,
      location: 'after'
    }
  };
  return (
    <div className="pt-5 pb-5">
      <Steps config={config}>
        <Step component={SelectStep} />
        <Step component={TimeStep} />
        <Step component={FinalStep} />
      </Steps>
    </div>
  );
}
