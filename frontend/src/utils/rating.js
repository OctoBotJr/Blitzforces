/** Returns a Tailwind-compatible hex color for a Codeforces rating. */
export function getRatingColor(rating) {
    if (rating >= 2400)
        return "#ff3333"; // red
    if (rating >= 2100)
        return "#c084fc"; // purple (international master)
    if (rating >= 1900)
        return "#c084fc"; // purple (candidate master)
    if (rating >= 1600)
        return "#60a5fa"; // blue
    if (rating >= 1400)
        return "#4ade80"; // cyan/green
    if (rating >= 1200)
        return "#4ade80"; // green
    return "#888888"; // gray
}
/** Returns the CF rank title for a rating. */
export function getRatingTitle(rating) {
    if (rating >= 3000)
        return "Legendary GM";
    if (rating >= 2600)
        return "International GM";
    if (rating >= 2400)
        return "Grandmaster";
    if (rating >= 2300)
        return "International Master";
    if (rating >= 2100)
        return "Master";
    if (rating >= 1900)
        return "Candidate Master";
    if (rating >= 1600)
        return "Expert";
    if (rating >= 1400)
        return "Specialist";
    if (rating >= 1200)
        return "Pupil";
    return "Newbie";
}
