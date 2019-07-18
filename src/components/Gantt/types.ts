export type GanttProps = {
  tasks: Array<Array<Task>>;
  selectDay?: string;
  options?: {
    onClick?: (task: Task) => any;
    onDateChange?: (task: Task, start: Date, end: Date) => any;
    onProgressChange?: (task: Task, progress: number) => any;
    onViewChange?: (viewMode: string) => any;
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
