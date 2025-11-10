# Logo Setup Guide

This document explains how to set up and customize the logo for the TQM Digital website.

## 1. Where to Upload Your Logo Files

The `Logo` component is designed to load SVG files directly from the `/public` directory. This is the preferred method for optimal performance and quality.

### Preferred Method: `/public/brand/`

Place your logo files inside the `/public/brand/` folder at the root of your project. The component is pre-configured to look for these specific filenames:

-   **Light Logo (for dark backgrounds):** `/public/brand/logo-tqm-light.svg`
-   **Dark Logo (for light backgrounds):** `/public/brand/logo-tqm-dark.svg` (This is optional. If not provided, the light logo will be used as a fallback).

### How Public URLs Work

Files in the `/public` directory are served from the root of the site. This means:
-   A file at `/public/brand/logo-tqm-light.svg` is accessible at the URL `/brand/logo-tqm-light.svg`.
-   The code references this public URL directly.

### Fallback Method (If /public is not available)

If your environment does not support a `/public` directory, you can place a static image (e.g., `.png` or `.webp`) in a source folder like `/src/assets/brand/`.

-   **Fallback Logo Example:** `/src/assets/brand/logo-tqm.png`

You would then need to modify `components/Logo.tsx` to import this file directly and render it. This method is less flexible as it doesn't support light/dark variants easily and bundles the image with your JavaScript.

## 2. How to Change the Filename

If your logo files have different names, you must update the paths inside `components/Logo.tsx`.

Open the file and modify these two constant declarations:

```tsx
// components/Logo.tsx

// ...
const lightLogoSrc = '/brand/your-new-light-logo-name.svg';
const darkLogoSrc = '/brand/your-new-dark-logo-name.svg';
// ...
```

## 3. Pro Tip: Logo Variants

For the best visual results, always provide a **light** (white or very light-colored) version of your logo as an SVG. This ensures it has proper contrast and scales perfectly when displayed on the dark, semi-transparent header used on the hero section of the homepage.
