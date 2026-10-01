import type { ComponentType } from "react";

/**
 * React Bits component (ships as .jsx). Typed permissively so consumers can
 * pass any subset of props without fighting inferred "required" params.
 */
declare const Component: ComponentType<any>;
export default Component;
