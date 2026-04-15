/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    email: string;
    name: string;
    rol: string;
    accessToken: string;
    netlify?: {
      context?: {
        geo?: { country?: { code?: string } }
      }
    };
  }
}
