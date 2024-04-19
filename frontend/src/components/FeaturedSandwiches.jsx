import React from 'react';
import PropTypes from 'prop-types';

const FeaturedSandwiches = ({ sandwiches = [] }) => {
  return (
    <>
      <div style={{ padding: '1rem', backgroundImage: '../background.jpeg' }}>
        <h2>Featured Sandwiches</h2>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>Name</th>
              <th scope='col'>Price</th>
              <th scope='col'>Description</th>
            </tr>
          </thead>
          <tbody>
            {sandwiches.slice(0, 5).map((s) => (
              <tr style={{ backgroundImage: '../background.jpeg' }} key={s._id}>
                <td style={{ paddingLeft: '1rem', fontSize: '1rem' }}>
                  {s.name}
                </td>
                <td>{s.price}</td>
                <td>{s.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
FeaturedSandwiches.propTypes = {
  sandwiches: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
    })
  ),
};
export default FeaturedSandwiches;
