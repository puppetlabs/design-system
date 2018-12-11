# 0.13.6

* Update gauge comparison colors

# 0.13.5

* Upgrading to webpack 4

# 0.13.4

* Small design updates to the gauge

# 0.13.3

* Fix empty state for donuts
* Update the look of gauges

# 0.13.2

* Disabling the zoomer until it can properly handle drilldownss

# 0.13.1

* Always show poi points for scatter / bubble charts

# 0.13.0

* Introduce bubble chart

# 0.12.1

* Default to showing points on hover for area charts

# 0.12.0

* Adding a positive and negative palette
* Updating the theming variables and default palette

# 0.11.0

* Adding a basic gauge chart

# 0.10.8

* Upgrade to react 16 for local development
* Add localized number formatting

# 0.10.7

* Updating readme
* Adding codeowners and contribution doc
* Adding local npmrc file

# 0.10.6

* Internal updates

# 0.10.5

* Fix for bug that caused tooltips to not display after clicking on a chart

# 0.10.4

* If an x axis label is a string amongst ints/float leave it a string

# 0.10.3

* Improving our default y axis label formatter to cover more use cases

# 0.10.2

* Bug fix for Edge versions <= 14

# 0.10.1

* Improvement to the x axis which deduplicates linear and time scale labels

# 0.10.0

* Allow the setting of relevant chart types
* Allow the setting of stroke width of relevant chart types
* Improved handling of dense y axis

# 0.9.3

* Seperator dom for legend item values and legend item aggregates

# 0.9.2

* Fix to ensure we can properly unbind the resize callback

# 0.9.1

* Set a default fill on the zoomer bg so that it isn't black when the CSS isn't present

# 0.9.0

* Adding zooming to all chart types

# 0.8.1

* Bug fix for non grouped visualizations that lacked a series label

# 0.8.0

* Adding smart labels to the x axis. This means that x axis labels can now wrap and rotate automatically

# 0.7.0

* Now supporting reverse y axis on bar/column charts

# 0.6.3

* Fix an issue that occurs when the window is resized before the chart has rendered

# 0.6.2

* Fix bug in dollar formatting where the value is less than a dollar
* Add animation toggle to styleguide

# 0.6.1

* Fix bug where 0s would get plotted as the ymin rather than 0

# 0.6.0

* Fix bug with the display of points of interests when animations are disabled
* Added left and top orientation for the legend
* Added center and right alignment to the contents of the legend
* Added setting for updating the inner and outer padding of scaleBands and scalePoints

# 0.5.0

* Adding support for skipping the rendering of null values when plotting charts

# 0.4.0

* Allow users to add a scaleType to the x axis to force tick alignment between charts

# 0.3.0

* New setting for the application of static margins and max height/width of legends
* Explicitly set the css height and width of our charts. Resets to initial causes zooming issues

# 0.2.0

* Adding a configuration option for disabling the stroke, and only showing the points of interest on hover for areas and lines.

# 0.1.31

* Apply cursors to legend items when they're clickable
* Send unformatted data and the mouse event with legendItemClick events

# 0.1.30

* Fix bug in the way we parse strings to numbers
* Fix bug in safari, particularly when rendering within flex container

# 0.1.29

* Account for page scroll in tooltips
* Allow user to customize donut inner radius
* Add support for custom classes on tooltip

# 0.1.28

* Supply distinct time scale tick values to properly support timezones

# 0.1.27

* Updates to the look and feel of charts

# 0.1.26

* Fix a bug that resulted in not giving the YAxis enough width in specific conditions
* Fix a bug causing column charts to not use ordinal X scales

# 0.1.25

* Use passed legend formatters to format the series in tooltips

# 0.1.24

* Fix resizing bug
* Fix issue with tooltip positioning
* Fix issue with tooltip and legend formatting

# 0.1.23

* Remove max-width on legends

# 0.1.22

* Make sure setting min and/or max on an axis behaves as you'd expect.
* Fix an issue causing inaccurate ClosestPointOverlays

# 0.1.21

* Only activate hovered point in multi-series scatter plots
* Bug fixes for data labels
* Bug fixes for axis measurement
* Bug fixes for tooltips

# 0.1.20

* Don't guess the number of tick labels when the x axis is in a vertical orientation
* Adding SCSS linting for better code quality
* Use color helpers to ensure we are getting the correct css class name for series

# 0.1.19

* Bug fix to annotations when animations are turned off

# 0.1.18

* Update how we display simple tooltips for multiseries charts

# 0.1.17

* Bug fix for combination charts when no series layout has been set and an annotation is provided

# 0.1.16

* Properly disable closest point overlay with simple tooltip
* Adding more variables to help improve theming. Particularly around data labels and legends
* Fix right axis titles

# 0.1.15

* Add the ability to render simple tooltips

# 0.1.14

* Bug fixes to prevent scatters from stacking, update the default legend display state, etc

# 0.1.13

* Remove support for toggling series via the legend
* Ignore pointer-events over tooltips

# 0.1.12

* Legends should be disabled by default
* Fix regression in combination and sparkline layouts

# 0.1.11

* Bug fix for default stacking layout

# 0.1.10

* Support for horizontal legends
* Data labels
* Optionally handle errors through dispatchers
* Fixes for formatting and aggregating expanded legends

# 0.1.9

* Better formatting for axis labels
* Catch errors and pass to onError callback if applicable
* Add additional measurements to x axis for determine margins
* Fix bug where pie arcs would turn black after updating
* Fix bug where pies were incorrectly sized

# 0.1.6

* Properly support single series datasets
* Fix bug where axis were being rendered over series elements

# 0.1.5

* Set defaults for grid
* Allow column chart to be rotated into a bar chart via its axis

# 0.1.2

## Improvements

* Introduce scatter plot

## Fixes

* Support for custom colors
* Nodemon for rebuilding on changes
* Scroll bar gets cut off on the bottom of the legend
* Bottom margin isn't being applied to the legend
* Donut is getting too much left margin
* Percentage summary formatters
* Support for rendering legend aggregates

# 0.1.1

## Improvements

* Introduce sparkline chart

# 0.1.0

## Improvements

* Combination charts
* Support for splines

## Fixes

* Various bug fixes related to options, axis, etc.

# 0.0.2

## Improvements

* Measure axis labels and ticks so we can take them into account when applying margins.
* Dynamically increase or reduce the number of ticks based off the label width
* Better support for negative values in column charts

# 0.0.1

Initial tracked release
