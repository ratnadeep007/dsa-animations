import { makeProject } from '@motion-canvas/core';

import example from './scenes/example?scene';
import stack from './scenes/stack?scene';

export default makeProject({
  scenes: [stack],
});
