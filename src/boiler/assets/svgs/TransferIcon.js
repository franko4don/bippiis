import React from 'react'
import Svg, { G, Path } from 'react-native-svg'

const TransferIcon = props => (
  <Svg width={50} height={50} style={{alignSelf: 'center'}}  {...props}>
    <G data-name="transfer">
      <G data-name="Group 111" fill="#0aaf2c">
        <Path
          data-name="Path 192"
          d="M44.213 35.762a1.149 1.149 0 00-1.15-1.15H3.917l6.881-6.881a1.144 1.144 0 00-1.617-1.617L.346 34.949a1.14 1.14 0 000 1.617l8.835 8.835a1.147 1.147 0 001.627-1.617l-6.881-6.881h39.155a1.137 1.137 0 001.131-1.141z"
        />
        <Path
          data-name="Path 193"
          d="M43.877 9.163L35.042.337a1.144 1.144 0 00-1.617 1.617l6.881 6.881H1.15a1.15 1.15 0 000 2.3h39.156L33.424 18a1.148 1.148 0 001.632 1.615l8.835-8.835a1.148 1.148 0 00-.014-1.617z"
        />
      </G>
    </G>
  </Svg>
)

export default TransferIcon
