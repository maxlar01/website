# React Performance Optimization: Patterns and Pitfalls

React is fast by default, but it's surprisingly easy to write components that re-render far more than they should. The good news is that most performance problems follow a small set of recognizable patterns. This post covers the mental model you need, the tools to diagnose issues, and the concrete techniques to fix them.

## Understanding React's Rendering Model

Before reaching for `memo` or `useMemo`, it's worth being clear on when React re-renders a component:

1. Its own state changes
2. Its parent re-renders and passes new props
3. A context it consumes changes

React re-rendering is not inherently expensive — the real cost is when a re-render triggers expensive computation or causes child trees to re-render unnecessarily. The virtual DOM diffing is cheap; it's the side-effects and downstream renders that add up.

## Profiling First

Never optimize what you haven't measured. The React DevTools Profiler is your first stop:

1. Open DevTools → Profiler tab
2. Click Record, interact with the slow part of your app, click Stop
3. Look at the flame graph — wide bars at the top of the tree are the culprits

The "Why did this render?" feature (enable in settings) tells you exactly which prop or state change triggered each render.

## React.memo — Use Sparingly

`React.memo` prevents a component from re-rendering if its props haven't changed (shallow comparison):

```tsx
const UserCard = React.memo(function UserCard({ user }: { user: User }) {
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
});
```

**The pitfall**: `memo` only helps if the props are actually stable. If the parent creates a new object or function on every render and passes it as a prop, `memo` does nothing.

```tsx
// This breaks memo — new object reference every render
function Parent() {
  return <UserCard style={{ color: "blue" }} />; // ❌ new object each render
}

// Fix: move the constant outside the component
const cardStyle = { color: "blue" };

function Parent() {
  return <UserCard style={cardStyle} />; // ✅ stable reference
}
```

## useMemo — For Expensive Computations

`useMemo` caches the result of a computation between renders:

```tsx
function ProductList({ products, filterText }: Props) {
  const filtered = useMemo(
    () => products.filter((p) => p.name.includes(filterText)),
    [products, filterText]
  );

  return <ul>{filtered.map((p) => <li key={p.id}>{p.name}</li>)}</ul>;
}
```

**The pitfall**: `useMemo` itself has overhead. Don't use it for cheap operations — filtering a 20-item array doesn't need memoization. Reserve it for genuinely expensive computations (complex sorting, large data transforms, derived state with heavy calculations).

## useCallback — For Stable Function References

`useCallback` returns a stable function reference, primarily useful when passing callbacks to memoized children:

```tsx
function Parent() {
  const [count, setCount] = useState(0);

  // Without useCallback, this is a new function reference every render
  const handleDelete = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []); // empty deps = created once

  return <MemoizedList onDelete={handleDelete} />;
}
```

**The pitfall**: `useCallback` doesn't help unless the child is wrapped in `memo`. They work together — `useCallback` stabilizes the prop, `memo` skips the re-render when props are stable.

## Context: The Sneaky Re-render Source

Every consumer of a context re-renders when the context value changes. This becomes a problem when you put everything in one context:

```tsx
// ❌ Every component consuming AuthContext re-renders on *any* user change
const AuthContext = createContext({ user, theme, notifications });
```

**Fix: Split contexts by update frequency**

```tsx
// ✅ Components consuming ThemeContext don't re-render when user changes
const UserContext = createContext(user);
const ThemeContext = createContext(theme);
```

Also memoize the context value itself if it's an object:

```tsx
const value = useMemo(() => ({ user, logout }), [user]);
return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
```

## List Virtualization

If you're rendering hundreds or thousands of items, only render what's visible. `@tanstack/react-virtual` is the modern choice:

```tsx
import { useVirtualizer } from "@tanstack/react-virtual";

function VirtualList({ items }: { items: string[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
  });

  return (
    <div ref={parentRef} style={{ height: "400px", overflow: "auto" }}>
      <div style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: "absolute",
              top: virtualItem.start,
              height: virtualItem.size,
            }}
          >
            {items[virtualItem.index]}
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Quick Wins Checklist

- Move state as close as possible to where it's used — don't lift state higher than necessary
- Use `key` correctly — a stable `key` prevents unnecessary unmounts; an unstable `key` (like array index) causes them
- Avoid anonymous objects/functions in JSX props when passing to `memo`-wrapped children
- Code-split large components with `React.lazy` and `Suspense`
- Profile before and after every optimization to confirm improvement

Performance work is most effective when driven by data. Profile, identify the actual bottleneck, apply the targeted fix, and re-measure.
