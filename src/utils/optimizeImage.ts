export function optimizeImage(url: string | undefined): string {
  if (!url) return '';
  
  // Only optimize URLs that point to Cloudinary
  if (!url.includes('res.cloudinary.com')) return url;
  
  // Check if it already has transformations to avoid corrupting it
  // We're looking for the /upload/ directory in the path
  const uploadRegex = /\/upload\/(?:v\d+\/)/;
  if (uploadRegex.test(url)) {
    // Insert f_auto,q_auto directly after /upload/
    return url.replace(/\/upload\//, '/upload/f_auto,q_auto/');
  }
  
  return url;
}
