# Principles, Patterns, and Guidelines

## Reviewing pull requests

Here's some things to look for when reviewing pull requests:

- Is the code readable? Does it make sense? Can you decipher the intent?
- Are there an appropriate amount of tests? Can you decipher the intent of the
  tests?
- Is the code style in line with the rest of the file? The project? The team?
- Are there inline comments where necessary?

Good reviewers are respectful and try to understand the intent of the
contributor.

## General principles

* *Question everything* - if you don't understand what a component or prop is doing and why it's needed in our system, chances are no one else will either.
* *Focus on usability* - how can we make our react components as easy to use as possible?
* *Design intent should be communicated at every layer of the code*: The component APIs and documentation should reflect the intended use as specified in the design system. When handed a mockup built in sketch, it should be immediately clear which component to use, and how to use it.
* *Be minimalistic* - If we can delete a thing (component, prop, etc) without causing problems that's probably the better option. The system will naturally get more complicated over time.

## Component update checklist

1. [ ] Design specifications are finalized and complete
    * Review design guidelines on the component in question.
    * Use [the dependency helpers](https://github.com/puppetlabs/react-component-dependents) to audit current use of the component in question. Keep in mind that the scripts often give a partial answer, you will need to dig in deeper in certain places.
    * Sit down with a designer and get answers to the following questions:

    Questions:

    * What is the intended use of this component and do we need it?
    * Do we need all of the variations of the component specified in the design guidelines?
    * Do the design specifications cover all states? (focus, active, error, etc)
    * Do the design specifications cover all variants and uses of the component in current code?

    **Result** A ticket in JIRA specifying the design updates needed in order to finalize the code.
2. [ ] Component API is finalized and consistent with design specifications
    * Audit current code.
    * Identify prop options that can be removed.
    * In limited and worthwhile cases, use your judgement to identify opportunities to clarify component APIs to make the intended use more clear.
4. [ ] Component API is consistent with common patterns (below) and relevant patterns established in other components
    * We should be specifying common props such as size and color in a consistent manner.
5. [ ] Accessibility updates are made
    * Make sure basic interactive elements have appropriate focus / active states.
    * Make sure that appropriate HTML elements are used (for example, `a` tags for links and `button` tags for buttons), making element choice flexible where appropriate with the `as` prop pattern.
6. [ ] Component use is well documented in Styleguidist
    * Use comments to describe all props and their use.
    * Make examples in accompanying Markdown files that convey *how* to use a component appropriately, focusing on their intended use in relation to design specifications.
    * Organize Styleguidist to focus attention on the top-level components.
7. [ ] Component style is 100% consistent with design guidelines
    * This includes all states where appropriate.

## Common code patterns

These patterns are agreed upon and should serve as the north-star, but are somewhat aspirational. Use your judgement to decide when the effort required to standardize patterns outweighs the benefit.

* Top-level components should accept `className` and `style` props that are propagated down to the appropriate inner element so that the component can be positioned appropriately.
* Prefer enumerated string props over mutually exclusive boolean props. For example, prefer `<Button type="secondary" />` over `<Button secondary />`.
* Callback props should be prefixed with `on`. For example, prefer `onClick` over `handleClick`. This makes our components consistent with native elements.
* Callback props should be used purely as callbacks, and should not determine other behavior. For example, the `Card` component uses a `selectable` prop to turn on hover states and other conditional styling, and a separate `onSelect` handler for user events:

    ```
    <Card selectable onSelect={...} />
    ```

    Although marginally more verbose, this helps clarify the purpose of each prop.
* Prefer null functions in `defaultProps` over null pointer checks in the function body. For example:

    ```js
    // A null function here:
		const defaultProps = {
		  onClick() {}
		}

		// prevents the need for NPE checks here:
		handleClick() {
		  const { onClick } = this.props;
		  if (onClick) {
		    onClick()
		  }
		}
		```

* Simple interactive elements which require different HTML tags depending on intended use case should use the established `as` prop pattern. For example, the button component is already configured to accept a flexible element so that it will render appropriately:

    ```jsx
    <Button onClick={...} />
    <Button as="a" href="..." />
    <Button as={ReactRouterLink} to={...} />
    ```
