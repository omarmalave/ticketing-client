import React from 'react';

const LandingPage = ({ currentUser }) => (currentUser ? <h1>You are signed in</h1>
  : <h1>You are not signed in</h1>);

export default LandingPage;
