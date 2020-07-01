The design system is a shared set of patterns, implemented through a set of shared design and code assets. These shared patterns are designed to enable more rapid application development while ensuring consistent and high-quality user experience. We intend for these patterns to grow and adapt over time as we encounter new use cases.

## Using the system

In the best case scenario, the design system will have enough existing assets to build what's needed for a new feature. The general workflow in this case should work something like this:

### Design

Designers generally initiate new feature work by creating a wireframe using design-system assets.

1. Always attempt to use existing components: new ones should be a last resort
1. Use the built in type and layer styles. This is the only way to have your designs automatically update.
1. Use the built in symbols. Don’t convert them to layers. Learn to use and love overrides.
1. If you want to show interaction, make use of the Cursor symbols (Symbols / Cursors) to provide hints of the interactivity.
1. To indicate a components interactive state, use the built in symbol overrides.

### Engineering

Once handed a design comp it is generally the engineers responsibility to leverage existing design system code assets in the implementation of a new feature.

1. Attempt to find a pre-baked component corresponding to the design you have been given. This website [react-components documentation](http://designsystem.puppetlabs.net/react-components) is a great primary resource. In addition there are several pre-built pages available from [react-layouts](https://github.com/puppetlabs/design-system/tree/master/packages/react-layouts).
2. If a pre-baked component is not available, attempt to leverage the design system patterns encoded in our [sass-variable](https://github.com/puppetlabs/design-system/tree/master/packages/sass-variables) package. These sass variables and mixins encode our lowest-level foundational elements including typography, color palettes, and common patterns such as borders and focus outlines.
3. If you still can't find an existing asset, alert your designer: it may be a mistake, or they may not have done due-diligence in attempting to use existing patterns.

For instructions on getting your app set up to consume design system assets please refer to the [main README](https://github.com/puppetlabs/design-system).

## Extending the System

As of our 1.0 release the design system is a small collection of patterns to get us started, we fully expect needs to arise that the existing patterns don’t cover. We view these not as failings but as opportunities to incorporate new work into the system. We think it’s best if new patterns are built for individual applications before they are adopted into the system. This maintains a connection to our product needs.

### Design

Once due diligence has been done attempting to use existing patterns, a designer may find that they are inadequate.

1. Early in the process you should work closely with your teams, be it engineers, pms, or designers, to conceptualize and provide a clear definition for a component. To maintain a high standard of design and code consistency a new component should be able to clearly articulate its:
   - **Role or Purpose** - it should fill a gap that can't be met by existing components. It should have minimal overlap. Is it unique?
   - **Benefit** - It should provide a benefit to the broader organization (does it unblock a team?), fill a feature requirement, or assist in consistency of customer experience across teams/use-cases (eg. a marketing email sending a user into a product)
   - **Audience** - Who uses it? Does it affect customers in a meaningful way?
   - **Impact** - Does it impair or otherwise impact work from existing teams? Does it break an established pattern? How much work would need to be invested for it to be completed?
1. Start a conversation with the design system leads about the system's failing: it is useful to track these things at a high level.
1. Design and experiment as needed until the new pattern is hardened.
   - When making new components, create new symbols in your working sketch file that can be ported to the library for use by others. Follow the [documented design criteria](https://github.com/puppetlabs/design-system/wiki/Design-criteria).
   - You can create new icons if they are unique and no other icon serves your purpose. Create them as symbols, following the [icon creation guidelines](https://github.com/puppetlabs/design-system/wiki/Icons).
1. Handoff the design to engineering

### Engineering

Once engineering and design agree on the need for a new pattern, it can move to implementation.

1. If the new pattern is a bug fix or a small deviation from an existing component or pattern, the new feature can be addressed with a PR to the [design-system](https://github.com/puppetlabs/design-system) repository. The reviewers can help get the new pattern in quickly if all goes well.
2. If the deviation is larger: a new pattern or component, we recommend building it first in your application before porting to the common location. This allows the component to harden and for time to validate its need for existence. It may be useful to separate out the new component in an isolated location of your codebase so that it may be easily ported at a later date.

## Contributing to the System

Once a pattern has been hardened and validated, it may be a good candidate for adoption into the system. New patterns and components have the potential to significantly improve the capabilities of many teams at once. They also have the potential to cause harm if they aren't created with a careful, holistic approach. While anyone can request updated or new components for the system, it is the responsibility of the PDS Leads and Representatives to ensure that these needs are captured and brought to attention. They ultimately decide what work should be integrated, using a variety of means to identify candidates:

- A component from the design system is selected from the backlog or roadmap by the PDS team
- A component need is identified during the normal workflow within a product team and intentionally designed for PDS inclusion. This would be communicated by that teams rep.
- The component is already in use within an existing product and is volunteered to be made available for others.
- A component from one team is requested for use by one or more other teams.
- A specific request has been made to the PDS team and made part of a sprint.

New design and code patterns should be submitted in tandem to maintain parity. As implementation and adoption of these designs will impact multiple teams, a high degree of scrutiny will be applied to the design and code to assure that it meets our criteria.

- [Design contribution criteria](https://github.com/puppetlabs/design-system/wiki/Design-criteria)
- [Engineering contribution criteria](https://github.com/puppetlabs/design-system/wiki/Engineering-criteria)

### Review

All contributions must be reviewed prior to inclusion. Reviews consist of representatives from each product team with final decisions belonging to the design system leads. You can refer to our [list of contacts](https://github.com/puppetlabs/design-system/wiki/People) for more information.
