// Type definitions for nativewind
// This is required as there is no official @types/nativewind package

/// <reference types="nativewind/types" />
import React from 'react';

declare module 'nativewind' {
  export function styled<C extends React.ComponentType<any>>(
    component: C
  ): C & { className?: string };
} 