// Цей файл містить логіку визначення, чи пристрій труситься.
// Він не змінює DOM, а лише повертає boolean значення.

// Параметри для визначення тряски
const SHAKE_THRESHOLD = 5;
let lastX = null;
let lastY = null;
let lastZ = null;

/**
 * Перевіряє, чи є тряска на основі поточних значень акселерометра.
 * @param {number} x - Прискорення по осі X
 * @param {number} y - Прискорення по осі Y
 * @param {number} z - Прискорення по осі Z
 * @returns {boolean} - true, якщо є тряска, інакше false
 */
function isDeviceShaking(x, y, z) {
  if (lastX === null || lastY === null || lastZ === null) {
    lastX = x;
    lastY = y;
    lastZ = z;
    return false;
  }

  const deltaX = Math.abs(x - lastX);
  const deltaY = Math.abs(y - lastY);
  const deltaZ = Math.abs(z - lastZ);

  lastX = x;
  lastY = y;
  lastZ = z;

  return (deltaX > SHAKE_THRESHOLD || deltaY > SHAKE_THRESHOLD || deltaZ > SHAKE_THRESHOLD);
}
