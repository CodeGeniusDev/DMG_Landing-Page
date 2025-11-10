
# Review Slider Setup Guide

This document explains how to customize the `ReviewSlider` component on the TQM Digital website.

## 1. How to Update Review Content

All review data is stored in a static JSON file. This makes it easy to update without touching any code.

-   **File Location:** `/data/reviews.json`

To change the reviews, simply open this file and edit the text, author names, ratings, and dates.

### Data Structure

Each review object has the following structure:
```json
{
  "author": "First L.",
  "rating": 5,
  "time": "YYYY-MM-DD",
  "text": "The review content goes here.",
  "profileUrl": "https://g.page/r/YOUR_PLACE_ID",
  "source": "Google"
}
```
-   **rating:** Must be an integer from 1 to 5.
-   **time:** Use the `YYYY-MM-DD` format for correct date parsing.
-   **profileUrl:** See section 4 below on how to update this.

## 2. How to Change Autoplay Speed

The slider automatically cycles through reviews every 4 seconds by default. You can change this duration by passing a prop to the component.

-   **File to Edit:** `/pages/Home.tsx`
-   **Prop:** `autoPlayMs` (value is in milliseconds)

**Example:** To change the speed to 6 seconds (6000ms):
```jsx
// In pages/Home.tsx
<ReviewSlider autoPlayMs={6000} />
```
If you want to disable autoplay, set the value to a very large number.

## 3. How to Change the Section Background

The section's background uses a CSS variable for its gradient, consistent with other sections on the site.

-   **File to Edit:** `components/ReviewSlider.tsx`
-   **Line to Edit:** The `style` attribute on the main `<section>` tag.

The default is `var(--grad-2)`. You can change it to another predefined gradient token, such as `var(--grad-3)`:
```jsx
// In components/ReviewSlider.tsx
<section 
    className="..." 
    style={{ background: 'var(--grad-3)' }}
>
    {/* ... */}
</section>
```
The available tokens are defined in `/index.html` within the `<style>` block.

## 4. How to Update the "View all on Google" Link

The link at the bottom of the section directs users to your Google Business Profile reviews page. It automatically uses the `profileUrl` from the **first review object** in `/data/reviews.json`.

To update this link:
1.  Go to your Google Business Profile.
2.  Click on "Ask for reviews".
3.  Copy the short URL provided (it will look something like `https://g.page/r/YourPlaceID/review`).
4.  Open `/data/reviews.json`.
5.  Replace the placeholder `profileUrl` value for all review objects with your actual link.
