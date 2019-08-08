import React, {useRef, useEffect, useState} from 'react';
import Gantt from '@gemcook/gantt';
import {collection} from '@gemcook/utils';

import {GanttProps} from './types';

import '../../styles/index.scss';

const ReactGantt: React.FC<GanttProps> = props => {
  const ganttRef = useRef(null);
  const [gantt, setGantt] = useState();

  // TODO hooksファイルを作成し、社内の最新の構成に合わせる
  useEffect(() => {
    if (!gantt) {
      // キャメルケースで受け取った値をスネークケースにする。
      const options = collection.toSnakeKeys(props.options);
      const tasks = collection.toSnakeKeys(props.tasks);

      // NOTE 新しいガントを作成する
      const ganttInstance = new Gantt(ganttRef.current, tasks, {
        ...options,
        select_day: props.selectDay,
        on_click: props.onGanttBarClick,
        on_date_change: props.onDateChange,
        on_progress_change: props.onProgressChange,
        on_view_change: props.onViewChange,
        on_contextmenu: props.onContextMenu,
        on_gantt_contextmenu: props.onGanttContextMenu,
      });

      // Ganttインスタンスを保持する
      setGantt(ganttInstance);
    }
  }, [gantt, props]);

  // TODO hooksファイルを作成し、社内の最新の構成に合わせる
  useEffect(() => {
    // キャメルケースで受け取った値をスネークケースにする。
    const options = collection.toSnakeKeys(props.options);
    const tasks = collection.toSnakeKeys(props.tasks);

    if (!gantt) {
      return;
    }

    // ガントの選択された日付と、配列の長さが変わっていなければガントバーのみを更新
    if (
      gantt.tasks.length === tasks.length &&
      gantt.options.select_day === props.selectDay
    ) {
      // gemcook/ganttの関数
      gantt.refresh_tasks(tasks);
      return;
    }

    // ガントのオプションを更新する
    Object.assign(gantt.options, {
      ...options,
      select_day: props.selectDay,
    });

    // NOTE ganttを再生成する関数
    gantt.refresh(tasks);
  }, [props.tasks, props.options, gantt, props.selectDay]);

  // TODO hooksファイルを作成し、社内の最新の構成に合わせる
  useEffect(() => {
    if (gantt) {
      // ganttに渡すオプションの関数を更新する
      Object.assign(gantt.options, {
        on_click: props.onGanttBarClick,
        on_date_change: props.onDateChange,
        on_progress_change: props.onProgressChange,
        on_view_change: props.onViewChange,
        on_contextmenu: props.onContextMenu,
        on_gantt_contextmenu: props.onGanttContextMenu,
      });
    }
  }, [
    gantt,
    props.onContextMenu,
    props.onDateChange,
    props.onGanttBarClick,
    props.onGanttContextMenu,
    props.onProgressChange,
    props.onViewChange,
  ]);

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
