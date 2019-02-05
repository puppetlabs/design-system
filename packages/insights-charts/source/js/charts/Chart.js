import deepmerge from 'deepmerge';
import clone from 'clone';
import helpers from '../helpers/charting';
import DataSet from '../lib/DataSet';

const defaultOptions = {
  // Settings specific to chart animation.
  animations: {
    enabled: true,

    // How long the animations should take to render.
    duration: 1000,
  },

  // Settings for the margin between the graph and the element.
  margins: {
    static: false,
    top: 10,
    right: 20,
    bottom: 0,
    left: 0,
  },

  // Settings for the axis.
  axis: {
    // Settings for the X axis.
    x: {
      // Toggle rendering the x-axis on the graph.
      enabled: true,

      // Orientation of the labels (either "top" or "bottom").
      orientation: 'bottom',
    },

    // Settings for the Y axis.
    y: {
      // Toggle rendering the y-axis on the graph.
      enabled: true,

      // The orientation of the lables (either "left" or "right").
      orientation: 'left',
    },
  },

  // Properties for legend placement.
  legend: {
    // Should we display the legend?.
    enabled: true,

    // What side to render the legend on.
    orientation: 'right',

    // What text alignment would you like?
    alignment: 'left',
  },

  // Settings specific to tooltips.
  tooltips: {
    // Indicates whether or not tooltips should be enabled.
    enabled: true,
  },

  grid: {
    enabled: false,
    horizontal: true,
    vertical: true,
  },

  zoom: {
    enabled: true,
  },
};

class Chart {
  constructor(props) {
    this.elem = props.elem;
    this.type = props.type;

    // TODO: The margin options are currently being mutated in Container.
    // Clean this up and remove the cloning below
    const cloned = clone(deepmerge(defaultOptions, props.options || {}));
    this.options = cloned;
    this.options.type = props.type;

    if (!Array.isArray(this.options.axis.y)) {
      this.options.axis.y = [this.options.axis.y];
    }

    this.data = new DataSet(props.data);
    this.dispatchers = props.dispatchers;
    this.id = props.id;
    this.yScales = {};

    if (!this.render) {
      throw new Error(
        'All charts require a render method for rendering the chart',
      );
    }

    if (!this.update) {
      throw new Error(
        'All charts require an update method for resizing and updating the chart',
      );
    } else {
      this.update = this.update.bind(this);
      this.dispatchers.on('update', this.update);
    }
  }

  getPlotOptions(type, data) {
    return helpers.getPlotOptions(type, this.options, data);
  }

  destroy() {
    if (this.tooltip) {
      this.tooltip.destroy();
    }
  }
}

export default Chart;
