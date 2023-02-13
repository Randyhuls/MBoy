const CPUSettings: { [key: string]: any } = {
  CLOCK_SPEED: 4194304, // mhz (GBC = 8.388608mhz, GB = 4.194304 mhz)
  MAX_FPS: 60, // Customize to the desired framework
  MAX_FRAME_CYCLES: 65535 // 0xFFFF
}

export { CPUSettings }