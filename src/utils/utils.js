export const convertSecToTime = (dt) => {
  return new Date(dt * 1000).toLocaleTimeString().slice(0, -3);
};
