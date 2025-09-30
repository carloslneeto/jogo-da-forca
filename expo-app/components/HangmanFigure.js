import React from 'react';
import Svg, { Line, Circle } from 'react-native-svg';
import { View } from 'react-native';

export default function HangmanFigure({ errors }) {
  return (
    <View style={{ marginVertical: 20 }}>
      <Svg height="200" width="120">
        {/* Base */}
        <Line x1="10" y1="190" x2="110" y2="190" stroke="black" strokeWidth="4" />
        {/* Poste vertical */}
        <Line x1="30" y1="190" x2="30" y2="20" stroke="black" strokeWidth="4" />
        {/* Trave horizontal */}
        <Line x1="30" y1="20" x2="80" y2="20" stroke="black" strokeWidth="4" />
        {/* Corda */}
        <Line x1="80" y1="20" x2="80" y2="40" stroke="black" strokeWidth="4" />

        {/* Cabeça */}
        {errors > 0 && <Circle cx="80" cy="60" r="20" stroke="black" strokeWidth="4" fill="none" />}
        {/* Corpo */}
        {errors > 1 && <Line x1="80" y1="80" x2="80" y2="130" stroke="black" strokeWidth="4" />}
        {/* Braço esquerdo */}
        {errors > 2 && <Line x1="80" y1="90" x2="60" y2="110" stroke="black" strokeWidth="4" />}
        {/* Braço direito */}
        {errors > 3 && <Line x1="80" y1="90" x2="100" y2="110" stroke="black" strokeWidth="4" />}
        {/* Perna esquerda */}
        {errors > 4 && <Line x1="80" y1="130" x2="60" y2="160" stroke="black" strokeWidth="4" />}
        {/* Perna direita */}
        {errors > 5 && <Line x1="80" y1="130" x2="100" y2="160" stroke="black" strokeWidth="4" />}
      </Svg>
    </View>
  );
}
