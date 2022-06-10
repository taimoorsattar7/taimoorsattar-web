---
title: Create your own Custom React hooks
description: Custom react hooks is a JavaScript function allows you to add feature/functionality to your react application.
date: 2021-10-30T16:46:31.185Z
tags:
  - react
  - hooks
featuredpost: false
---

Custom react hooks is a JavaScript function allows you to add feature/functionality to your react application. We can reuse react hooks code (logic) in several parts of your application.

So far, React provide ten (10) built-in react hooks. We can create our own custom hooks (depend on the requirement); e.g. if we don't find any plugin/packages to get our work done.

So, let's start by creating custom react hook, useDebounce.

In the useDebounce react hook, we can delay a certain task from being executed. This could be useful to limit the component re-rendering too many times.

For example, we may encounter a scenario where a function is executed after every millisecond on every page scroll, it can cause the performance issue. To avoid the function execution after every millisecond, we can take advantage of useDebounce react hook.

To define useDebounce React hook, we can write our code as below:

```jsx
import React, { useState, useEffect } from "react"
export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value])

  return debouncedValue
}
```

The above hook use `setTimeout` to delay for defined amount of time.

We can reuse the useDebounce react hook in the react component as below.

```jsx
import useDebounce from "../hooks/useDebounce"
```

## React Hooks Resources

You can use the custom react hooks written by community and other developer in you application. Below are some of the resources for custom react hook:

- [usehooks-ts](https://usehooks-ts.com)
- [usehooks.com](https://usehooks.com)
