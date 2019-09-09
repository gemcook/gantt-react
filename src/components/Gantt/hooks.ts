import {useEffect} from 'react';
import {useLifecycles} from 'react-use';
import Gantt from '@gemcook/gantt';
import {collection} from '@gemcook/utils';

import {GanttProps, GanttContainer} from './types';

export const useComponentDidMount = (
  props: GanttProps,
  setGantt: (gantt: GanttContainer) => void,
  ganttRef: React.MutableRefObject<SVGSVGElement | null>
) => {
  useLifecycles(() => {
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

    // もしメインプロセスからデータを受け取っていればフォームの初期値を更新する
  });
};

export const useComponentDidUpdate = (
  props: GanttProps,
  gantt: GanttContainer
) => {
  useEffect(() => {
    // キャメルケースで受け取った値をスネークケースにする。
    const options = collection.toSnakeKeys(props.options);
    const tasks = collection.toSnakeKeys(props.tasks);

    if (!gantt) {
      return;
    }

    // 選択された日付・配列の長さが変わっていなければガントバーのみを更新
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
  }, [gantt, props.options, props.selectDay, props.tasks]);

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
};
