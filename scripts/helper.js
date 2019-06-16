function parseColor(color, alpha, background) {
  var channels = [];
  var channels_back = [];
  var channel_final = [];
  color = color.toLowerCase();
  // console.log(color);
  for (i = 0; i < 3; i++) {
    // channels[i] = color.substring(2 * i + 1, 2 * i + 3);
    // channels[i] = Math.floor(alpha * parseInt(channels[i], 16));
    channels[i] = parseInt(color.substring(2 * i + 1, 2 * i + 3), 16);

    channels_back[i] = parseInt(background.substring(2 * i + 1, 2 * i + 3), 16);
    channel_final[i] = Math.floor(
      channels_back[i] +
        Math.abs((alpha / 255) * (channels_back[i] - channels[i]))
    );
    channel_final[i] > 255
      ? (channel_final[i] = 0)
      : channel_final[i] < 0
      ? (channel_final[i] = 0)
      : null;
  }
  // console.log(channel_final);
  return (
    "#" +
    channel_final
      .map(x =>
        x.toString(16).length == 1 ? "0" + x.toString(16) : x.toString(16)
      )
      .join("")
  );
}
