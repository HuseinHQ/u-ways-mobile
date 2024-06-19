import React, {View} from 'react-native';

type SpacerProps = {
  width?: number;
  height?: number;
};
function Spacer({width, height}: SpacerProps) {
  return <View style={{width: width, height: height}} />;
}

export default Spacer;
