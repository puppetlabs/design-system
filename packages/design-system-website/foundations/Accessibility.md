## Why is accessibility important?

- Accessible design is good design. Accessibility best practices [improve the experience for all users](https://www.w3.org/WAI/business-case/#groups).
- Designing for accessibility means creating products everyone can use. The more people who can access and experience our products, the more potential users. That’s good for people and good for business.
- Many agencies, companies, and organisations are subject to accessibility legislation in the US, EU, and other nations.

## The 4 principles of accessibility

- **Perceivable**

  Information and user interface components must be presentable to users in ways they can perceive. Information cannot be invisible to all of a users’ senses.

- **Operable**

  Users must be able to operate and navigate the interface. The interface must not require an interaction that a user cannot perform.

- **Understandable**

  Users must be able to understand the information and operation of the user interface.

- **Robust**

  Content must be robust enough that it can be interpreted reliably by a wide variety of user agents, including assistive technologies.

Evaluate contributions through the lens of the four principles of accessibility. Consider users in a variety of situations with different needs and abilities. Can they interact with your component? Can they complete the workflow to achieve their goals?

Read about the principles in more detail in the [WCAG documentation](https://www.w3.org/WAI/WCAG21/Understanding/intro#understanding-the-four-principles-of-accessibility).

## Who benefits from accessible design?

#### Accessible design helps everyone, including people with:

- **Permanent disabilities**, such as missing limbs, blindness, or cognitive impairments.
- **Temporary limitations**, such as limited mobility after a medical procedure.
- **Situational limitations**, such as using captions while watching a training video in a noisy office.

#### Accessible design accounts for all types of disabilities and limitations, including:

- Auditory
- Cognitive
- Neurological
- Physical
- Speech
- Visual

#### Accessible design accounts for different means of interaction, including:

- Screen readers
- Keyboard navigation
- Magnification
- Voice-activated software

## Frequently asked questions

#### What accessibility standard do we use at Puppet?

AA standards WCAG 2.1

#### What is the minimum click target size?

The area, not necessarily the object itself, that a user can click on or highlight must be at least 24 x 24px

#### What colour contrast should designs meet?

AA. You can check this with a tool like the [Stark colour contrast checker](https://www.getstark.co/). Regardless of contrast, do not rely solely on colour to communicate information.

#### What is ARIA? Will that make my application accessible?

[The first rule of ARIA is do not use ARIA](https://www.w3.org/TR/using-aria/#rule1). ARIA, Accessible Rich Internet Applications, is a supplementary specification with attributes and labels to aid accessibility on the web. It does not replace semantic HTML. Wherever possible, prefer semantic HTML over ARIA. [No ARIA is better than bad ARIA.](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)

#### What about icons, images, and visualisations for users interacting through a screen reader?

The experience should be consistent for all users. If someone uses a screen reader, they should hear the same label as a sighted person sees on the screen for that component. This is especially important to consider when employing icons. Icons on their own can be ambiguous for sighted users or potentially result in inconsistency for people using a screen reader when alt text and labels are not considered. [Check out the UI Labels documentation for more details](https://docs.google.com/document/d/14lUYKUkQ9eljg4-Cxa1m2gD3zJTEZ1oObo3dt9IgSwg/edit?usp=sharing).

#### What about interactive visuals like charts and other data visualisations? Are they accessible?

For elements like data visualisations, aim for the information to be accessible in other formats (ex: in a table below or a CSV export). This also benefits all users by providing multiple means to investigate the data. Testing for accessibility standards such as colour contrast and target area sizing are also important to consider in the creation of any interactive charts.

#### What do I need to consider to account for keyboard navigation?

Make sure there is a focus state for every hover state, and think about the logical flow of information and key anchor points for users. Can they navigate through and focus on everything they need to reach their goals using only a keyboard? Is it clear what area they are focused on? To try for yourself, [take the #NoMouse challenge](https://www.nomouse.org/).

#### What should I do about this specific component or use case?

If you’re unsure, ask an a11y evangelist (such as in the [#aff-a11y](https://puppet.slack.com/archives/CF8914CFM) channel) or Google "accessibility + &lt;component>" (such as "accessibility + web forms") and read the latest about it.

#### How can I learn more about accessibility?

Join the [#aff-a11y](https://puppet.slack.com/archives/CF8914CFM) channel in Slack. Resources are shared all the time and everyone is happy to answer questions and learn together. Also check out the [W3 free digital accessibility foundations course](https://www.w3.org/WAI/fundamentals/foundations-course/) and the other resources below.

## Resources and tools

- The [#aff-a11y](https://puppet.slack.com/archives/CF8914CFM) channel in Slack
- [W3 free digital accessibility foundations course](https://www.w3.org/WAI/fundamentals/foundations-course/)
- [Web Content Accessibility Guidelines (WCAG) 2.1 specification](https://www.w3.org/TR/WCAG21/)
- [Stark colour contrast checker and colour blindness simulation tools](https://www.getstark.co/)
- [WAVE Web Accessibility Evaluation Tool](https://wave.webaim.org/)
- [Axe accessibility testing browser extension](https://www.deque.com/axe/)
- [Using ARIA](https://www.w3.org/TR/using-aria/)
- [Take the #NoMouse challenge](https://www.nomouse.org/)
- [W3 guide to evaluating web accessibility](https://www.w3.org/WAI/test-evaluate/)
