export interface Props {
  onCreate?: () => void | Promise<void>;
  onDelete?: () => void | Promise<void>;
  title: string;
}
