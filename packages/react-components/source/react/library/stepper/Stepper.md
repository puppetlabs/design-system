## Overview

```jsx
import Stepper from './Stepper';

<Stepper activeStepIndex={1}>
  <Stepper.Step subText={'Hello. This is the optional subtext.'}>Create Group</Stepper.Step>
  <Stepper.Step subText={'More optional text here.'}>Set Permissions</Stepper.Step>
  <Stepper.Step subText={'More optional text here.'}>Final Step</Stepper.Step>
</Stepper>;
```

## Basic Use

Simply pass a single step to the Stepper component to render it

```jsx
import Stepper from './Stepper';

<Stepper>
  <Stepper.Step>Lonely Step</Stepper.Step>
</Stepper>;
```

## Types

There are 3 different types of state a particular step could be: Active, Incomplete, Complete

### 1. Active

```jsx
import Stepper from './Stepper';

<>
  <Stepper>
    <Stepper.Step subText={"(I'm the active step by default 😎)"}>First Step</Stepper.Step>
    <Stepper.Step>Second Step</Stepper.Step>
    <Stepper.Step>Third Step</Stepper.Step>
  </Stepper>
</>;
```

### 2. Incomplete

```jsx
import Stepper from './Stepper';

<>
  <Stepper activeStepIndex={0}>
    <Stepper.Step>First Step</Stepper.Step>
    <Stepper.Step subText={'(Look im the incomplete step 👀)'}>Second Step</Stepper.Step>
    <Stepper.Step subText={"(I'm also an incomplete step 👀)"}>Third Step</Stepper.Step>
  </Stepper>
</>;
```

### 3. Complete

```jsx
import Stepper from './Stepper';

<>
  <Stepper activeStepIndex={2}>
    <Stepper.Step subText={"(I'm what a complete step looks like 🏁! )"}>First Step</Stepper.Step>
    <Stepper.Step subText={"(I'm also complete.)"}>Second Step</Stepper.Step>
    <Stepper.Step>Third Step</Stepper.Step>
  </Stepper>
</>;
```

### Fully Completed Stepper

Once all the steps have been completed

```jsx
import Stepper from './Stepper';

<>
  <Stepper activeStepIndex={3}>
    <Stepper.Step> First Step </Stepper.Step>
    <Stepper.Step> Second Step </Stepper.Step>
    <Stepper.Step subText={'All 3 steps are complete! 🙌🏽'}>Third Step</Stepper.Step>
  </Stepper>
</>;
```
