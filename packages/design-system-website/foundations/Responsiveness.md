## Mixins

This system remains mostly unopinionated on responsive tools, but the `sass-variables` package contains a few mixins to help you customize your own styles based on the viewport width:

* `respond-above` applies styles only above a certain width. For example, the following constrains the width of `.container` elements, but only on larger screens:
    ```scss
    .container {
        width: 100%;

        @include respond-above(large) {
          width: 1180px;
        }
    }
    ```
* `respond-below` applies styles only below a certain width. Here's an equivalent example using `respond-below` instead:
    ```scss
    .container {
      width: 1180px;
  
      @include respond-below(large) {
        width: 100%;
      }
    } 
    ```

## Breakpoints

The mixins respond to three sizes by default:

- `small` (most phone screens)
- `medium` (most tablets, small browser windows)
- `large` (browser windows)

You can customize these values or add your own by redefining the `$breakpoints` map variable in your SCSS before you include the design system styles. Here's an example:

```scss
// Define your breakpoint map:
$breakpoints: (
  'small': 576px,
  'medium': 768px,
  'large': 992px,
  'xlarge': 1180px
); 

// Import design system stylesheets after your breakpoint definitions:
@import '~@puppet/sass-variables/index';

.container {
  @include respond-above(xlarge) {
    // Now responds above 1180px
  }
}
```

## Which mixin should I use?

The conventional wisdom of "mobile-first" design encourages designing at the smallest widths first, then progressively enhancing the design for larger sizes. This tends to improve the responsiveness of the design overall, since it forces a focus on multiple sizes from the beginning.

We suggest writing your initial styles for smaller screen widths, then using `respond-above` to adapt them to larger screens. `respond-below` is included as a convenience.

