// NewsletterTab.js
import React from 'react';
import NewsletterView from '../../components/NewsletterView';

const NewsletterTab = ({school, newsletters, selectedSchool }) => (
  <div className="flex-grow">
    <h2 className="text-xl font-bold mb-2">Resources</h2>

    <NewsletterView school={school} newsletters={newsletters} selectedSchool={selectedSchool} />
  </div>
);

export default NewsletterTab;
