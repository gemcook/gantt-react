import React, {useRef, useEffect, useState} from 'react';
import Gantt from '@gemcook/gantt';
import {collection} from '@gemcook/utils';

import {GanttProps} from './types';

import '../../styles/index.scss';

const ReactGantt: React.FC<GanttProps> = props => {
  const ganttRef = useRef(null);
  const [gantt, setGantt] = useState();

  useEffect(() => {
    // tasksが空配列なら処理を中断する
    if (props.tasks.length === 0) {
      return;
    }

    // キャメルケースで受け取った値をスネークケースにする。
    const options = collection.toSnakeKeys(props.options);
    const tasks = props.tasks.map(rowTasks => collection.toSnakeKeys(rowTasks));

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
