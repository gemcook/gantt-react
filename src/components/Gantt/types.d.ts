export type GanttProps = {
  tasks: Array<Array<Task>>;
  selectDay?: string;
  onClick?: (task: Task) => void;
  onDateChange?: (task: Task, start: Date, end: Date) => void;
  onProgressChange?: (task: Task, progress: number) => void;
  onViewChange?: (viewMode: string) => void;
  onContextMenu?: (e: Event, task: Task) => void;
  onGanttContextMenu?: (e: Event, new_task: Task, tasks: Array<task>) => void;
  options?: {
    headerHeight?: number;
    coumnWidth?: number;
    step?: number;
    viewModes?: Array<string>;
    barHeight?: number;
    barCornerRadius?: number;
    arrowCurve?: number;
    padding?: number;
    viewMode?: string;
    dateFormat?: string;
    popupTrigger?: string;
    customPopupHtml?: null;
    language?: string;
    headerPadding?: number;
    headerLowerTextY?: number;
    headerUpperTextY?: number;
    headerDayOfWeekTextY?: number;
    bodyPosition?: number;
    startBeforeDay?: number;
    endLaterDay?: number;
    tooltipHeight?: number;
    tooltipCornerRadius?: number;
  };
};

type Task = {
  id: string;
  name: string;
  start: string;
  end: string;
  progress?: number;
  dependencies?: string;
  customClass?: string;
  customRowClass?: string;
};
