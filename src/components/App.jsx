import React from 'react';

// Style
import { Box, Grommet, Text } from 'grommet';
import { Robot } from 'grommet-icons';

// Components
import FlashLoans from './FlashLoans/FlashLoans';
import aaveDashboardTheme from '../theme/aaveDashboardTheme';

const App = () => (
  <Grommet theme={aaveDashboardTheme} full>
    <Box
      margin={{
        top: 'large',
      }}
    >
      <Text
        textAlign="center"
      >
        <Robot size="xlarge" color="brand" />
      </Text>
    </Box>
    <Box
      pad="large"
    >
      <FlashLoans />
    </Box>
  </Grommet>
);

export default App;
