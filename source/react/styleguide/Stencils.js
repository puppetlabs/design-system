import React from 'react';
import StyleguideSection from './partials/StyleguideSection';
import StencilGrid from '../library/stencils/StencilGrid';

const testView = {
  name: 'Test View',
  configuration: {
    components: [
      {
        type: 'bars',
        layout: { w: 12, h: 2, x: 0, y: 0 },
      },
      {
        type: 'timeseries',
        layout: { w: 6, h: 2, x: 0, y: 2 },
      },
      {
        type: 'donut',
        layout: { w: 4, h: 2, x: 6, y: 2 },
      },
      {
        type: 'datagrid',
        layout: { w: 2, h: 1, x: 10, y: 2 },
      },
      {
        type: 'kpi',
        layout: { w: 2, h: 1, x: 10, y: 3 },
      },
    ],
  },
};

const Stencils = () => (
  <div>
    <StyleguideSection title="Stencil">
      <StencilGrid view={ testView } />
    </StyleguideSection>
  </div>
);

export default Stencils;
