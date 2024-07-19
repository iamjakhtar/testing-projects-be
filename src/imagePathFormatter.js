export function formatImageUrl(imageurl) {
      const imagePath = imageurl
        ? `http://localhost:8080/${imageurl.replace(/\\/g, "/")}`
        : null;
    return imagePath;
}