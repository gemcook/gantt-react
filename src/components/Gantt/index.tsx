import React, {useRef, useEffect, useState} from 'react';
import Gantt from '@gemcook/gantt';
import {collection} from '@gemcook/utils';

type GanttProps = import('./types').GanttProps;

import '../../styles/index.scss';

const ReactGantt: React.FC<GanttProps> = props => {
  const ganttRef = useRef(null);
  const [gantt, setGantt] = useState();

  useEffect(() => {
    // キャメルケースで受け取った値をスネークケースにする。
    const options = collection.toSnakeKeys(props.options);
    const tasks = collection.toSnakeKeys(props.tasks);

    // もしガントが表示済みなら更新する・存在しなければ新しく作成する
    if (gantt) {
      gantt.refresh(tasks, {...options, select_day: props.selectDay});
    } else {
      const ganttInstance = new Gantt(ganttRef.current, tasks, {
        ...options,
        select_day: props.selectDay,
      });

      // Ganttインスタンスを保持する
      setGantt(ganttInstance);
    }
  }, [props.tasks, props.options, gantt, props.selectDay]);

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
