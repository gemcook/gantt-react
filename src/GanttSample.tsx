import React, {useState} from 'react';

import {Gantt} from './components';

const GanttDemo: React.FC = () => {
  const [tasks, setTasks] = useState([]);

  const dummyTasks: any = [
    [
      {
        id: '1-1',
        name: 'テスト',
        start: '2019-7-18',
        end: '2019-7-19',
      },
      {
        id: '1-2',
        name: '2行目',
        start: '2019-7-21',
        end: '2019-7-22',
      },
    ],
    [
      {
        id: '2-1',
        name: 'a',
        start: '2019-7-18',
        end: '2019-7-20',
        customClass: 'aa',
      },
      {
        id: '2-2',
        name: '表示確認',
        start: '2019-7-22',
        end: '2019-7-23',
        customClass: 'aa',
        custom_class: 'a',
      },
    ],
    [
      {
        id: '3-1',
        name: 'a',
        start: '2019-7-29',
        end: '2019-7-40',
        customClass: 'aa',
      },
      {
        id: '3-2',
        name: '表示確認',
        start: '2019-7-29',
        end: '2019-7-30',
        customClass: 'aa',
        custom_class: 'a',
      },
    ],
  ];

  const options = {
    onDateChange: (task: any) => {
      console.log(task);
    },
    headerHeight: 50,
    barHeight: 30,
    viewMode: 'Day',
    language: 'ja',
    selectDay: '2019-06-03',
    startBeforeDay: 30,
    endLaterDay: 60,
  };

  return (
    <div>
      <Gantt tasks={tasks} options={options} />
      <button onClick={() => setTasks(dummyTasks)}>ガント表示ボタン</button>
      <button onClick={() => setTasks([])}>ガントリセットボタン</button>
    </div>
  );
};

export default GanttDemo;
