import React, {useRef, useState} from 'react';

import * as hooks from './hooks';
import {GanttProps} from './types';

import '../../styles/index.scss';

const ReactGantt: React.FC<GanttProps> = props => {
  const ganttRef = useRef(null);
  const [gantt, setGantt] = useState();

  hooks.useComponentDidMount(props, setGantt, ganttRef);
  hooks.useComponentDidUpdate(props, gantt);

  return (
    <div className="gc__frappe-gantt-react">
      <svg
        ref={ganttRef}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      />
    </div>
  );
};

export default ReactGantt;
