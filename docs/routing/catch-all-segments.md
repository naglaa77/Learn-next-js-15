# Catch-all and Optional Catch-all Segments in Next.js

## Catch-all Segments

Catch-all segments allow you to match dynamic routes with multiple segments. They are denoted by using `[...paramName]` in the folder name.

### Example Structure
```
app/shop/[...slug]/page.tsx
```

### How it Works
- The `[...slug]` syntax will match any number of segments after `/shop/`
- The matched segments will be available in the `params` object as an array
- For example:
  - `/shop/clothes` → `params.slug = ['clothes']`
  - `/shop/clothes/shirts` → `params.slug = ['clothes', 'shirts']`
  - `/shop/clothes/shirts/casual` → `params.slug = ['clothes', 'shirts', 'casual']`

### Implementation Example
```typescript
export default function Page({ params }: { params: { slug: string[] } }) {
  return (
    <div>
      <h1>You&apos;re viewing: {params.slug.join(" / ")}</h1>
    </div>
  );
}
```

## Optional Catch-all Segments

Optional catch-all segments are similar to catch-all segments but can match zero or more segments. They are denoted by using `[[...paramName]]` in the folder name.

### Example Structure
```
app/shop/[[...slug]]/page.tsx
```

### How it Works
- The `[[...slug]]` syntax will match any number of segments after `/shop/`, including no segments
- The matched segments will be available in the `params` object as an optional array
- For example:
  - `/shop` → `params.slug = undefined`
  - `/shop/clothes` → `params.slug = ['clothes']`
  - `/shop/clothes/shirts` → `params.slug = ['clothes', 'shirts']`

### Implementation Example
```typescript
export default function Page({ params }: { params: { slug?: string[] } }) {
  return (
    <div>
      <h1>You&apos;re viewing: {params.slug?.join(" / ") || 'home'}</h1>
    </div>
  );
}
```

## Key Differences

1. **Catch-all Segments (`[...slug]`)**
   - Must match at least one segment
   - `params.slug` is always an array
   - Will not match the parent route

2. **Optional Catch-all Segments (`[[...slug]]`)**
   - Can match zero or more segments
   - `params.slug` is optional (can be undefined)
   - Will match the parent route

## Best Practices

1. Use catch-all segments when you need to ensure at least one segment is present
2. Use optional catch-all segments when you want to handle both the parent route and its children
3. Always handle the case where `params.slug` might be undefined when using optional catch-all segments
4. Consider using TypeScript to properly type your params object 