import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  //we can set whatever we wanna name state of alert to, from the reducer. look at reducer for what you can take
  //look at what state you have in your ROOTREDUCER

  //its than accessed by using props.alert - or if you descrturure your props agove just as alert
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
