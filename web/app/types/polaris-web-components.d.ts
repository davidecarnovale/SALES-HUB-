// Fallback ambient typings for Polaris web components (s-*) and App Bridge
// web components. @shopify/polaris-types provides richer typings; this
// catch-all guarantees TSX compiles even before/without that package.
import "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: `s-${string}`]: any;
    }
  }
}

export {};
