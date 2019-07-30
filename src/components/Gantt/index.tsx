import React, {useRef, useEffect, useState} from 'react';
import Gantt from '@gemcook/gantt';
import {collection} from '@gemcook/utils';

import {GanttProps} from './types';

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
      // TODO オプションをオブジェクトで受け取らないように修正する
      // NOTE ganttを再生成する関数
      gantt.refresh(tasks, {
        ...options,
        select_day: props.selectDay,
        on_click: props.onClick,
        on_date_change: props.onDateChange,
        on_progress_change: props.onProgressChange,
        on_view_change: props.onViewChange,
        on_contextmenu: props.onContextMenu,
        on_gantt_contextmenu: props.onGanttContextMenu,
      });
    } else {
      // TODO オプションをオブジェクトで受け取らないように修正する
      // NOTE 新しいガントを作成する
      const ganttInstance = new Gantt(ganttRef.current, tasks, {
        ...options,
        select_day: props.selectDay,
        on_click: props.onClick,
        on_date_change: props.onDateChange,
        on_progress_change: props.onProgressChange,
        on_view_change: props.onViewChange,
        on_contextmenu: props.onContextMenu,
        on_gantt_contextmenu: props.onGanttContextMenu,
      });

      // Ganttインスタンスを保持する
      setGantt(ganttInstance);
    }
  }, [props, gantt]);

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
