import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [data, setData] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespace
    ? `https://${codespace}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        const results = json.results || json;
        setData(results);
        console.log('Workouts endpoint:', endpoint);
        console.log('Workouts data:', results);
      })
      .catch(err => console.error('Workouts fetch error:', err));
  }, [endpoint]);

  return (
    <div>
      <h2 className="mb-4 text-primary">Workouts</h2>
      <div className="card mb-4">
        <div className="card-body">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                {data[0] && Object.keys(data[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={item.id || idx}>
                  {Object.values(item).map((val, i) => (
                    <td key={i}>{typeof val === 'object' ? JSON.stringify(val) : val}</td>
                  ))}
                  <td>
                    <button className="btn btn-sm btn-info" data-bs-toggle="modal" data-bs-target={`#workoutsModal${idx}`}>Dettagli</button>
                    <div className="modal fade" id={`workoutsModal${idx}`} tabIndex="-1" aria-labelledby={`workoutsModalLabel${idx}`} aria-hidden="true">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id={`workoutsModalLabel${idx}`}>Dettagli workout</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div className="modal-body">
                            <pre>{JSON.stringify(item, null, 2)}</pre>
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Workouts;
