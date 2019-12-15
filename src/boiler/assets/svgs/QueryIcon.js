import React from 'react'
import Svg, { G, Path, Circle } from 'react-native-svg'

const QueryIcon = props => (
  <Svg width={50} height={50} style={{alignSelf: 'center'}} {...props}>
    <G data-name="Group 84">
      <Path
        data-name="Path 152"
        d="M23.048 8.599a6.75 6.75 0 00-5.121 1.812 6.825 6.825 0 00-2.162 4.974 1.317 1.317 0 102.633 0 4.17 4.17 0 116.258 3.609 6.955 6.955 0 00-3.4 6.022v2.382a1.317 1.317 0 002.633 0v-2.381a4.313 4.313 0 012.093-3.744 6.8 6.8 0 00-2.93-12.674zm0 0"
        fill="#0aaf2c"
      />
      <Path
        data-name="Path 153"
        d="M22.568 31.78a2.231 2.231 0 102.23 2.23 2.231 2.231 0 00-2.23-2.23zm0 2.633a.4.4 0 11.4-.4.4.4 0 01-.4.4zm0 0"
        fill="#0aaf2c"
      />
      <G data-name="Ellipse 23" fill="none" stroke="#0aaf2c" strokeWidth={2}>
        <Circle cx={22.44} cy={22.44} r={22.44} stroke="none" />
        <Circle cx={22.44} cy={22.44} r={21.44} />
      </G>
    </G>
  </Svg>
)

export default QueryIcon
