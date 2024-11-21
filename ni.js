function interpolate(from, to, direction, stream) {
  direction = direction || 'linear';
  stream = stream || function(x) { return x; };

  const linearInterpolation = function(t) {
    t = Math.max(0, Math.min(1, t));
    const value = from + t * (to - from);
    return stream(value);
  };

  const easeInInterpolation = function(t) {
    t = Math.max(0, Math.min(1, t));
    const value = from + (t * t) * (to - from);
    return stream(value);
  };

  const easeOutInterpolation = function(t) {
    t = Math.max(0, Math.min(1, t));
    t = 1 - Math.pow(1 - t, 2);
    const value = from + t * (to - from);
    return stream(value);
  };

  switch (direction) {
    case 'linear':
      return linearInterpolation;
    case 'ease-in':
      return easeInInterpolation;
    case 'ease-out':
      return easeOutInterpolation;
    default:
      throw new Error('Unknown interpolation direction: ' + direction);
  }
}

// Example usage with ease-in and ease-out:
const start = 10;
const end = 20;
const easeInInterpolator = interpolate(start, end, 'ease-in');
const easeOutInterpolator = interpolate(start, end, 'ease-out');

console.log(easeInInterpolator(0.5)); // Output: ease-in interpolated value at t = 0.5
console.log(easeOutInterpolator(0.5)); // Output: ease-out interpolated value at t = 0.5
